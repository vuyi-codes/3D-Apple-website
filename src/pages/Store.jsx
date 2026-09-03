// Store Shell — /store
//
// Product grid (Macs + accessories) with category filters and a Zustand cart.
// Adding an item opens CartDrawer (mounted in App.jsx). No checkout API.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { macLineup, storeAccessories, storeCategories } from "../constants";
import useMacbookStore from "../store";
import Footer from "../components/Footer";

// Flatten lineup + accessories into one catalog the filters can slice
const catalog = [
    ...macLineup.map((m) => ({
        id: m.id,
        slug: m.slug,
        name: m.name,
        category: "Mac",
        price: m.price,
        description: m.highlight,
        colors: m.colors,
        href: `/mac/${m.slug}`,
    })),
    ...storeAccessories.map((a) => ({
        ...a,
        href: null, // accessories have no detail page yet
    })),
];

const StoreCard = ({ product }) => {
    const addToCart = useMacbookStore((s) => s.addToCart);
    const [colorIndex, setColorIndex] = useState(0);
    const selected = product.colors[colorIndex];

    const handleAdd = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            color: selected.label,
        });
    };

    return (
        <article className="store-card">
            <div className="mac-card-img-placeholder" aria-hidden="true" />
            <p className="store-card-cat">{product.category}</p>
            <h2 className="store-card-name">{product.name}</h2>
            <p className="store-card-desc">{product.description}</p>
            <p className="store-card-price">From ${product.price.toLocaleString()}</p>

            <div className="store-card-swatches">
                {product.colors.map(({ hex, label }, i) => (
                    <button
                        key={hex}
                        type="button"
                        title={label}
                        aria-label={label}
                        onClick={() => setColorIndex(i)}
                        className={`mac-swatch ${i === colorIndex ? "store-swatch-on" : ""}`}
                        style={{ backgroundColor: hex }}
                    />
                ))}
            </div>

            <div className="store-card-actions">
                <button type="button" className="btn-primary-pill" onClick={handleAdd}>
                    Add to Bag
                </button>
                {product.href && (
                    <Link to={product.href} className="btn-ghost-pill">
                        Learn more
                    </Link>
                )}
            </div>
        </article>
    );
};

const Store = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const [category, setCategory] = useState("All");

    const products = useMemo(
        () =>
            category === "All"
                ? catalog
                : catalog.filter((p) => p.category === category),
        [category]
    );

    useGSAP(() => {
        gsap.fromTo(
            ".store-hero-animate",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power2.out" }
        );

        gsap.fromTo(
            ".store-card",
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#store-grid",
                    start: isMobile ? "top 85%" : "top 70%",
                },
            }
        );
    }, [isMobile, category]);

    return (
        <>
            <main id="store-page">
                <section id="store-hero">
                    <p className="store-eyebrow store-hero-animate">Store</p>
                    <h1 className="store-hero-animate">The best way to buy the products you love.</h1>
                    <p className="store-hero-sub store-hero-animate">
                        Browse the Mac lineup and accessories. Bag is local-only — no real checkout yet.
                    </p>
                </section>

                <section id="store-filters">
                    {storeCategories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={category === cat ? "cmp-chip cmp-chip-on" : "cmp-chip"}
                            aria-pressed={category === cat}
                        >
                            {cat}
                        </button>
                    ))}
                </section>

                <section id="store-grid">
                    <div className="store-grid-inner">
                        {products.map((product) => (
                            <StoreCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Store;
