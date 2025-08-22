import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Header.css';
import {useNavigate} from "react-router-dom";
import logo from '../assets/Logo.jpg';

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
                    <img src={logo} alt="Pawcare Logo" className="logo-icon" />
                    <span className="logo-text">Pawcare</span>
                </Link>

                <nav className="nav">
                    <Link to="/features" className="nav-link">Features</Link>
                    <Link to="/how-it-works" className="nav-link">How it Works</Link>
                    

                </nav>

                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;