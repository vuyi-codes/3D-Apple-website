import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Layout
import App from "./App.jsx";

// Pages
import Home from "./pages/Home.jsx";
import MacLanding from "./pages/MacLanding.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Compare from "./pages/Compare.jsx";
import Store from "./pages/Store.jsx";
import AccessoryDetail from "./pages/AccessoryDetail.jsx";
import About from "./pages/About.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";
import IphoneLanding from "./pages/IphoneLanding.jsx";
import IpadLanding from "./pages/IpadLanding.jsx";
import WatchLanding from "./pages/WatchLanding.jsx";
import VisionLanding from "./pages/VisionLanding.jsx";
import AirPodsLanding from "./pages/AirPodsLanding.jsx";
import Checkout from "./pages/Checkout.jsx";
import SignInRedirect from "./pages/SignInRedirect.jsx";
import Favourites from "./pages/Favourites.jsx";

// All routes share the App layout (Navbar + Outlet + Cart / Search / Auth).
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "mac", element: <MacLanding /> },
            { path: "mac/:model", element: <ProductDetail /> },
            { path: "ipad", element: <IpadLanding /> },
            { path: "iphone", element: <IphoneLanding /> },
            { path: "watch", element: <WatchLanding /> },
            { path: "vision", element: <VisionLanding /> },
            { path: "airpods", element: <AirPodsLanding /> },
            { path: "compare", element: <Compare /> },
            { path: "store", element: <Store /> },
            { path: "store/:slug", element: <AccessoryDetail /> },
            { path: "favourites", element: <Favourites /> },
            { path: "checkout", element: <Checkout /> },
            { path: "about", element: <About /> },
            { path: "support", element: <Support /> },
            // Legacy URL — opens AuthModal then redirects home
            { path: "signin", element: <SignInRedirect /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
