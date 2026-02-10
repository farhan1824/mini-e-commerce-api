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

    const tesimonialCollection = client
      .db("mini-e-commerce")
      .collection("testimonials");
    const productCollection = client
      .db("mini-e-commerce")
      .collection("products");
    const cartCollection = client.db("mini-e-commerce").collection("cart");
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
        const result = await productCollection.find({}).toArray(); // fetch all
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch testimonials" });
      }
    });
    app.get("/products", async (req, res) => {
      try {
        const { category } = req.query;

        let query = {};

        if (category) {
          // Trim whitespace & match exactly, case-insensitive
          const cleanCategory = category.trim();
          query = { category: { $regex: `^${cleanCategory}$`, $options: "i" } };
          console.log("Querying by category:", cleanCategory);
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
    // posting into cart about the products
    app.post("/cart", async (req, res) => {
      try {
        const { productId } = req.body;

        if (!ObjectId.isValid(productId)) {
          return res.status(400).send({ error: "Invalid product ID" });
        }

        const exists = await cartCollection.findOne({
          productId: new ObjectId(productId),
        });

        if (exists) {
          return res.send({ message: "Already in cart" });
        }

        await cartCollection.insertOne({
          productId: new ObjectId(productId),
          quantity: 1,
          createdAt: new Date(),
        });

        res.status(201).send({ message: "Added to cart" });
      } catch (error) {
        res.status(500).send({ error: "Failed to add to cart" });
      }
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
    app.patch("/cart/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { action } = req.body; // "inc" | "dec"

        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid cart ID" });
        }

        if (!["inc", "dec"].includes(action)) {
          return res.status(400).send({ error: "Invalid action" });
        }

        const item = await cartCollection.findOne({ _id: new ObjectId(id) });

        if (!item) {
          return res.status(404).send({ error: "Cart item not found" });
        }

        // prevent quantity going below 1
        if (action === "dec" && item.quantity <= 1) {
          return res.send({ message: "Minimum quantity reached" });
        }

        const change = action === "inc" ? 1 : -1;

        await cartCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { quantity: change } },
        );

        res.send({
          message:
            action === "inc" ? "Quantity increased" : "Quantity decreased",
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to update quantity" });
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
