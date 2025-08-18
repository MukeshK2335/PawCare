import React, { useState } from 'react';
import '../Style/Hero.css';
import pawImage from "../assets/paw.png";
import JujuAI from '../Components/jujuAi.jsx';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [zoomed, setZoomed] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Smart Health Monitoring for Your Dogs
                        </h1>
                        <p className="hero-description">
                            Track your pet's vital signs in real-time with accurate monitoring of
                            temperature, respiratory rate, heart rate, and pulse. Keep your furry
                            friends healthy and catch potential issues early.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={() => navigate('/Login')}>Get Started</button>
                            <button className="btn-secondary">Learn How It Works</button>
                        </div>
                    </div>
                    <div className="hero-image-holder">
                        <img
                            src={pawImage}
                            className={`hero-image ${zoomed ? 'zoom-in' : 'zoom-out'}`}
                            onMouseEnter={() => setZoomed(true)}
                            onMouseLeave={() => setZoomed(false)}
                            alt="Hero"
                        />
                    </div>
                </div>
            </div>

            {/* 🧠 Juju AI Assistant Floating Button */}
            <JujuAI />
        </section>
    );
};

export default Hero;
