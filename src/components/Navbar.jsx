// Navbar — persistent global header present on every page (rendered in App.jsx).
//
// Features:
//  - NavLink from React Router with active styles
//  - Desktop mega-menu dropdown on hover (Store / product lines — not Support)
//  - Mobile hamburger menu for small screens
//  - Search, cart, and Sign In stay icon/button-only (no mega menu)
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks, navMegaMenus } from "../constants";
import useMacbookStore from "../store";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);
    const closeMega = () => setActiveMega(null);
    const { toggleCart, toggleSearch, openAuth, cart } = useMacbookStore();
    const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

    const mega = activeMega ? navMegaMenus[activeMega] : null;

    return (
        <>
            <header className={activeMega ? "nav-mega-open" : ""}>
                {/* Hover region: desktop links + mega panel — leave closes menu */}
                <div
                    className="nav-mega-zone"
                    onMouseLeave={closeMega}
                >
                    <nav>
                        <Link
                            to="/"
                            onClick={() => {
                                closeMenu();
                                closeMega();
                            }}
                        >
                            <img src="/logo.svg" alt="Apple logo" />
                        </Link>

                        <ul className="nav-desktop-links">
                            {navLinks.map(({ label, path }) => {
                                const hasMega = Boolean(navMegaMenus[label]);

                                return (
                                    <li
                                        key={label}
                                        onMouseEnter={() => {
                                            if (hasMega) setActiveMega(label);
                                            else closeMega();
                                        }}
                                    >
                                        {path === "#" ? (
                                            <a href="#">{label}</a>
                                        ) : (
                                            <NavLink
                                                to={path}
                                                onClick={closeMega}
                                                className={({ isActive }) =>
                                                    [
                                                        isActive ? "!opacity-100 !text-white" : "",
                                                        activeMega === label
                                                            ? "!opacity-100 !text-white"
                                                            : "",
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ")
                                                }
                                            >
                                                {label}
                                            </NavLink>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="flex-center gap-3">
                            <button
                                type="button"
                                aria-label="Search"
                                onClick={() => {
                                    closeMega();
                                    toggleSearch();
                                }}
                            >
                                <img src="/search.svg" alt="Search" />
                            </button>
                            <button
                                type="button"
                                aria-label="Open bag"
                                className="nav-cart-btn"
                                onClick={() => {
                                    closeMega();
                                    toggleCart();
                                }}
                            >
                                <img src="/cart.svg" alt="Cart" />
                                {cartCount > 0 && (
                                    <span className="nav-cart-badge">{cartCount}</span>
                                )}
                            </button>

                            <button
                                type="button"
                                className="nav-signup-btn"
                                onClick={() => {
                                    closeMenu();
                                    closeMega();
                                    openAuth("signin");
                                }}
                            >
                                Sign In
                            </button>

                            <button
                                className="md:hidden flex flex-col justify-center items-center gap-[5px] w-6 h-6 cursor-pointer"
                                onClick={toggleMenu}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={menuOpen}
                            >
                                <span
                                    className={`block h-[2px] w-full bg-white rounded transition-all duration-300 origin-center ${
                                        menuOpen ? "rotate-45 translate-y-[7px]" : ""
                                    }`}
                                />
                                <span
                                    className={`block h-[2px] w-full bg-white rounded transition-all duration-300 ${
                                        menuOpen ? "opacity-0 scale-x-0" : ""
                                    }`}
                                />
                                <span
                                    className={`block h-[2px] w-full bg-white rounded transition-all duration-300 origin-center ${
                                        menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </nav>

                    {/* Full-width mega panel — desktop only */}
                    <div
                        className={`nav-mega-panel ${mega ? "nav-mega-panel-open" : ""}`}
                        aria-hidden={!mega}
                    >
                        {mega && (
                            <div className="nav-mega-inner">
                                <div className="nav-mega-col">
                                    <p className="nav-mega-heading">{mega.exploreTitle}</p>
                                    <ul className="nav-mega-explore">
                                        {mega.explore.map(({ label, href }) => (
                                            <li key={label}>
                                                <Link to={href} onClick={closeMega}>
                                                    {label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="nav-mega-col">
                                    <p className="nav-mega-heading">{mega.moreTitle}</p>
                                    <ul className="nav-mega-more">
                                        {mega.more.map(({ label, href }) => (
                                            <li key={label}>
                                                <Link to={href} onClick={closeMega}>
                                                    {label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`md:hidden w-full bg-black border-t border-dark-200 overflow-hidden transition-all duration-300 ease-in-out ${
                        menuOpen ? "max-h-screen py-4" : "max-h-0"
                    }`}
                >
                    <ul className="flex flex-col items-start gap-1 px-5">
                        {navLinks.map(({ label, path }) => (
                            <li key={label} className="w-full">
                                {path === "#" ? (
                                    <a
                                        href="#"
                                        className="block py-3 text-white opacity-80 font-regular text-sm"
                                        onClick={closeMenu}
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <NavLink
                                        to={path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `block py-3 font-regular text-sm transition-all duration-200 ${
                                                isActive
                                                    ? "text-white opacity-100"
                                                    : "text-white opacity-80 hover:opacity-100"
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </header>

            {/* Dim + blur page content while mega menu is open */}
            <div
                className={`nav-mega-backdrop ${mega ? "nav-mega-backdrop-open" : ""}`}
                aria-hidden={!mega}
                onClick={closeMega}
            />
        </>
    );
};

export default Navbar;
