// NotFound — catch-all for unknown URLs (route path: "*").
// Shares the App layout (Navbar + CartDrawer) so users can still navigate away.
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Footer from "../components/Footer";

const NotFound = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".nf-animate",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
        );
    });

    return (
        <>
            <main id="not-found">
                <p className="nf-code nf-animate">404</p>
                <h1 className="nf-animate">This page isn’t available.</h1>
                <p className="nf-sub nf-animate">
                    The link may be broken, or the page may have been removed.
                    Try one of these instead.
                </p>
                <div className="nf-actions nf-animate">
                    <Link to="/" className="btn-primary-pill">
                        Go Home
                    </Link>
                    <Link to="/store" className="btn-ghost-pill">
                        Visit the Store
                    </Link>
                    <Link to="/support" className="btn-ghost-pill">
                        Get Support
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default NotFound;
