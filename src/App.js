// src/App.js
import React from 'react';
import TreeStructure from './components/TreeStructure';
import Footer from './components/Footer'; // Import the Footer component
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">My Tree Structure App</header>
      <TreeStructure />
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}

export default App;
