import React from 'react';
import '../Style/Stats.css';

const Stats = () => {
    const stats = [
        {
            value: '98%',
            label: 'Detection Accuracy'
        },
        {
            value: '24/7',
            label: 'Monitoring'
        },
        {
            value: '2.5K+',
            label: 'Pets Protected'
        },

    ];

    return (
        <section className="stats">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;