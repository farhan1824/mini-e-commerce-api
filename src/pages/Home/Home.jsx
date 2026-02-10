import Hero from './Hero';
import CategoryList from './CategoryList';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import BestSelling from './BestSelling';

const Home = () => {
    return (
        <div>
            <Hero />
            <CategoryList />
            <BestSelling></BestSelling>
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;
