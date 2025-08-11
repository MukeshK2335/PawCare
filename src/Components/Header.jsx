import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Header.css';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <div className="logo-icon">⚗️</div>
                    <span className="logo-text">Pawcare</span>
                </Link>

                <nav className="nav">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it Works</a>
                    <a href="#testimonials" className="nav-link">Testimonials</a>

                </nav>

                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                    </button>
                    <button className="launch-btn" onClick={()=>navigate("/Login")}>
                        Launch Pet Dashboard
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;