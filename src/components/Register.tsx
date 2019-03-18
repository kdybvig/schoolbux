import React, { FunctionComponent, useState, useContext, FormEvent } from 'react';
import './UserForms.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from './UserProvider';
import { Redirect } from 'react-router';
import { singular } from 'pluralize';
import useForm from '../hooks/useForm';


const Register:FunctionComponent = () => {
  
  const [redirect, setRedirect] = useState(false);

  const { 
    handleSubmit, 
    handleChange, 
    values, setValues, 
    isDisabled, setIsDisabled, 
    error, setError, 
    capitalize 
  } = useForm(submitFunction)

  const { firstName, lastName, email, username, password, confirm, school, mascot, currency, singleMascot } = values;

  const { register }  = useContext(UserContext);

  async function submitFunction (e: FormEvent) {
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
      const activeUser = await register({firstName, lastName, email, username, password, confirm, school, mascot, currency})
      if(activeUser.error) {
        setError(activeUser.error)
        setIsDisabled(false)
      } else {
        setRedirect(true)
      }
  }

  const handleMascotBlur = (e: any) => {
    if(!mascot || currency && currency !== `${singleMascot} Bux`) return
    const newSingleMascot = capitalize(singular(mascot))
    setValues(prevValues => ({...prevValues, singleMascot: newSingleMascot, currency: `${newSingleMascot} Bux`}))
  }

  const inputs = [
    {name: 'firstName', text: 'First Name', type: 'text', value: firstName},
    {name: 'lastName', text: 'Last Name', type: 'text', value: lastName},
    {name: 'username', text: 'Username', type: 'text', value: username},
    {name: 'email', text:'Email Address', type: 'email', value: email},
    {name: 'password', text: 'Password', type: 'password', value: password}, 
    {name: 'confirm', text:'Confirm Password', type: 'password', value: confirm},
    {name: 'school', text: 'School Name', type: 'text', value: school },
    {name: 'mascot', text: 'School Mascot', type: 'text', value: mascot, onBlur: handleMascotBlur, optional: true},
    {name: 'currency', text: 'School Currency', type: 'text', value: currency}
  ]
  if(redirect) return <Redirect to='/' />

  return (
    <div className="col-sm-6 offset-sm-3">
      <h1 className="user-form-title">Create account</h1> 
      {error && <p style={{color: 'red'}}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        {
          inputs.map((input, index) => {
            return (
            <Form.Group key={index} controlId={`register${capitalize(input.name)}`}>
              <Form.Label className="user-form-label">{input.text}</Form.Label>
              <Form.Control required={!input.optional} disabled={isDisabled} type={input.type} placeholder={input.text.toLowerCase()} value={input.value} onBlur={input.onBlur}  name={input.name} onChange={handleChange} />
            </Form.Group>
            )
          })
        }
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

export default Register;