// Support page — /support
//
// Topic cards + searchable FAQ accordion. Filtering is local string match
// on question/answer/topic — no API. Accordion is one-open-at-a-time.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { supportFaqs, supportTopics } from "../constants";
import Footer from "../components/Footer";

const Support = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const [query, setQuery] = useState("");
    const [openId, setOpenId] = useState(null);

    const filteredFaqs = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return supportFaqs;
        return supportFaqs.filter(
            ({ question, answer, topic }) =>
                question.toLowerCase().includes(q) ||
                answer.toLowerCase().includes(q) ||
                topic.toLowerCase().includes(q)
        );
    }, [query]);

    useGSAP(() => {
        gsap.fromTo(
            ".support-hero-animate",
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );

        gsap.fromTo(
            ".support-topic",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#support-topics",
                    start: isMobile ? "top 85%" : "top 70%",
                },
            }
        );
    }, [isMobile]);

    const toggleFaq = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <main id="support-page">
                <section id="support-hero">
                    <p className="support-eyebrow support-hero-animate">Support</p>
                    <h1 className="support-hero-animate">How can we help?</h1>
                    <p className="support-hero-sub support-hero-animate">
                        Search FAQs or jump into a topic. Answers are mock copy for this frontend build.
                    </p>
                    <label className="support-search support-hero-animate">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Mac, bag, checkout…"
                            aria-label="Search FAQs"
                        />
                    </label>
                </section>

                <section id="support-topics">
                    <h2 className="support-section-title">Topics</h2>
                    <div className="support-topics-grid">
                        {supportTopics.map(({ id, title, body, href }) => (
                            <Link key={id} to={href} className="support-topic">
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section id="support-faq">
                    <h2 className="support-section-title">Frequently asked</h2>
                    {filteredFaqs.length === 0 ? (
                        <p className="support-empty">No results for “{query}”. Try Mac, bag, or checkout.</p>
                    ) : (
                        <ul className="support-faq-list">
                            {filteredFaqs.map(({ id, topic, question, answer }) => {
                                const isOpen = openId === id;
                                return (
                                    <li key={id} className="support-faq-item">
                                        <button
                                            type="button"
                                            className="support-faq-q"
                                            aria-expanded={isOpen}
                                            onClick={() => toggleFaq(id)}
                                        >
                                            <span>
                                                <span className="support-faq-topic">{topic}</span>
                                                {question}
                                            </span>
                                            <span className="support-faq-icon" aria-hidden="true">
                                                {isOpen ? "−" : "+"}
                                            </span>
                                        </button>
                                        {isOpen && <p className="support-faq-a">{answer}</p>}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Support;
