import React, { FunctionComponent, useState } from 'react';
import Form from "react-bootstrap/Form";
import './UserForms.css';
import Button from "react-bootstrap/Button";

const Login:FunctionComponent = () => {
    const user = useState('');
    const password = useState('');

    return (
      <div className="col-sm-6 offset-sm-3">
        <h1 className="user-form-title">Sign In</h1> 
        <Form>
          <Form.Group controlId="loginUser">
            <Form.Label className="user-form-label">Email or username</Form.Label>
            <Form.Control type="email" placeholder="Enter email or username" />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label className="user-form-label">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    )
}

export default Login;