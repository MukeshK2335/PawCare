import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Stats from './Components/Stats';
import Dashboard from './Components/Dashboard';
import './App.css';
import Login from './Components/Login';
import SignIn from './Components/SignIn.jsx';
import Features from './Components/Features';
import HowItWorks from './Components/HowItWorks';
import Analysis from './Components/Analysis';
import JujuAi from './Components/jujuAi.jsx';
import Testimonials from './Components/Testimonials.jsx';

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
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/analysis/:uid" element={<Analysis />} />
                    <Route path="/juju-ai/:uid" element={<JujuAi />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;