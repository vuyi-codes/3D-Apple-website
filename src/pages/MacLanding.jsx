// Mac Landing page — Step 3 will build this out fully.
// Shows the full Mac lineup (MacBook Air, Pro 14", Pro 16") with pricing,
// scroll-reveal cards, and links to individual product detail pages.
import Footer from "../components/Footer";

const MacLanding = () => {
    return (
        <>
            <main className="pt-16 min-h-screen bg-black text-white flex-center flex-col gap-8">
                <h1 className="text-4xl font-semibold">Mac</h1>
                <p className="text-dark-100 text-lg">Coming soon — built in Step 3.</p>
            </main>
            <Footer />
        </>
    );
};

export default MacLanding;
