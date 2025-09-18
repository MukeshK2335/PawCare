import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database, db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { doc, collection, setDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import '../Style/Dashboard.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyBqapR-g_ly1lLUk5OzyOLlHZK6yxOr0rk"; // Use the same API key as jujuAi.jsx
const genAI = new GoogleGenerativeAI(API_KEY);

const normalRanges = {
    Temperature: [80, 102.5],
    'Heart Rate': [70, 120],
    'Pulse (SpO2)': [95, 100],
};

const isWithinRange = (value, [min, max]) => value >= min && value <= max;

const Dashboard = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [vitals, setVitals] = useState([
        { label: 'Temperature', value: '--', status: 'loading' },
        { label: 'Heart Rate', value: '--', status: 'loading' },
        { label: 'Respiratory', value: '--', status: 'not-available' },
        { label: 'Pulse (SpO2)', value: '--', status: 'loading' },
    ]);

    const respiratoryStatus = vitals.find(vital => vital.label === 'Respiratory')?.status;
    const [hasCheckedCheckbox, setHasCheckedCheckbox] = useState(false);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [prediction, setPrediction] = useState({ summary: "", diseases: [] });
    const [showPopup, setShowPopup] = useState(false);

    const handleCheckboxChange = (e, symptom) => {
        const { checked } = e.target;

        if (symptom === 'Nothing') {
            if (checked) {
                setSelectedSymptoms(['Nothing']);
            } else {
                setSelectedSymptoms([]);
            }
        } else {
            if (checked) {
                setSelectedSymptoms(prev => [...prev.filter(s => s !== 'Nothing'), symptom]);
            } else {
                setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
            }
        }
        setHasCheckedCheckbox(true);
    };

    useEffect(() => {
        const vitalsRef = ref(database, '/s_data');
        let currentVitalsData = null; // To store the latest vitals data

        const unsubscribe = onValue(vitalsRef, (snapshot) => {
            const rawData = snapshot.val();
            console.log("Raw Data from Firebase:", rawData);
            const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            currentVitalsData = data; // Update the latest data

            if (data) {
                const updatedVitals = [
                    {
                        label: 'Temperature',
                        value: data.tempF ? `${data.tempF}°F` : '--',
                        status: data.tempF ? 
                                isWithinRange(data.tempF, normalRanges['Temperature']) ? 'normal' : 'abnormal'
                                : 'no-data'
                    },
                    {
                        label: 'Heart Rate',
                        value: data.avgBPM ? `${data.avgBPM} BPM` : '--',
                        status: data.avgBPM ? 
                                isWithinRange(data.avgBPM, normalRanges['Heart Rate']) ? 'normal' : 'abnormal'
                                : 'no-data'
                    },
                    {
                        label: 'Respiratory',
                        value: (data.avgBPM && isWithinRange(data.avgBPM, normalRanges['Heart Rate']) && data.currentBPM && isWithinRange(data.currentBPM, normalRanges['Pulse (SpO2)'])) ? 'Normal' : 'Abnormal',
                        status: (data.avgBPM && isWithinRange(data.avgBPM, normalRanges['Heart Rate']) && data.currentBPM && isWithinRange(data.currentBPM, normalRanges['Pulse (SpO2)'])) ? 'normal' : 'abnormal'
                    },
                    {
                        label: 'Pulse (SpO2)',
                        value: data.currentBPM ? `${data.currentBPM}%` : '--',
                        status: data.currentBPM ? 
                                isWithinRange(data.currentBPM, normalRanges['Pulse (SpO2)']) ? 'normal' : 'abnormal'
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

        // Function to save vitals to Firestore
        const saveVitalsToFirestore = async () => {
            if (uid && currentVitalsData) {
                try {
                    await setDoc(doc(db, 'users', uid), {
                        vitalsHistory: arrayUnion({
                            ...currentVitalsData,
                            timestamp: serverTimestamp()
                        })
                    }, { merge: true }); // Use setDoc with merge: true
                    console.log('Vitals embedded in user document for:', uid);
                } catch (error) {
                    console.error('Error embedding vitals in user document:', error);
                }
            }
        };

        // Set up interval to save vitals every 15 minutes (900000 ms)
        const intervalId = setInterval(saveVitalsToFirestore, 300000);

        return () => {
            unsubscribe();
            clearInterval(intervalId); // Clear the interval on component unmount
        };
    }, [uid]); // Add uid to dependency array

    const handleSubmitReport = async () => {
        if (selectedSymptoms.length === 1 && selectedSymptoms[0] === 'Nothing') {
            setPrediction({
                summary: "There is a 50% chance of zoonotic diseases. Please visit a veterinary doctor for a checkup.",
                diseases: []
            });
            setShowPopup(true);
            return;
        }

        const abnormalVitals = vitals.filter(v => v.status === 'abnormal');

        if (abnormalVitals.length === 0 && selectedSymptoms.length === 0) {
            alert('No abnormal vitals or symptoms selected.');
            return;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `My pet has the following abnormal vitals: ${abnormalVitals.map(v => `${v.label}: ${v.value}`).join(', ')}. The following symptoms were observed: ${selectedSymptoms.join(', ')}. Based on these symptoms, please provide a short, one-sentence summary of the potential issue, followed by a list of potential Zoonotic diseases with their types (e.g., Viral, Bacterial, Fungal). Format the list with each disease on a new line, like this: "- Disease Name (Type)".`;

        try {
            const result = await model.generateContent(prompt, { temperature: 0.7 });
            const response = await result.response;
            const text = await response.text();

            // Save the report to Firestore
            const reportRef = doc(collection(db, "reports"));
            await setDoc(reportRef, {
                uid,
                vitals,
                selectedSymptoms,
                report: text,
                timestamp: serverTimestamp(),
            });

            const [summary, ...diseases] = text.split('\n').filter(line => line.trim() !== '');
            setPrediction({ summary, diseases });
            setShowPopup(true);

        } catch (error) {
            console.error("Error generating or saving report:", error);
            alert("Failed to generate or save the report. Please try again.");
        }
    };

    const symptomsList = [
        'Aggressive', 'Foaming Mouth', 'Paralysis', 'Hydrophobia',
        'Abnormal eyes', 'Bald patches', 'Skin Issues', 'Swollen parts', 'Nothing'
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
                    <button className="know-more-btn" onClick={() => navigate(`/analysis/${uid}`)}>Know More</button>

                    {/* Conditional section for respiratory status */}
                    <div className="respiratory-status-section">
                        {respiratoryStatus === 'abnormal' ? (
                            <div className="abnormal-questions">
                                <h3>Please check all that apply:</h3>
                                {symptomsList.map(symptom => (
                                    <label key={symptom}>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, symptom)}
                                            checked={selectedSymptoms.includes(symptom)}
                                        /> {symptom}
                                    </label>
                                ))}
                                {hasCheckedCheckbox && (
                                    <button className="submit-abnormal-report-btn" onClick={handleSubmitReport}>Submit Report</button>
                                )}
                            </div>
                        ) : (
                            <div className="all-fine-message">
                                <p>Everything was fine.</p>
                            </div>
                        )}
                    </div>
                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-card">
                                <button className="popup-close-btn" onClick={() => setShowPopup(false)}>×</button>
                                <h3>Zoonotic Disease Prediction:</h3>
                                <p>{prediction.summary}</p>
                                <h4>Potential Diseases:</h4>
                                <ul>
                                    {prediction.diseases.map((disease, index) => (
                                        <li key={index}>{disease}</li>
                                    ))}
                                </ul>
                                <h4>What to do next:</h4>
                                <p>Please visit a veterinarian immediately to confirm the diagnosis and get the right treatment.</p>
                                <p>Contact: +91 934567069</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;