import React, { FunctionComponent, useState, useEffect, useContext, FormEvent } from 'react';
import Form from "react-bootstrap/Form";
import { Redirect } from 'react-router';

import Button from "react-bootstrap/Button";

import './UserForms.css';
import {UserContext} from './UserProvider';
import useForm from '../hooks/useForm';




const Login:FunctionComponent = () => {

  const [redirect, setRedirect] = useState(false);
  
  const { 
    handleSubmit, 
    handleChange, 
    values, setValues,
    isDisabled, setIsDisabled, 
    error, setError
  } = useForm(submitFunction)
  
  const {user, password} = values;

  const { login, user: username}  = useContext(UserContext);
  
  async function submitFunction (e: FormEvent) {
    setIsDisabled(true)
    const response = await login({user, password})
    if(response.success) {
      setRedirect(true)
      return
    }
    setIsDisabled(false)
    setError(response.error)
    
  }

  if ( redirect ) return <Redirect to='/'/>
  return (
    <div className="col-sm-6 offset-sm-3">
      <h1 className="user-form-title">Sign In</h1> 
      <p style={{color: 'red'}}>{error}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginUser">
          <Form.Label className="user-form-label">Email or username</Form.Label>
          <Form.Control required disabled={isDisabled} name='user' value={user || ''} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label className="user-form-label">Password</Form.Label>
          <Form.Control required disabled={isDisabled} placeholder="Password" name='password' value={password || ''} onChange={handleChange}/>
        </Form.Group>
        <Button variant="success" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  )
}

export default Login;