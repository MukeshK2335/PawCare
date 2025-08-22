import React from 'react';
import '../Style/Features.css';

const Features = () => {
  const features = [
    {
      title: 'Real-Time Health Monitoring',
      description: 'Keep a close eye on your pet\'s vitals with our real-time health monitoring dashboard. Track heart rate, temperature, and more, all from the comfort of your home.',
      icon: '❤️',
    },
    {
      title: 'AI-Powered Insights with JujuAI',
      description: 'Our intelligent AI, Juju, analyzes your pet\'s data to provide you with valuable insights and alerts about their health and well-being.',
      icon: '🤖',
    },
    {
      title: 'Personalized Pet Profiles',
      description: 'Create a unique profile for each of your pets to store their information, track their health history, and receive personalized recommendations.',
      icon: '🐾',
    },
    {
        title: 'Health Trend Analysis',
        description: 'Visualize your pet\'s health data over time with easy-to-understand charts and graphs. Identify trends and share them with your veterinarian.',
        icon: '📈',
    },
    {
        title: 'Emergency Alerts',
        description: 'Receive instant notifications on your phone if any of your pet\'s vitals go outside the normal range, allowing you to take immediate action.',
        icon: '🚨',
    },
    {
        title: 'Connect with Vets',
        description: 'Easily share your pet\'s health data with your veterinarian to get professional advice and care.',
        icon: '👨‍⚕️',
    }
  ];

  return (
    <div className="features-container">
      <h1 className="features-title">Features of PawCare</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
