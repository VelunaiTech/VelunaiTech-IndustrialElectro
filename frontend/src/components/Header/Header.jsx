import "./Header.css";

import { Link } from "react-router-dom";

import {
    FaMoon,
    FaSun,
    FaPhoneAlt,
    FaCamera,
    FaBolt
} from "react-icons/fa";

import { useTheme } from "../../context/ThemeContext";


function Header() {

    const {
        theme,
        toggleTheme
    } = useTheme();


    return (

        <header className="header">

            <div className="container header-inner">

                {/* ================= LOGO ================= */}

                <Link
                    to="/"
                    className="logo"
                >

                    <FaBolt className="logo-icon" />

                    <div className="logo-text">

                        <h2>
                            IndustrialElectro
                        </h2>

                        <span>
                            Industrial Automation Solutions
                        </span>

                    </div>

                </Link>


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

                    {/* ================= THEME ================= */}

                    <button
                        type="button"
                        className="theme-btn"
                        onClick={toggleTheme}
                        aria-label={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                        title={
                            theme === "light"
                                ? "Dark Mode"
                                : "Light Mode"
                        }
                    >

                        {theme === "light" ? (
                            <FaMoon />
                        ) : (
                            <FaSun />
                        )}

                    </button>


                    {/* ================= REQUEST MATERIAL ================= */}

                    <Link
                        to="/request-material"
                        className="request-btn"
                    >

                        <FaCamera />

                        <span>
                            Request
                        </span>

                    </Link>


                    {/* ================= CONTACT ================= */}

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