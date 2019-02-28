import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import {Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';


const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation/>
        </header>
        <main>
          <Route exact path="/" component={Home}/>
          <Route path="/store" component={Store}/>
        </main>
      </div>
    </Router>
  );
}

export default App;
