import React, { useContext } from 'react';
import {Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './App.css';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Store from './components/Store';
import Login from './components/Login';
import Register from './components/Register';

import {UserContext} from './components/UserProvider';
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const jwtToken = localStorage.getItem("jwtToken")

  interface decodedUser {
    id: string,
    username: string,
    role: string,
    iat: string,
    exp: string,
    issueDate: string,
    expirationDate: string,
    success: boolean,
    error: string
  }

  const decodedUser: decodedUser | undefined = jwtToken ? jwt_decode(jwtToken) : undefined
  const { refreshUser, user } = useContext(UserContext);
  const isTokenExpired = decodedUser ? Date.now() > Number(decodedUser.exp) * 1000 : false
  if(decodedUser && !isTokenExpired) {
    refreshUser(decodedUser.username, decodedUser.role)
  }

  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation/>
          </header>
          <main>
            <Route exact path="/" component={Home}/>
            <Route path="/store" component={Store}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </main>
        </div>
      </Router>
  );
}

export default App;
