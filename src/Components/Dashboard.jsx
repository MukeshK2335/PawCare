import React from 'react';
import '../Style/Dashboard.css';

const Dashboard = () => {
    const vitals = [
        {
            label: 'Temperature',
            value: '101.2°F',
            status: 'normal'
        },
        {
            label: 'Heart Rate',
            value: '95 bpm',
            status: 'normal'
        },
        {
            label: 'Respiratory',
            value: '18 bpm',
            status: 'normal'
        },
        {
            label: 'Pulse',
            value: '80%',
            status: 'normal'
        }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className="dashboard-card">
                    <div className="dashboard-header">
                        <div className="dashboard-title">
                            <h2>Pet Health Summary</h2>
                            <p>Real-time monitoring</p>
                        </div>
                        <div className="dashboard-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ef4444"/>
                            </svg>
                        </div>
                    </div>

                    <div className="vitals-grid">
                        {vitals.map((vital, index) => (
                            <div key={index} className="vital-card">
                                <div className="vital-header">
                                    <span className="vital-label">{vital.label}</span>
                                    <div className={`vital-status ${vital.status}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="vital-value">{vital.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="status-indicator">
                        <div className="status-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="status-text">
                            <span className="status-title">All Vitals Normal</span>
                            <span className="status-time">Updated 3 mins ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;