const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bkhpsxf.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("mini-e-commerce").collection("users");
    const tesimonialCollection = client
      .db("mini-e-commerce")
      .collection("testimonials");
    const productCollection = client
      .db("mini-e-commerce")
      .collection("products");
    const cartCollection = client.db("mini-e-commerce").collection("cart");
    const orderCollection = client.db("mini-e-commerce").collection("order");
    // posting the users
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);

        res.send({
          message: "User Has been added successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to place order" });
      }
    });
    // getting the id via email
    // GET /users/:email
    app.get("/users/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const user = await userCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user" });
      }
    });
    // i am getting testimonial form here
    app.get("/testimonials", async (req, res) => {
      try {
        const result = await tesimonialCollection.find({}).toArray(); // fetch all
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch testimonials" });
      }
    });
    // i am getting Product from here
    app.get("/products", async (req, res) => {
      try {
        const { category } = req.query;
        let query = {};

        if (category) {
          query = {
            category: { $regex: `^${category.trim()}$`, $options: "i" },
          };
        }

        const result = await productCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch products" });
      }
    });
    app.get("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;

        // safety check
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid product ID" });
        }

        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);

        if (!result) {
          return res.status(404).send({ error: "Product not found" });
        }

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
      }
    });
    // Delete the products
    app.delete("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = productCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
      }
    });
    // showing stocks by id in the backend
    app.get("/products/:id/stocks", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query); // fetch all
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch testimonials" });
      }
    });
    // getting the product stocks
    app.patch("/products/:id/stocks", async (req, res) => {
      const { id } = req.params;
      const { stocks } = req.body;

      const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { stocks: Number(stocks) } },
      );

      res.send(result);
    });

    // Update the product one at a time
    app.put("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedProduct = req.body;

        const result = await productCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name: updatedProduct.name,
              price: Number(updatedProduct.price),
              originalPrice: Number(updatedProduct.originalPrice),
              discount: Number(updatedProduct.discount),
              image: updatedProduct.image,
              rating: Number(updatedProduct.rating),
              reviews: Number(updatedProduct.reviews),
              category: updatedProduct.category,
              stocks: Number(updatedProduct.stocks),
            },
          },
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Product not found" });
        }

        res.send({ message: "Product updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update product" });
      }
    });
    // orders are posted via this
    app.post("/orders", async (req, res) => {
      try {
        const order = req.body;

        if (!order.items || order.items.length === 0) {
          return res.status(400).send({ message: "No items in order" });
        }

        const result = await orderCollection.insertOne(order);

        res.send({
          message: "Order placed successfully",
          orderId: result.insertedId,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to place order" });
      }
    });
    app.get("/orders", async (req, res) => {
      try {
        const result = await orderCollection.find({}).toArray(); // fetch all
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch testimonials" });
      }
    });
    // posting into cart about the products
    app.post("/cart", async (req, res) => {
      const { productId, quantity } = req.body;

      if (!ObjectId.isValid(productId)) {
        return res.status(400).send({ error: "Invalid product id" });
      }

      if (quantity <= 0) {
        return res.status(400).send({ error: "Quantity must be at least 1" });
      }

      //  Get product
      const product = await productCollection.findOne({
        _id: new ObjectId(productId),
      });

      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }

      //  Get existing cart item
      const existingCart = await cartCollection.findOne({
        productId: new ObjectId(productId),
      });

      const finalQty = existingCart
        ? existingCart.quantity + quantity
        : quantity;

      // Compare with stock (THIS is the rule)
      if (finalQty > Number(product.stocks)) {
        return res.status(400).json({
          error: `Only ${product.stocks} items available in stock`,
        });
      }

      //  Insert or update cart
      if (existingCart) {
        await cartCollection.updateOne(
          { productId: new ObjectId(productId) },
          { $set: { quantity: finalQty } },
        );
      } else {
        await cartCollection.insertOne({
          productId: new ObjectId(productId),
          quantity,
          createdAt: new Date(),
        });
      }

      res.send({ success: true });
    });
    // i am getting the product via product id in cart
    app.get("/cart", async (req, res) => {
      try {
        const cartItems = await cartCollection
          .aggregate([
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $unwind: "$product",
            },
          ])
          .toArray();

        res.send(cartItems);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch cart" });
      }
    });
    // for deleting all the carts after deleting
    app.delete("/cart", async (req, res) => {
      await cartCollection.deleteMany({});
      res.send({ message: "Cart cleared" });
    });
    app.patch("/cart/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { action } = req.body; // "inc" | "dec"

        if (!ObjectId.isValid(id))
          return res.status(400).json({ error: "Invalid cart ID" });
        if (!["inc", "dec"].includes(action))
          return res.status(400).json({ error: "Invalid action" });

        const cartItem = await cartCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!cartItem)
          return res.status(404).json({ error: "Cart item not found" });

        // Get the corresponding product
        const product = await productCollection.findOne({
          _id: cartItem.productId,
        });
        if (!product)
          return res.status(404).json({ error: "Product not found" });

        // Calculate new quantity
        const newQty =
          action === "inc" ? cartItem.quantity + 1 : cartItem.quantity - 1;

        // Prevent going above stock
        if (newQty > Number(product.stocks)) {
          return res
            .status(400)
            .json({ error: `Only ${product.stocks} items available in stock` });
        }

        // Prevent going below 1
        if (newQty < 1) {
          return res.status(400).json({ error: "Minimum quantity is 1" });
        }

        await cartCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { quantity: newQty } },
        );

        res.status(200).json({ success: true, quantity: newQty });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update cart item" });
      }
    });
    // DELETE item form cart
    app.delete("/cart/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid cart ID" });
        }

        const result = await cartCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ error: "Cart item not found" });
        }

        res.send({ message: "Cart item removed" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to remove cart item" });
      }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("mini e commerce react form get");
});

app.listen(port, () => {
  console.log(`mini e commerce react form listening on port ${port}`);
});
