// Navbar — persistent global header present on every page (rendered in App.jsx).
//
// Features:
//  - NavLink from React Router: auto-applies an "active" class when the current
//    URL matches the link's path, so users always see which page they're on.
//  - Mobile hamburger menu: hidden on md+ screens, toggles a slide-down
//    full-width panel with all nav links stacked vertically.
//  - Same visual tokens (bg-black, text-white, font-regular, hover:opacity-100)
//    as the original implementation — no existing styles broken.
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "../constants";
import useMacbookStore from "../store";

const Navbar = () => {
    // Controls whether the mobile menu panel is open
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);
    const { toggleCart, cart } = useMacbookStore();
    const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

    return (
        <header>
            <nav>
                {/* Logo — always links back to the homepage */}
                <Link to="/" onClick={closeMenu}>
                    <img src="/logo.svg" alt="Apple logo" />
                </Link>

                {/* Desktop nav links — hidden below md breakpoint (matches existing CSS) */}
                <ul>
                    {navLinks.map(({ label, path }) => (
                        <li key={label}>
                            {/* NavLink adds class "active" when route matches.
                                Placeholder "#" paths use a plain anchor so
                                React Router doesn't navigate anywhere. */}
                            {path === "#" ? (
                                <a href="#">{label}</a>
                            ) : (
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        isActive ? "!opacity-100 !text-white" : ""
                                    }
                                >
                                    {label}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right-side controls: search, cart, and mobile hamburger */}
                <div className="flex-center gap-3">
                    <button aria-label="Search">
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button
                        type="button"
                        aria-label="Open bag"
                        className="nav-cart-btn"
                        onClick={toggleCart}
                    >
                        <img src="/cart.svg" alt="Cart" />
                        {cartCount > 0 && (
                            <span className="nav-cart-badge">{cartCount}</span>
                        )}
                    </button>

                    {/* Hamburger button — only visible below md breakpoint */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-6 h-6 cursor-pointer"
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {/* Three bars animate into an X when menu is open */}
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

            {/* Mobile menu panel — slides down when menuOpen is true.
                Hidden entirely on md+ screens via CSS (the desktop <ul>
                already handles navigation there). */}
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
    );
};

export default Navbar;
