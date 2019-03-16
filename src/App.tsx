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


const App = () => {
  const jwtToken = localStorage.getItem("jwtToken")

  interface decodedUser {
    id: string,
    username: string,
    iat: string,
    exp: string,
    issueDate: string,
    expirationDate: string,
    success: boolean,
    error: string
  }

  const decodedUser: decodedUser | undefined = jwtToken ? jwt_decode(jwtToken) : undefined
  const { refreshUser, user } = useContext(UserContext);
  console.log(decodedUser ? decodedUser.username: 'no user')
  if(decodedUser) {
    refreshUser(decodedUser.username)
  }

  console.log(user)

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
