import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../redux/store/auth';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');

  // functions to validate email and password inputs on change
  ////////////////////////////////////////// add check for existing users?
  const handleEmailChange = (e) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!e.target.value.match(emailRegex)){
      setFormError("Please enter a valid email address.");
    } else {
      setFormError('');
    }
    setEmail(e.target.value);
  }
  
  const handlePasswordChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if(password.length < 8){
      setFormError("Password must be at least 8 characters.");
    } else if(password.search(/[a-z]/) < 0){
      setFormError("Password must contain at least one lowercase character.");
    } else if(password.search(/[0-9]/) < 0){
      setFormError("Password must contain at least one number.");
    } else if(password.search(/[A-Z]/) < 0){
      setFormError("Password must contain at least one uppercase character.");
    } else if(password.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0){
      setFormError("Password must contain at least one special character.");
    } else if(password !== confirmPass){
      setFormError("Passwords must match."); 
    // if requirements are met and there is an input for confirmPass, check that they match 
    } else if (confirmPass.length > 0) {
      if (e.target.value !== confirmPass) {
        setConfirmPass(e.target.value);
        setFormError('Passwords do not match');
      } else {
        setFormError('');
      }
    } else {
      // check that the confirmPass input matches the password input
      if (e.target.name === 'confirmPass') {
        if (e.target.value !== password) {
          setFormError('Passwords do not match');
        } else {
          setConfirmPass(e.target.value);
          setFormError('');
        }
      } else {
        setPassword(e.target.value);
        setFormError('');
      }
    }
  } 
  
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <>
            <div>
              <label htmlFor='firstname'>
                <small>First Name</small>
              </label>
              <input name='firstname' type='text' required />
            </div>
            <div>
              <label htmlFor='lastname'>
                <small>Last Name</small>
              </label>
              <input name='lastname' type='text' required />
            </div>
            <div>
              <label htmlFor='email'>
                <small>Email</small>
              </label>
              <input name='email' type='text' onChange={handleEmailChange} required />
            </div>
            <div>
              <label htmlFor='address'>
                <small>Address</small>
              </label>
              <input name='address' type='text' />
            </div>
            <div>
              <label htmlFor='city'>
                <small>City</small>
              </label>
              <input name='city' type='text' />
            </div>
            <div>
              <label htmlFor='state'>
                <small>State</small>
              </label>
              <select name='state' defaultValue='default'>
                <option value='default' disabled>Select a State</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='zip'>
                <small>Zipcode</small>
              </label>
              <input name='zip' type='number' />
            </div>
          </>
        )}
        <div>
          <label htmlFor='username'>
            <small>Username</small>
          </label>
          <input name='username' type='text' required />
        </div>
        <div>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input name='password' type='password' onChange={handlePasswordChange} required />
        </div>
        {name === 'signup' && (
          <div>
            <label htmlFor='confirmPass'>
              <small>Confirm Password</small>
            </label>
            <input name='confirmPass' type='password' onChange={handlePasswordChange} required />
          </div>
        )}
        <div>
          <button type='submit'>{displayName}</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
        {<span style={{ color: 'red' }}>{formError}</span>}
      </form>
    </div>
  );
};


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      const formName = e.target.name;
      const username = e.target.username.value;
      const password = e.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];


export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
