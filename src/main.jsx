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

// Route tree:
//  /                   → Home (all existing homepage sections)
//  /mac                → Mac lineup landing
//  /mac/:model         → Individual product detail (e.g. /mac/macbook-pro-14)
//  /compare            → Side-by-side spec comparison
//  /store              → Store shell + cart drawer
//  /about              → Brand / about page
//  /support            → Support / FAQ page
//  *                   → 404 NotFound (any unmatched path)
//
// All routes share the App layout (Navbar + Outlet).
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "mac", element: <MacLanding /> },
            { path: "mac/:model", element: <ProductDetail /> },
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
