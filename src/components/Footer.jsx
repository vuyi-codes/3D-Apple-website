// Site footer — copyright + secondary nav into real routes.
// Real paths use React Router <Link>; leftover "#" entries (if any) stay as <a>.
import { Link } from "react-router-dom";
import { footerLinks } from "../constants/index.js";

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>
                    More ways to shop:{" "}
                    <Link to="/store" className="text-primary hover:underline">
                        Visit the Store
                    </Link>
                    {" "}or call 000800 040 1966.
                </p>
                <Link to="/" aria-label="Apple Home">
                    <img src="/logo.svg" alt="Apple logo" />
                </Link>
            </div>

            <hr />

            <div className="links">
                <p>Copyright © 2024 Apple Inc. All rights reserved Vuyisile Nqono.</p>

                <ul>
                    {footerLinks.map(({ label, link }) => (
                        <li key={label}>
                            {link === "#" ? (
                                <a href="#">{label}</a>
                            ) : (
                                <Link to={link}>{label}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
