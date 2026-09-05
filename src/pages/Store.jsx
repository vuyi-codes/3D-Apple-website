// Store Shell — /store
//
// Product grid across all lineups + accessories with category filters,
// client-side pagination (3 rows per page), and a Zustand cart.
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import {
    airpodsLineup,
    ipadLineup,
    iphoneLineup,
    macLineup,
    storeAccessories,
    storeCategories,
    visionLineup,
    watchLineup,
} from "../constants";
import useMacbookStore from "../store";
import Footer from "../components/Footer";
import FavouriteButton from "../components/FavouriteButton";

const mapLineup = (items, category, hrefFor) =>
    items.map((m) => ({
        id: m.id,
        slug: m.slug,
        name: m.name,
        category,
        price: m.price,
        description: m.highlight,
        colors: m.colors,
        image: m.image,
        href: hrefFor(m),
    }));

const catalog = [
    ...mapLineup(macLineup, "Mac", (m) =>
        m.storeScale != null ? `/mac/${m.slug}` : `/store/${m.slug}`
    ),
    ...mapLineup(ipadLineup, "iPad", () => "/ipad"),
    ...mapLineup(iphoneLineup, "iPhone", () => "/iphone"),
    ...mapLineup(watchLineup, "Watch", () => "/watch"),
    ...mapLineup(visionLineup, "Vision", () => "/vision"),
    ...mapLineup(airpodsLineup, "AirPods", () => "/airpods"),
    ...storeAccessories.map((a) => ({
        ...a,
        description: a.highlight,
        href: `/store/${a.slug}`,
    })),
];

// Newest / featured additions shown above the category filters (mock “latest”)
const LATEST_IDS = [
    "iphone-17-pro",
    "mac-mini",
    "ipad-pro",
    "airpods-pro-2",
];

const latestProducts = LATEST_IDS.map((id) =>
    catalog.find((p) => p.id === id)
).filter(Boolean);

// 3 rows × current column count (matches .store-grid-inner breakpoints)
const pageSizeForColumns = (cols) => cols * 3;

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
            <FavouriteButton productId={product.id} className="fav-on-card" />
            {product.image ? (
                <div className="mac-card-img">
                    <img src={product.image} alt={product.name} />
                </div>
            ) : (
                <div className="mac-card-img-placeholder" aria-hidden="true" />
            )}

            <div className="store-card-body">
                <p className="store-card-cat">{product.category}</p>
                <h2 className="store-card-name">{product.name}</h2>
                <p className="store-card-desc">{product.description}</p>
                <p className="store-card-price">From ${product.price.toLocaleString()}</p>
            </div>

            <div className="store-card-swatches" role="group" aria-label="Colour">
                <span className="store-swatches-label">Colour</span>
                <div className="store-swatches-row">
                    {product.colors.map(({ hex, label }, i) => (
                        <button
                            key={hex}
                            type="button"
                            title={label}
                            aria-label={label}
                            aria-pressed={i === colorIndex}
                            onClick={() => setColorIndex(i)}
                            className={`store-swatch ${i === colorIndex ? "store-swatch-on" : ""}`}
                            style={{ backgroundColor: hex }}
                        />
                    ))}
                </div>
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
    // Breakpoints match .store-grid-inner: 1 → 2 (md) → 4 (lg)
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);

    const columns = isMobile ? 1 : isTablet ? 2 : 4;
    const pageSize = pageSizeForColumns(columns);

    const products = useMemo(
        () =>
            category === "All"
                ? catalog
                : catalog.filter((p) => p.category === category),
        [category]
    );

    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

    // Reset to page 1 when filter or page size changes
    useEffect(() => {
        setPage(1);
    }, [category, pageSize]);

    // Clamp page if product count shrinks
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const pageProducts = useMemo(() => {
        const start = (page - 1) * pageSize;
        return products.slice(start, start + pageSize);
    }, [products, page, pageSize]);

    useGSAP(() => {
        gsap.fromTo(
            ".store-hero-animate",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power2.out" }
        );

        gsap.fromTo(
            "#store-latest .store-card",
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                delay: 0.2,
            }
        );
    }, []);

    useGSAP(() => {
        gsap.fromTo(
            "#store-grid .store-card",
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.06,
                ease: "power2.out",
            }
        );
    }, [page, category, pageSize]);

    const goToPage = (next) => {
        setPage(next);
        document.getElementById("store-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <main id="store-page">
                <section id="store-hero">
                    <div className="line-hero-media" aria-hidden="true">
                        <video
                            src="/videos/store_bg.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="line-hero-overlay" />
                    </div>

                    <div className="line-hero-content">
                        <p className="store-eyebrow store-hero-animate">Store</p>
                        <h1 className="store-hero-animate">
                            The best way to buy the products you love.
                        </h1>
                        <p className="store-hero-sub store-hero-animate">
                            Browse Mac, iPad, iPhone, Watch, and more. Bag is local-only — no real
                            checkout yet.
                        </p>
                    </div>
                </section>

                <section id="store-latest" aria-labelledby="store-latest-title">
                    <h2 id="store-latest-title" className="store-latest-title">
                        The latest.
                    </h2>
                    <p className="store-latest-sub">New products just added to the Store.</p>
                    <div className="store-grid-inner">
                        {latestProducts.map((product) => (
                            <StoreCard key={`latest-${product.id}`} product={product} />
                        ))}
                    </div>
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
                        {pageProducts.map((product) => (
                            <StoreCard key={product.id} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav className="store-pagination" aria-label="Store pages">
                            <button
                                type="button"
                                className="store-page-btn"
                                onClick={() => goToPage(page - 1)}
                                disabled={page <= 1}
                            >
                                Previous
                            </button>

                            <div className="store-page-numbers">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        className={
                                            n === page
                                                ? "store-page-num store-page-num-on"
                                                : "store-page-num"
                                        }
                                        onClick={() => goToPage(n)}
                                        aria-current={n === page ? "page" : undefined}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="store-page-btn"
                                onClick={() => goToPage(page + 1)}
                                disabled={page >= totalPages}
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Store;
