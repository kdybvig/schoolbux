import React, { FunctionComponent, useState } from 'react';
import Form from "react-bootstrap/Form";
import './UserForms.css';
import Button from "react-bootstrap/Button";

const Register:FunctionComponent = () => {

  const user = useState('');
  
  return (
    <div className="col-sm-6 offset-sm-3">
      <h1 className="user-form-title">Create account</h1> 
      <Form>
        <Form.Group controlId="registerEmail">
          <Form.Label className="user-form-label">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="registerUsername">
          <Form.Label className="user-form-label">Username</Form.Label>
          <Form.Control type="username" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="registerPassword">
          <Form.Label className="user-form-label">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="registerConfirm">
          <Form.Label className="user-form-label">Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="registerChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

export default Register;