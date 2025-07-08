import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Stats />
        </div>
    );
}

export default App;