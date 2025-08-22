import React from 'react';
import '../Style/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      title: '1. Set Up Your Pet\'s Profile',
      description: 'Create a profile for your furry friend. Add their name, breed, age, and other important information. This helps us personalize their health monitoring experience.',
      icon: '📝',
    },
    {
      title: '2. Attach the PawCare Device',
      description: 'Our small, lightweight device comfortably attaches to your pet\'s collar. It continuously monitors their vital signs without causing any discomfort.',
      icon: '🛰️',
    },
    {
      title: '3. Monitor Real-Time Data',
      description: 'View your pet\'s real-time health data on your dashboard. Track their heart rate, temperature, and activity levels from anywhere, at any time.',
      icon: '💻',
    },
    {
      title: '4. Receive AI-Powered Insights',
      description: 'JujuAI, our intelligent system, analyzes the data to provide you with actionable insights and alerts. Know when your pet needs attention or a visit to the vet.',
      icon: '🧠',
    },
  ];

  return (
    <div className="how-it-works-container">
      <h1 className="how-it-works-title">How PawCare Works</h1>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <h2 className="step-title">{step.title}</h2>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
