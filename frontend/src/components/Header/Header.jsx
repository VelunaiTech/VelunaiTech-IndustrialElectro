import "./Header.css";

import { Link } from "react-router-dom";

import {
    FaMoon,
    FaPhoneAlt,
    FaCamera,
    FaBolt
} from "react-icons/fa";

function Header() {
    return (
        <header className="header">

            <div className="container header-inner">

                {/* ================= LOGO ================= */}

                <div className="logo">

                    <FaBolt className="logo-icon" />

                    <div className="logo-text">

                        <h2>IndustrialElectro</h2>

                        <span>
                            Industrial Automation Solutions
                        </span>

                    </div>

                </div>

                {/* ================= NAVIGATION ================= */}

                <nav className="navigation">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                </nav>

                {/* ================= RIGHT SIDE ================= */}

                <div className="header-right">

                    {/* Language */}

                    <div className="lang-switcher">

                        <select defaultValue="English">

                            <option value="English">
                                English
                            </option>

                            <option value="Tamil">
                                Tamil
                            </option>

                        </select>

                    </div>

                    {/* Theme */}

                    <button
                        type="button"
                        className="theme-btn"
                    >
                        <FaMoon />
                    </button>

                    {/* Request Material */}

                    <button
                        type="button"
                        className="request-btn"
                    >
                        <FaCamera />

                        <span>
                            Request
                        </span>

                    </button>

                    {/* Contact */}

                    <Link
                        to="/contact"
                        className="contact-btn"
                    >
                        <FaPhoneAlt />

                        <span>
                            Contact
                        </span>
                    </Link>

                </div>

            </div>

        </header>
    );
}

export default Header;