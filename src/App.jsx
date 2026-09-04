// App.jsx — root layout component rendered for every route.
// Navbar sits outside the Outlet so it persists across all pages without
// re-mounting (consistent with Apple's sticky global nav behaviour).
//
// GSAP's ScrollTrigger plugin is registered once here so every child page
// can create ScrollTriggers without importing/registering it again.
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import SearchOverlay from "./components/SearchOverlay";

// Register ScrollTrigger globally — must happen before any component
// that uses ScrollTrigger is mounted.
gsap.registerPlugin(ScrollTrigger);

function App() {
    return (
        <>
            {/* Persistent global navigation */}
            <Navbar />
            {/* Cart drawer + search overlay sit above every page */}
            <CartDrawer />
            <SearchOverlay />

            {/* Page content injected here by React Router based on the active route */}
            <Outlet />
        </>
    );
}

export default App;
