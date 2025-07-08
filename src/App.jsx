import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Stats />
            <Dashboard />
        </div>
    );
}

export default App;