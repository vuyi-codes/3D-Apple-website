import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import SearchOverlay from "./components/SearchOverlay";
import AuthModal from "./components/AuthModal";
import FavouritesToast from "./components/FavouritesToast";

gsap.registerPlugin(ScrollTrigger);

function App() {
    return (
        <>
            <Navbar />
            <CartDrawer />
            <SearchOverlay />
            <AuthModal />
            <FavouritesToast />
            <Outlet />
        </>
    );
}

export default App;
