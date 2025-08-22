import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Dashboard from './components/Dashboard';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignIn.jsx';
import Features from './Components/Features';
import HowItWorks from './Components/HowItWorks';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Stats />
                        </>
                    } />
                    <Route path="/dashboard/:uid" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<SignUp />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;