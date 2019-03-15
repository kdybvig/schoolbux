import React, { FunctionComponent, useState, useContext, FormEvent } from 'react';
import Form from "react-bootstrap/Form";
import './UserForms.css';
import Button from "react-bootstrap/Button";
import {UserContext} from './UserProvider';
import { Redirect } from 'react-router';



const Login:FunctionComponent = () => {

  const [user, setUser] = useState('');
  const [isDisabled, setIsDisabled] = useState(false)
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const { login, user: username}  = useContext(UserContext);
  
  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    const response = await login({user, password})
    if(response.success) {
      setRedirect(true)
      return
    }

    clearForm()
    setError(response.error)
    
  }

  const clearForm = () => {
    setUser('');
    setPassword('');
    setIsDisabled(false);
  }

  if ( redirect ) return <Redirect to='/'/>
  return (
    <div className="col-sm-6 offset-sm-3">
      <h1 className="user-form-title">Sign In</h1> 
      <p style={{color: 'red'}}>{error}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginUser">
          <Form.Label className="user-form-label">Email or username</Form.Label>
          <Form.Control required disabled={isDisabled} placeholder="Enter email or username" value={user} onChange={(e: any) => setUser(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label className="user-form-label">Password</Form.Label>
          <Form.Control required disabled={isDisabled} type="password" placeholder="Password" value={password} onChange={(e: any) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="success" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  )
}

export default Login;