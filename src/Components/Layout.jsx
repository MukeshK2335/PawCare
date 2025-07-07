import React from "react";
import '../Style/Layout.css';

const Layout = () => {
    return (
        <div className="LayoutContainer">
            <header className="header">
                <h1 className="heading">🐾 PawCare</h1>
            </header>
            <nav className="navigation">
                <a href="#dashboard" className="nav-link">
                    <span className="nav-icon">📊</span>
                    Dashboard
                </a>
                <a href="#reports" className="nav-link">
                    <span className="nav-icon">📋</span>
                    Reports
                </a>
                <a href="#pets" className="nav-link">
                    <span className="nav-icon">🐕</span>
                    My Pets
                </a>
                <a href="#appointments" className="nav-link">
                    <span className="nav-icon">📅</span>
                    Appointments
                </a>
            </nav>
        </div>
    )
}

export default Layout;