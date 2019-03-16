import React, { FunctionComponent, useState } from 'react';
import Button from "react-bootstrap/Button";
import { LinkContainer } from 'react-router-bootstrap';

import './Unauthorized.css'

const Unauthorized:FunctionComponent = () => {
  return (
    <div className="unauthorized">
        <h4>You must be logged in to view this page.</h4>
        <LinkContainer to ='/login'>
            <Button className='sign-in-button' variant="primary">Sign In</Button>
        </LinkContainer>
    </div>
  )
}

export default Unauthorized;