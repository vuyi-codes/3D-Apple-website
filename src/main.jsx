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
import About from "./pages/About.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";
import IphoneLanding from "./pages/IphoneLanding.jsx";
import WatchLanding from "./pages/WatchLanding.jsx";
import VisionLanding from "./pages/VisionLanding.jsx";
import AirPodsLanding from "./pages/AirPodsLanding.jsx";

// All routes share the App layout (Navbar + Outlet + Cart / Search).
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "mac", element: <MacLanding /> },
            { path: "mac/:model", element: <ProductDetail /> },
            { path: "iphone", element: <IphoneLanding /> },
            { path: "watch", element: <WatchLanding /> },
            { path: "vision", element: <VisionLanding /> },
            { path: "airpods", element: <AirPodsLanding /> },
            { path: "compare", element: <Compare /> },
            { path: "store", element: <Store /> },
            { path: "about", element: <About /> },
            { path: "support", element: <Support /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
