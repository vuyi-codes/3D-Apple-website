// SearchOverlay — full-screen panel opened from the navbar search icon.
// Filters the static `searchIndex` in constants (pages, Macs, accessories, FAQs).
// No API / no server — query stays in local component state.
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchIndex } from "../constants";
import useMacbookStore from "../store";

const SearchOverlay = () => {
    const { searchOpen, closeSearch } = useMacbookStore();
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    // Focus the input whenever the overlay opens; clear query on close
    useEffect(() => {
        if (searchOpen) {
            setQuery("");
            // Small delay so the input is mounted/visible before focus
            const id = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(id);
        }
    }, [searchOpen]);

    // Escape closes the overlay
    useEffect(() => {
        if (!searchOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeSearch();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [searchOpen, closeSearch]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return searchIndex.slice(0, 8); // quick links when empty
        return searchIndex.filter(
            ({ title, blurb, type }) =>
                title.toLowerCase().includes(q) ||
                blurb.toLowerCase().includes(q) ||
                type.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <>
            <div
                className={`search-backdrop ${searchOpen ? "search-backdrop-open" : ""}`}
                onClick={closeSearch}
                aria-hidden={!searchOpen}
            />

            <div
                id="search-overlay"
                className={searchOpen ? "search-overlay-open" : ""}
                aria-hidden={!searchOpen}
                role="dialog"
                aria-label="Site search"
            >
                <div className="search-overlay-inner">
                    <div className="search-overlay-bar">
                        <img src="/search.svg" alt="" aria-hidden="true" />
                        <input
                            ref={inputRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Mac, Store, Support…"
                            aria-label="Search the site"
                        />
                        <button type="button" onClick={closeSearch} aria-label="Close search">
                            ✕
                        </button>
                    </div>

                    <p className="search-hint">
                        {query.trim()
                            ? `${results.length} result${results.length === 1 ? "" : "s"}`
                            : "Quick links"}
                    </p>

                    {results.length === 0 ? (
                        <p className="search-empty">No matches for “{query}”.</p>
                    ) : (
                        <ul className="search-results">
                            {results.map(({ id, type, title, blurb, href }) => (
                                <li key={id}>
                                    <Link to={href} onClick={closeSearch} className="search-result">
                                        <span className="search-result-type">{type}</span>
                                        <span className="search-result-title">{title}</span>
                                        <span className="search-result-blurb">{blurb}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchOverlay;
