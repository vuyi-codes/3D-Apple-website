// Home page — contains all original homepage sections exactly as they were in
// App.jsx before routing was introduced. Each section manages its own GSAP
// ScrollTrigger internally, so no changes are needed here.
import Hero from "../components/Hero";
import ProductViewer from "../components/ProductViewer";
import Showcase from "../components/Showcase";
import Performance from "../components/Performance";
import Features from "../components/Features";
import Highlights from "../components/HighLights";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            <Features />
            <Highlights />
            <Footer />
        </>
    );
};

export default Home;
