import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation/>
        </header>
      </div>
    </Router>
  );
}

export default App;
