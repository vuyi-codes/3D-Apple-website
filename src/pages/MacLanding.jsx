// Mac Landing page — /mac
//
// Sections:
//  1. Hero          — full-bleed headline + sub-copy, GSAP fade+slide up on mount
//  2. Lineup Grid   — 3 model cards with staggered scroll-reveal (same pattern
//                     as Highlights.jsx: gsap.to + stagger + ScrollTrigger)
//  3. Why Mac       — 6-cell feature grid, fade-in on scroll (fromTo pattern
//                     matching Performance.jsx)
//  4. Compare CTA   — simple centred banner linking to /compare
//
// All data comes from constants/index.js — no API calls.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { macLineup, whyMac } from "../constants";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// ─── Mac Hero ────────────────────────────────────────────────────────────────
const MacHero = () => {
    const heroRef = useRef(null);

    useGSAP(() => {
        // Staggered fade + slide-up on mount (no ScrollTrigger — immediate entry)
        gsap.fromTo(
            "#mac-hero .mac-hero-animate",
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
        <section id="mac-hero" ref={heroRef}>
            <div className="line-hero-media" aria-hidden="true">
                <video
                    src="/videos/mac_bg.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="line-hero-overlay" />
            </div>

            <div className="line-hero-content">
                <div className="mac-hero-animate">
                    <p className="mac-eyebrow">Mac</p>
                    <h1>The best Mac for every ambition.</h1>
                </div>
                <p className="mac-hero-animate mac-hero-sub">
                    Powered by Apple silicon. Built for Apple Intelligence.
                    Designed to go anywhere you do.
                </p>
                <div className="mac-hero-animate mac-hero-actions">
                    <Link to="/mac/macbook-pro-14" className="btn-primary-pill">
                        Shop MacBook Pro
                    </Link>
                    <Link to="/compare" className="btn-ghost-pill">
                        Compare all models →
                    </Link>
                </div>
            </div>
        </section>
    );
};

// ─── Lineup Grid ─────────────────────────────────────────────────────────────
const LineupGrid = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        // Staggered reveal — identical pattern to Highlights.jsx
        gsap.to(".mac-card", {
            scrollTrigger: {
                trigger: "#mac-lineup",
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
        <section id="mac-lineup">
            <h2 className="mac-section-title">Choose your Mac.</h2>
            <div className="mac-lineup-grid">
                {macLineup.map((model) => (
                    <ProductCard
                        key={model.id}
                        model={model}
                        primaryHref={
                            model.storeScale != null
                                ? `/mac/${model.slug}`
                                : `/store/${model.slug}`
                        }
                    />
                ))}
            </div>
        </section>
    );
};

// ─── Why Mac ─────────────────────────────────────────────────────────────────
const WhyMac = () => {
    useGSAP(() => {
        // fromTo fade — matches Performance.jsx pattern
        gsap.fromTo(
            ".why-mac-cell",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: "#why-mac",
                    start: "top 70%",
                },
            }
        );
    });

    return (
        <section id="why-mac">
            <h2 className="mac-section-title">Why Mac.</h2>
            <div className="why-mac-grid">
                {whyMac.map(({ id, icon, title, body }) => (
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

// ─── Compare CTA ─────────────────────────────────────────────────────────────
const CompareCTA = () => (
    <section id="mac-compare-cta">
        <p className="mac-eyebrow">Not sure which Mac?</p>
        <h2>Compare every model side by side.</h2>
        <Link to="/compare" className="btn-primary-pill">
            Compare Macs
        </Link>
    </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const MacLanding = () => (
    <>
        <main id="mac-landing">
            <MacHero />
            <LineupGrid />
            <WhyMac />
            <CompareCTA />
        </main>
        <Footer />
    </>
);

export default MacLanding;
