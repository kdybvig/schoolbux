import React, { FunctionComponent, useState, useContext, FormEvent } from 'react';
import './UserForms.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from './UserProvider';
import { Redirect } from 'react-router';


const Register:FunctionComponent = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const { register }  = useContext(UserContext);

  const handleSubmit = async(e: FormEvent) => {
      e.preventDefault()
      if(password.length > 20 || password.length < 8) {
        setError('Password must be between 8 and 20 characters')
        return
      }
      if(password !== confirm) {
          setError('Passwords must match');
          return
      }
      setError('')
      setIsDisabled(true)
      const activeUser = await register({email, username, password, confirm})
      console.log('username', activeUser)
      setRedirect(true)
  }

  if(redirect) return <Redirect to='/' />

  return (
    <div className="col-sm-6 offset-sm-3">
      <h1 className="user-form-title">Create account</h1> 
      {error && <p style={{color: 'red'}}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="registerEmail">
          <Form.Label className="user-form-label">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="registerUsername">
          <Form.Label className="user-form-label">Username</Form.Label>
          <Form.Control required disabled={isDisabled} placeholder="Enter username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="registerPassword">
          <Form.Label className="user-form-label">Password</Form.Label>
          <Form.Control required disabled={isDisabled} type="password" placeholder="Password" value={password} onChange={(e: any) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="registerConfirm">
          <Form.Label className="user-form-label">Confirm Password</Form.Label>
          <Form.Control required disabled={isDisabled} type="password" placeholder="Password" value={confirm} onChange={(e: any) => setConfirm(e.target.value)}/>
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

export default Register;