// ProductLineLanding — shared shell for Watch / Vision / AirPods (and similar
// category pages). Same section order + GSAP patterns as MacLanding / IphoneLanding.
// No 3D — cards use .mac-card placeholders; CTAs go to /store.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import Footer from "./Footer";

/**
 * @param {object} props
 * @param {string} props.idPrefix   — e.g. "watch" → #watch-landing, #watch-hero
 * @param {string} props.eyebrow
 * @param {string} props.headline
 * @param {string} props.sub
 * @param {string} props.lineupTitle
 * @param {string} props.whyTitle
 * @param {Array}  props.lineup
 * @param {Array}  props.whyItems
 * @param {string} props.shopLabel
 */
const ProductLineLanding = ({
    idPrefix,
    eyebrow,
    headline,
    sub,
    lineupTitle,
    whyTitle,
    lineup,
    whyItems,
    shopLabel,
}) => {
    const heroRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const pageId = `${idPrefix}-landing`;
    const heroId = `${idPrefix}-hero`;
    const lineupId = `${idPrefix}-lineup`;
    const whyId = `why-${idPrefix}`;
    const ctaId = `${idPrefix}-store-cta`;

    useGSAP(() => {
        gsap.fromTo(
            `#${heroId} .line-hero-animate`,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power2.out",
            }
        );

        gsap.to(`#${lineupId} .mac-card`, {
            scrollTrigger: {
                trigger: `#${lineupId}`,
                start: isMobile ? "top 80%" : "top 60%",
            },
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.9,
            ease: "power2.out",
        });

        gsap.fromTo(
            `#${whyId} .why-mac-cell`,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: `#${whyId}`,
                    start: "top 70%",
                },
            }
        );
    }, { scope: heroRef, dependencies: [isMobile, idPrefix] });

    return (
        <>
            <main id={pageId} ref={heroRef}>
                <section id={heroId}>
                    <div className="line-hero-animate">
                        <p className="mac-eyebrow">{eyebrow}</p>
                        <h1>{headline}</h1>
                    </div>
                    <p className="line-hero-animate mac-hero-sub">{sub}</p>
                    <div className="line-hero-animate mac-hero-actions">
                        <Link to="/store" className="btn-primary-pill">
                            {shopLabel}
                        </Link>
                        <Link to="/support" className="btn-ghost-pill">
                            Get Support →
                        </Link>
                    </div>
                </section>

                <section id={lineupId}>
                    <h2 className="mac-section-title">{lineupTitle}</h2>
                    <div className="mac-lineup-grid">
                        {lineup.map((model) => (
                            <article key={model.id} className="mac-card">
                                {model.badge && (
                                    <span className="mac-card-badge">{model.badge}</span>
                                )}
                                <div className="mac-card-swatches">
                                    {model.colors.map(({ hex, label }) => (
                                        <span
                                            key={hex}
                                            className="mac-swatch"
                                            style={{ backgroundColor: hex }}
                                            aria-label={label}
                                        />
                                    ))}
                                </div>
                                <div className="mac-card-img-placeholder" aria-hidden="true" />
                                <div className="mac-card-body">
                                    <p className="mac-card-chip">{model.chip}</p>
                                    <h2 className="mac-card-name">{model.name}</h2>
                                    <p className="mac-card-highlight">{model.highlight}</p>
                                    <p className="mac-card-desc">{model.description}</p>
                                    <div className="mac-card-pricing">
                                        <span className="mac-card-price">
                                            From ${model.price.toLocaleString()}
                                        </span>
                                        <span className="mac-card-monthly">
                                            or ${model.monthly}/mo.
                                        </span>
                                    </div>
                                    <div className="mac-card-actions">
                                        <Link to="/store" className="btn-primary-pill">
                                            Learn more
                                        </Link>
                                        <Link to="/store" className="btn-ghost-pill">
                                            Buy →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id={whyId}>
                    <h2 className="mac-section-title">{whyTitle}</h2>
                    <div className="why-mac-grid">
                        {whyItems.map(({ id, icon, title, body }) => (
                            <div key={id} className="why-mac-cell">
                                <img src={icon} alt={title} className="why-mac-icon" />
                                <h3 className="why-mac-cell-title">{title}</h3>
                                <p className="why-mac-cell-body">{body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id={ctaId}>
                    <p className="mac-eyebrow">Ready to buy?</p>
                    <h2>Shop {eyebrow} in the Store.</h2>
                    <Link to="/store" className="btn-primary-pill">
                        Visit the Store
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ProductLineLanding;
