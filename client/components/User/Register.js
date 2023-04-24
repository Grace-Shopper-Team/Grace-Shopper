import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../redux/store/auth';
import jwt_decode from 'jwt-decode';

const RegisterForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [pwdError, setPwdError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const pwdMatch = async (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      if (e.target.value !== confirmPass) {
        setPwdError('Passwords do not match.');
      } else {
        setPwdError('');
      }
    } else if (e.target.name === 'confirmPass') {
      setConfirmPass(e.target.value);
      if (e.target.value !== password) {
        setPwdError('Passwords do not match.');
      } else {
        setPwdError('');
      }
    }
  };  

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, pwdError, error)} name={name}>
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
            <input
              name='email'
              type='text'
              required
            />
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
              <option value='default' disabled>
                Select a State
              </option>
              {states.map((state) => (
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
        <div>
          <label htmlFor='username'>
            <small>Username</small>
          </label>
          <input 
            name='username'
            type='text'
            required 
          />
        </div>
        <div>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input
            name='password'
            type='password'
            onChange={pwdMatch}
            required
          />
          <span style={{ color: 'red' }}>{pwdError}</span>
        </div>
        <div>
          <label htmlFor='confirmPass'>
            <small>Confirm Password</small>
          </label>
          <input
            name='confirmPass'
            type='password'
            onChange={pwdMatch}
            required
          />
        </div>
        <div>
          <button type='submit'>{displayName}</button>
        </div>
      </form>
    </div>
  );
};

const mapRegister = (state) => {
  return {
    name: 'register',
    displayName: 'Register',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e, pwdError, error) {
      e.preventDefault();
      if (pwdError) {
        alert(pwdError);
        return;
      }
      const formName = e.target.name;
      const username = e.target.username.value;
      const password = e.target.password.value;
      const firstName = e.target.firstname.value;
      const lastName = e.target.lastname.value;
      const email = e.target.email.value;
      const address = e.target.address.value;
      const city = e.target.city.value;
      const state = e.target.state.value;
      const zip = e.target.zip.value;

      const userInfo = {
        username,
        password,
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip,
      };

      dispatch(authenticate(userInfo, formName))
        .then(() => {
          if(error){
            console.log("error", error)
          }
          const token = localStorage.getItem('token');
          const decodedToken = jwt_decode(token);
          const userID = decodedToken.id;
          window.location = `/profile/${userID}`;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  };
};

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export const Register = connect(mapRegister, mapDispatch)(RegisterForm);