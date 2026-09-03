// Compare page — /compare
//
// Side-by-side spec table for every model in macLineup. Columns can be
// toggled on/off (local React state, no store) so users can narrow the
// comparison. GSAP reveals header cells and spec rows on scroll — same
// stagger / fromTo pattern used on Highlights and Product Detail.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { macLineup } from "../constants";
import Footer from "../components/Footer";

const Compare = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    // All models visible by default. Toggling a chip removes that column.
    const [visibleIds, setVisibleIds] = useState(macLineup.map((m) => m.id));

    const visibleModels = useMemo(
        () => macLineup.filter((m) => visibleIds.includes(m.id)),
        [visibleIds]
    );

    // Spec row labels come from the first lineup entry so the table stays
    // in sync if constants change — all models share the same spec keys.
    const specLabels = macLineup[0].specs.map((s) => s.label);

    const toggleModel = (id) => {
        setVisibleIds((prev) => {
            // Keep at least one column so the table never goes empty
            if (prev.includes(id) && prev.length === 1) return prev;
            return prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id];
        });
    };

    useGSAP(() => {
        // Header + price row fade in on mount
        gsap.fromTo(
            ".cmp-hero-animate",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
        );

        // Spec rows stagger in on scroll — matches Product Detail row reveal
        gsap.fromTo(
            ".cmp-row",
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#cmp-table",
                    start: isMobile ? "top 85%" : "top 70%",
                },
            }
        );
    }, [isMobile]);

    return (
        <>
            <main id="cmp-page">
                <section id="cmp-hero">
                    <p className="cmp-eyebrow cmp-hero-animate">Compare</p>
                    <h1 className="cmp-hero-animate">Find the right Mac for you.</h1>
                    <p className="cmp-hero-sub cmp-hero-animate">
                        Toggle models on or off, then scan specs side by side.
                    </p>

                    {/* Filter chips — toggle which columns appear in the table */}
                    <div className="cmp-toggles cmp-hero-animate">
                        {macLineup.map((model) => {
                            const isOn = visibleIds.includes(model.id);
                            return (
                                <button
                                    key={model.id}
                                    type="button"
                                    onClick={() => toggleModel(model.id)}
                                    className={isOn ? "cmp-chip cmp-chip-on" : "cmp-chip"}
                                    aria-pressed={isOn}
                                >
                                    {model.name}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section id="cmp-table">
                    <div className="cmp-scroll">
                        <table className="cmp-grid">
                            <thead>
                                <tr>
                                    <th className="cmp-label-col"> </th>
                                    {visibleModels.map((model) => (
                                        <th key={model.id} className="cmp-col-head">
                                            {model.badge && (
                                                <span className="cmp-badge">{model.badge}</span>
                                            )}
                                            <p className="cmp-col-name">{model.name}</p>
                                            <p className="cmp-col-chip">{model.chip}</p>
                                            <p className="cmp-col-price">
                                                From ${model.price.toLocaleString()}
                                            </p>
                                            <div className="cmp-col-swatches">
                                                {model.colors.map(({ hex, label }) => (
                                                    <span
                                                        key={hex}
                                                        className="mac-swatch"
                                                        style={{ backgroundColor: hex }}
                                                        title={label}
                                                        aria-label={label}
                                                    />
                                                ))}
                                            </div>
                                            <Link
                                                to={`/mac/${model.slug}`}
                                                className="btn-primary-pill"
                                            >
                                                Learn more
                                            </Link>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {specLabels.map((label) => (
                                    <tr key={label} className="cmp-row">
                                        <th>{label}</th>
                                        {visibleModels.map((model) => {
                                            const spec = model.specs.find((s) => s.label === label);
                                            return (
                                                <td key={`${model.id}-${label}`}>
                                                    {spec?.value ?? "—"}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="cmp-cta">
                    <p className="cmp-eyebrow">Ready to buy?</p>
                    <h2>Shop the Mac lineup.</h2>
                    <Link to="/store" className="btn-primary-pill">
                        Visit the Store
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Compare;
