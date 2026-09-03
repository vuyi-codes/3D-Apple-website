// Product Detail page — Step 4 will build this out fully.
// Displays a full-page 3D viewer + specs table + color picker for a given Mac
// model, driven by mock data and the :model URL param.
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const ProductDetail = () => {
    const { model } = useParams();

    return (
        <>
            <main className="pt-16 min-h-screen bg-black text-white flex-center flex-col gap-8">
                <h1 className="text-4xl font-semibold capitalize">{model ?? "MacBook Pro"}</h1>
                <p className="text-dark-100 text-lg">Coming soon — built in Step 4.</p>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;
