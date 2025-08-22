import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // Re-import Firestore functions
import { db } from '../firebase'; // Re-import db
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../Style/Analysis.css';

const Analysis = () => {
  const { uid } = useParams();
  const [vitalsData, setVitalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVitals = async () => {
      if (!uid) {
        setError("User ID not found in URL.");
        setLoading(false);
        return;
      }

      try {
        const vitalsCollectionRef = collection(db, 'users', uid, 'vitals_history'); // Target new subcollection
        const q = query(vitalsCollectionRef, orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const date = data.timestamp ? data.timestamp.toDate() : new Date(); // Convert Firebase Timestamp to Date
          return {
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            Temperature: data.tempF,
            'Heart Rate': data.avgBPM,
            'Pulse (SpO2)': data.currentBPM,
          };
        });
        setVitalsData(fetchedData);
      } catch (err) {
        console.error("Error fetching vitals for analysis:", err);
        setError("Failed to load vital data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, [uid]);

  // Re-enable conditional rendering for loading, error, and empty data
  if (loading) {
    return <div className="analysis-container"><p>Loading vital data...</p></div>;
  }

  if (error) {
    return <div className="analysis-container"><p className="error-message">{error}</p></div>;
  }

  if (vitalsData.length === 0) {
    return <div className="analysis-container"><p>No vital data available for analysis.</p></div>;
  }

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Vital Data Analysis</h1>
      <p className="analysis-description">
        Dive deeper into your pet's health data. Our advanced analysis tools provide insights into trends,
        patterns, and potential health concerns, helping you make informed decisions for your pet's well-being.
      </p>
      <div className="charts-grid"> {/* New div for grid layout */}
        {/* Temperature Chart */}
        <div className="chart-card">
          <h2>Temperature (°F)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vitalsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Temperature" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heart Rate Chart */}
        <div className="chart-card">
          <h2>Heart Rate (BPM)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vitalsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Heart Rate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pulse (SpO2) Chart */}
        <div className="chart-card">
          <h2>Pulse (SpO2) (%)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vitalsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Pulse (SpO2)" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;