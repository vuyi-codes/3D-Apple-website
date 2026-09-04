// iPhone Landing page — /iphone
//
// Mirrors MacLanding structure (hero → lineup → why grid → store CTA) but
// without a 3D viewer — there is no iPhone .glb in this project. Cards use
// the same .mac-card / .why-mac-cell visual classes for consistency.
// "Learn more" / Buy send users to /store until a dedicated iPhone detail
// page exists (frontend mock only — no API).
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { iphoneLineup, whyIphone } from "../constants";
import Footer from "../components/Footer";

const IphoneHero = () => {
    const heroRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            "#iphone-hero .iphone-hero-animate",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power2.out",
            }
        );
    }, { scope: heroRef });

    return (
        <section id="iphone-hero" ref={heroRef}>
            <div className="iphone-hero-animate">
                <p className="mac-eyebrow">iPhone</p>
                <h1>Designed to be loved.</h1>
            </div>
            <p className="iphone-hero-animate mac-hero-sub">
                Apple Intelligence. Camera Control. A18 family chips.
                The most advanced iPhone lineup yet.
            </p>
            <div className="iphone-hero-animate mac-hero-actions">
                <Link to="/store" className="btn-primary-pill">
                    Shop iPhone
                </Link>
                <Link to="/support" className="btn-ghost-pill">
                    Get Support →
                </Link>
            </div>
        </section>
    );
};

const IphoneCard = ({ model }) => {
    const { name, chip, highlight, description, price, monthly, colors, badge } = model;

    return (
        <article className="mac-card">
            {badge && <span className="mac-card-badge">{badge}</span>}

            <div className="mac-card-swatches">
                {colors.map(({ hex, label }) => (
                    <span
                        key={hex}
                        className="mac-swatch"
                        style={{ backgroundColor: hex }}
                        aria-label={label}
                    />
                ))}
            </div>

            {/* Gradient placeholder — same approach as Mac landing cards */}
            <div className="mac-card-img-placeholder" aria-hidden="true" />

            <div className="mac-card-body">
                <p className="mac-card-chip">{chip}</p>
                <h2 className="mac-card-name">{name}</h2>
                <p className="mac-card-highlight">{highlight}</p>
                <p className="mac-card-desc">{description}</p>

                <div className="mac-card-pricing">
                    <span className="mac-card-price">From ${price.toLocaleString()}</span>
                    <span className="mac-card-monthly">or ${monthly}/mo.</span>
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
    );
};

const IphoneLineup = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        gsap.to("#iphone-lineup .mac-card", {
            scrollTrigger: {
                trigger: "#iphone-lineup",
                start: isMobile ? "top 80%" : "top 60%",
            },
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.9,
            ease: "power2.out",
        });
    }, [isMobile]);

    return (
        <section id="iphone-lineup">
            <h2 className="mac-section-title">Choose your iPhone.</h2>
            <div className="mac-lineup-grid">
                {iphoneLineup.map((model) => (
                    <IphoneCard key={model.id} model={model} />
                ))}
            </div>
        </section>
    );
};

const WhyIphone = () => {
    useGSAP(() => {
        gsap.fromTo(
            "#why-iphone .why-mac-cell",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: "#why-iphone",
                    start: "top 70%",
                },
            }
        );
    });

    return (
        <section id="why-iphone">
            <h2 className="mac-section-title">Why iPhone.</h2>
            <div className="why-mac-grid">
                {whyIphone.map(({ id, icon, title, body }) => (
                    <div key={id} className="why-mac-cell">
                        <img src={icon} alt={title} className="why-mac-icon" />
                        <h3 className="why-mac-cell-title">{title}</h3>
                        <p className="why-mac-cell-body">{body}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const IphoneStoreCTA = () => (
    <section id="iphone-store-cta">
        <p className="mac-eyebrow">Ready to buy?</p>
        <h2>Shop the iPhone lineup.</h2>
        <Link to="/store" className="btn-primary-pill">
            Visit the Store
        </Link>
    </section>
);

const IphoneLanding = () => (
    <>
        <main id="iphone-landing">
            <IphoneHero />
            <IphoneLineup />
            <WhyIphone />
            <IphoneStoreCTA />
        </main>
        <Footer />
    </>
);

export default IphoneLanding;
