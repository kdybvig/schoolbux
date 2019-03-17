import React, { FunctionComponent, useState, useContext, FormEvent } from 'react';
import './UserForms.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from './UserProvider';
import { Redirect } from 'react-router';
import { userInfo } from 'os';
import { string } from 'prop-types';
import { singular } from 'pluralize';


const Register:FunctionComponent = () => {

  const initialUserState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
    school: '',
    mascot: '',
    singleMascot: '',
    currency: '',
    isDisabled: false
  }

  const [{firstName, lastName, username, email, school, mascot, singleMascot, currency, password, confirm, isDisabled}, setUserState] = useState(initialUserState);
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
      setUserState(prevState => ({...prevState, isDisabled:true}))
      const activeUser = await register({email, username, password, confirm})
      if(activeUser.error) {
        setError(activeUser.error)
        setUserState(prevState=>({...prevState, isDisabled: false}))
      } else {
        setRedirect(true)
      }
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    const {name, value} = e.currentTarget;
    setUserState(prevState => ({...prevState, [name]:value}))
  }

  const capitalize = (str: string): string => {
    if(str.indexOf(' ') >= 0) return (
      str.split(' ').map(str => capitalize(str)).join(' ')
    ) 
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleMascotBlur = (e: any) => {
    if(!mascot || currency && currency !== `${singleMascot} Bux`) return
    const newSingleMascot = capitalize(singular(mascot))
    setUserState(prevState => ({...prevState, singleMascot: newSingleMascot, currency: `${newSingleMascot} Bux`}))
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