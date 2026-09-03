// Product Detail page — /mac/:model
//
// Reuses the exact same Canvas + StudioLights + ModelSwitcher setup from
// ProductViewer.jsx (homepage section) so the 3D viewer is consistent.
// The :model URL param is matched against macLineup slugs to pick the right
// mock data. Unknown slugs redirect to /mac.
//
// Sections:
//  - Full-viewport 3D canvas with colour/size controls (reuses ProductViewer UI)
//  - Specs table revealed with a GSAP stagger fromTo (matches Performance pattern)
//  - Sticky "Buy" CTA bar at the bottom of the viewport
import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import clsx from "clsx";

import StudioLights from "../components/three/StudioLights";
import ModelSwitcher from "../components/three/ModelSwitcher";
import Footer from "../components/Footer";
import useMacbookStore from "../store";
import { macLineup } from "../constants";

// ─── Product Detail page ──────────────────────────────────────────────────────
const ProductDetail = () => {
    const { model: slug } = useParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    // Pull the matching model from mock data; redirect if slug is unknown
    const product = macLineup.find((m) => m.slug === slug);
    useEffect(() => {
        if (!product) navigate("/mac", { replace: true });
    }, [product, navigate]);

    // Read/write the shared Zustand store — same store as the homepage viewer
    const { color, scale, setColor, setScale } = useMacbookStore();

    // Sync the store's scale to this product's default on first load
    useEffect(() => {
        if (product) {
            setScale(product.storeScale);
            // Set default color to the first color in this model's palette
            const firstColor = product.colorMap[product.colors[0].hex];
            setColor(firstColor);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]); // re-run only when the slug changes (i.e. user navigates between models)

    const specsRef = useRef(null);

    // Stagger specs rows in on scroll — matches Performance.jsx fromTo pattern
    useGSAP(() => {
        gsap.fromTo(
            ".pd-spec-row",
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.07,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#pd-specs",
                    start: "top 75%",
                },
            }
        );

        // Fade in the buy section
        gsap.fromTo(
            "#pd-buy",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#pd-buy",
                    start: "top 85%",
                },
            }
        );
    }, { scope: specsRef, dependencies: [slug] });

    // Guard render while redirect is in flight
    if (!product) return null;

    const { name, chip, highlight, description, price, monthly, colors, colorMap, specs } = product;

    // Determine which swatch is "active" by reverse-looking up the store color
    const activeSwatchHex = Object.entries(colorMap).find(
        ([, storeColor]) => storeColor === color
    )?.[0] ?? colors[0].hex;

    return (
        <>
            <main id="pd-page" ref={specsRef}>

                {/* ── 3D Viewer ───────────────────────────────────────────── */}
                <section id="pd-viewer">
                    {/* Model name + chip shown above the canvas */}
                    <div id="pd-viewer-header">
                        <p className="pd-eyebrow">{chip}</p>
                        <h1>{name}</h1>
                    </div>

                    {/* Controls — identical structure to ProductViewer.jsx */}
                    <div className="pd-controls">
                        {/* Colour swatches */}
                        <div className="pd-color-row">
                            {colors.map(({ hex, label }) => (
                                <button
                                    key={hex}
                                    title={label}
                                    aria-label={label}
                                    onClick={() => setColor(colorMap[hex])}
                                    className={clsx(
                                        "pd-swatch",
                                        activeSwatchHex === hex && "pd-swatch-active"
                                    )}
                                    style={{ backgroundColor: hex }}
                                />
                            ))}
                        </div>

                        {/* Active colour label */}
                        <p className="pd-color-label">
                            {colors.find((c) => c.hex === activeSwatchHex)?.label}
                        </p>
                    </div>

                    {/* R3F canvas — same camera as ProductViewer */}
                    <Canvas
                        id="pd-canvas"
                        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
                    >
                        <StudioLights />
                        {/* ModelSwitcher reads `scale` from Zustand store;
                            synced to product.storeScale in the useEffect above */}
                        <ModelSwitcher
                            scale={isMobile ? scale - 0.03 : scale}
                            isMobile={isMobile}
                        />
                    </Canvas>

                    {/* Scroll-down hint */}
                    <p className="pd-scroll-hint">Scroll to explore specs ↓</p>
                </section>

                {/* ── Specs table ─────────────────────────────────────────── */}
                <section id="pd-specs">
                    <div className="pd-specs-inner">
                        <div className="pd-specs-intro">
                            <h2>{highlight}</h2>
                            <p>{description}</p>
                        </div>

                        <table className="pd-specs-table">
                            <tbody>
                                {specs.map(({ label, value }) => (
                                    <tr key={label} className="pd-spec-row">
                                        <th>{label}</th>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Buy CTA ─────────────────────────────────────────────── */}
                <section id="pd-buy">
                    <div className="pd-buy-inner">
                        <div className="pd-buy-info">
                            <p className="pd-buy-name">{name}</p>
                            <p className="pd-buy-price">
                                From ${price.toLocaleString()}
                                <span> or ${monthly}/mo.</span>
                            </p>
                        </div>
                        <div className="pd-buy-actions">
                            <Link to="/store" className="btn-primary-pill">
                                Add to Cart
                            </Link>
                            <Link to="/compare" className="btn-ghost-pill">
                                Compare models
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;
