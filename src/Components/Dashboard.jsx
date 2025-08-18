import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import '../Style/Dashboard.css';

const normalRanges = {
    Temperature: [101, 102.5],
    'Heart Rate': [70, 120],
    'Pulse (SpO2)': [95, 100],
};

const isWithinRange = (value, [min, max]) => value >= min && value <= max;

const Dashboard = () => {
    const { uid } = useParams();
    const [vitals, setVitals] = useState([
        { label: 'Temperature', value: '--', status: 'loading' },
        { label: 'Heart Rate', value: '--', status: 'loading' },
        { label: 'Respiratory', value: '--', status: 'not-available' },
        { label: 'Pulse (SpO2)', value: '--', status: 'loading' },
    ]);

    useEffect(() => {
        const vitalsRef = ref(database, '/data');
        
        const unsubscribe = onValue(vitalsRef, (snapshot) => {
            const data = snapshot.val();
            
            if (data) {
                const updatedVitals = [
                    {
                        label: 'Temperature',
                        value: data.temp || '--',
                        status: data.temp ? 
                                isWithinRange(data.temp, normalRanges['Temperature']) ? 'normal' : 'abnormal'
                                : 'no-data'
                    },
                    {
                        label: 'Heart Rate',
                        value: data.heart || '--',
                        status: data.heart ? 
                                isWithinRange(data.heart, normalRanges['Heart Rate']) ? 'normal' : 'abnormal'
                                : 'no-data'
                    },
                    {
                        label: 'Respiratory',
                        value: (data.heart && isWithinRange(data.heart, normalRanges['Heart Rate'])) ? 'Normal' : 'Abnormal',
                        status: (data.heart && !isWithinRange(data.heart, normalRanges['Heart Rate'])) ? 'abnormal' :
                                (data.heart && isWithinRange(data.heart, normalRanges['Heart Rate'])) ? 'normal' :
                                (data.respiratory ?
                                isWithinRange(data.respiratory, [12, 20]) ? 'normal' : 'abnormal'
                                : 'not-available')
                    },
                    {
                        label: 'Pulse (SpO2)',
                        value: data.spo2 || '--',
                        status: data.spo2 ? 
                                isWithinRange(data.spo2, normalRanges['Pulse (SpO2)']) ? 'normal' : 'abnormal'
                                : 'no-data'
                    }
                ];

                setVitals(updatedVitals);
            } else {
                setVitals([
                    { label: 'Temperature', value: '--', status: 'no-data' },
                    { label: 'Heart Rate', value: '--', status: 'no-data' },
                    { label: 'Respiratory', value: '--', status: 'no-data' },
                    { label: 'Pulse (SpO2)', value: '--', status: 'no-data' },
                ]);
            }
        }, (error) => {
            console.error('Error fetching vitals:', error);
            setVitals([
                { label: 'Temperature', value: '--', status: 'error' },
                { label: 'Heart Rate', value: '--', status: 'error' },
                { label: 'Respiratory', value: '--', status: 'error' },
                { label: 'Pulse (SpO2)', value: '--', status: 'error' },
            ]);
        });

        return () => {
            unsubscribe();
        };
    }, []);

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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ef4444" />
                            </svg>
                        </div>
                    </div>

                    <div className="vitals-grid">
                        {vitals.map((vital, index) => (
                            <div key={index} className={`vital-card shadow-${vital.status}`}>
                                <div className="vital-header">
                                    <span className="vital-label">{vital.label}</span>
                                    {vital.status !== 'not-available' && (
                                        <div className={`vital-status-icon ${vital.status}`}>
                                            {vital.status === 'abnormal' ? (
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2a10 10 0 1 0 0.001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                                                </svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="vital-value">{vital.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
