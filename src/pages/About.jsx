// About page — /about
//
// Static brand story: hero, values grid, company timeline.
// GSAP matches Mac Landing / Performance — mount fade for the hero,
// fromTo + stagger + ScrollTrigger for the rest. All copy is mock/local.
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { aboutTimeline, aboutValues } from "../constants";
import Footer from "../components/Footer";

const About = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        gsap.fromTo(
            ".about-hero-animate",
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power2.out" }
        );

        gsap.fromTo(
            ".about-value",
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about-values",
                    start: isMobile ? "top 85%" : "top 70%",
                },
            }
        );

        gsap.fromTo(
            ".about-year",
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about-timeline",
                    start: isMobile ? "top 85%" : "top 70%",
                },
            }
        );
    }, [isMobile]);

    return (
        <>
            <main id="about-page">
                <section id="about-hero">
                    <div className="line-hero-media" aria-hidden="true">
                        <video
                            src="/videos/about_bg.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="line-hero-overlay" />
                    </div>

                    <div className="line-hero-content">
                        <p className="about-eyebrow about-hero-animate">About Apple</p>
                        <h1 className="about-hero-animate">Think different.</h1>
                        <p className="about-hero-sub about-hero-animate">
                            We design tools that help people create, connect, and learn —
                            with privacy, accessibility, and the planet built in from the start.
                        </p>
                    </div>
                </section>

                <section id="about-values">
                    <h2 className="about-section-title">What we believe.</h2>
                    <div className="about-values-grid">
                        {aboutValues.map(({ id, title, body }) => (
                            <article key={id} className="about-value">
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="about-timeline">
                    <h2 className="about-section-title">A few moments.</h2>
                    <ol className="about-timeline-list">
                        {aboutTimeline.map(({ year, title, body }) => (
                            <li key={year} className="about-year">
                                <p className="about-year-num">{year}</p>
                                <div>
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section id="about-cta">
                    <p className="about-eyebrow">Explore</p>
                    <h2>See what Mac can do.</h2>
                    <div className="about-cta-actions">
                        <Link to="/mac" className="btn-primary-pill">
                            Browse Mac
                        </Link>
                        <Link to="/support" className="btn-ghost-pill">
                            Get Support →
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
