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
    email: '',
    username: '',
    password: '',
    confirm: '',
    school: '',
    mascot: '',
    singleMascot: '',
    currency: '',
    isDisabled: false
  }

  const [{email, username, school, mascot, singleMascot, currency, password, confirm, isDisabled}, setUserState] = useState(initialUserState);
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
    {name: 'email', text:'Email Address', type: 'email', value: email},
    {name: 'username', text: 'Username', type: 'text', value: username},
    {name: 'password', text: 'Password', type: 'password', value: password}, 
    {name: 'confirm', text:'Confirm Password', type: 'password', value: confirm},
    {name: 'school', text: 'School Name', type: 'text', value: school },
    {name: 'mascot', text: 'School Mascot', type: 'text', value: mascot, onBlur: handleMascotBlur},
    {name: 'currency', text: 'School Currency', type: 'text', value: currency}
  ]
  if(redirect) return <Redirect to='/' />

  return (
    <div className="col-sm-6 offset-sm-3">
      <h1 className="user-form-title">Create account</h1> 
      {error && <p style={{color: 'red'}}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        {
          inputs.map((inputInfo, index) => {
            return (
            <Form.Group key={index} controlId={`register${capitalize(inputInfo.name)}`}>
              <Form.Label className="user-form-label">{inputInfo.text}</Form.Label>
              <Form.Control disabled={isDisabled} type={inputInfo.type} placeholder={inputInfo.text.toLowerCase()} value={inputInfo.value} onBlur={inputInfo.onBlur}  name={inputInfo.name} onChange={handleChange} />
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