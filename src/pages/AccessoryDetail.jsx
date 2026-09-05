// Accessory Detail — /store/:slug
//
// Static detail page for store accessories (no 3D). Looks up `storeAccessories`
// by slug; unknown slugs redirect to /store. Colour picker + Add to Bag use
// the same Zustand cart as the Store grid.
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
import { macLineup, storeAccessories } from "../constants";
import useMacbookStore from "../store";
import Footer from "../components/Footer";
import FavouriteButton from "../components/FavouriteButton";

const detailCatalog = [
    ...storeAccessories,
    ...macLineup
        .filter((m) => m.storeScale == null)
        .map((m) => ({
            id: m.id,
            slug: m.slug,
            name: m.name,
            category: "Mac",
            price: m.price,
            description: m.description,
            highlight: m.highlight,
            image: m.image,
            colors: m.colors,
            specs: m.specs,
        })),
];

const AccessoryDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const addToCart = useMacbookStore((s) => s.addToCart);

    const product = detailCatalog.find((a) => a.slug === slug);

    useEffect(() => {
        if (!product) navigate("/store", { replace: true });
    }, [product, navigate]);

    const [colorIndex, setColorIndex] = useState(0);

    useGSAP(() => {
        if (!product) return;
        gsap.fromTo(
            ".acc-animate",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(
            ".acc-spec-row",
            { opacity: 0, x: -16 },
            {
                opacity: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#acc-specs",
                    start: "top 75%",
                },
            }
        );
    }, [slug]);

    if (!product) return null;

    const { name, category, price, description, highlight, colors, specs, image } = product;
    const selected = colors[colorIndex] ?? colors[0];

    const handleAdd = () => {
        addToCart({
            id: product.id,
            name,
            price,
            color: selected.label,
        });
    };

    return (
        <>
            <main id="acc-page">
                <section id="acc-hero">
                    <p className="acc-eyebrow acc-animate">{category}</p>
                    <h1 className="acc-animate">{name}</h1>
                    <p className="acc-highlight acc-animate">{highlight}</p>
                    <p className="acc-desc acc-animate">{description}</p>

                    {image ? (
                        <div className="acc-visual acc-animate">
                            <img src={image} alt={name} />
                        </div>
                    ) : (
                        <div className="acc-visual acc-animate" aria-hidden="true" />
                    )}

                    <div className="acc-color-row acc-animate">
                        {colors.map(({ hex, label }, i) => (
                            <button
                                key={hex}
                                type="button"
                                title={label}
                                aria-label={label}
                                onClick={() => setColorIndex(i)}
                                className={clsx(
                                    "mac-swatch acc-swatch",
                                    i === colorIndex && "store-swatch-on"
                                )}
                                style={{ backgroundColor: hex }}
                            />
                        ))}
                    </div>
                    <p className="acc-color-label acc-animate">{selected.label}</p>

                    <p className="acc-price acc-animate">
                        ${price.toLocaleString()}
                    </p>

                    <div className="acc-actions acc-animate">
                        <button type="button" className="btn-primary-pill" onClick={handleAdd}>
                            Add to Bag
                        </button>
                        <FavouriteButton productId={product.id} className="fav-inline" />
                        <Link to="/store" className="btn-ghost-pill">
                            Back to Store
                        </Link>
                    </div>
                </section>

                <section id="acc-specs">
                    <h2 className="acc-section-title">Tech specs</h2>
                    <table className="acc-specs-table">
                        <tbody>
                            {specs.map(({ label, value }) => (
                                <tr key={label} className="acc-spec-row">
                                    <th>{label}</th>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AccessoryDetail;
