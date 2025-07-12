import React, {useState} from 'react';
import '../Style/Hero.css';
import pawImage from "../assets/paw.png"

const Hero = () => {
    const [zoomed, setZoomed] = useState(false);
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Smart Health Monitoring for Your Cats
                        </h1>
                        <p className="hero-description">
                            Track your pet's vital signs in real-time with accurate monitoring of
                            temperature, respiratory rate, heart rate, and pulse. Keep your furry
                            friends healthy and catch potential issues early.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-primary">Get Started</button>
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
        </section>
    );
};

export default Hero;