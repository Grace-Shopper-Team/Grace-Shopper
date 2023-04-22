import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../redux/store/auth';
import jwt_decode from 'jwt-decode';

const RegisterForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const formValidation = (e) => {
    const email = e.target.value;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (e.target.name === 'email') {
      if (!email.match(emailRegex)) {
      setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
      if (e.target.value.length < 8) {
        setPwdError('Password must be at least 8 characters.');
      } else if (e.target.value.search(/[a-z]/) < 0) {
        setPwdError('Password must contain at least one lowercase character.');
      } else if (e.target.value.search(/[0-9]/) < 0) {
        setPwdError('Password must contain at least one number.');
      } else if (e.target.value.search(/[A-Z]/) < 0) {
        setPwdError('Password must contain at least one uppercase character.');
      } else if (e.target.value.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0) {
        setPwdError('Password must contain at least one special character.');
      } else if (e.target.value !== confirmPass) {
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

  const emailExists = async (email) => {
    const query = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
    const result = await pool.query(query);
    return result.rows[0].count > 0;
  };
  
  
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, emailError, pwdError)} name={name}>
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
              onChange={formValidation}
              required
            />
            <span style={{ color: 'red' }}>{emailError}</span>
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
          <input name='username' type='text' required />
        </div>
        <div>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input
            name='password'
            type='password'
            onChange={formValidation}
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
            onChange={formValidation}
            required
          />
        </div>
        <div>
          <button type='submit'>{displayName}</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
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
    handleSubmit(e, emailError, pwdError) {
      e.preventDefault();
      if (emailError || pwdError) {
        alert(emailError || pwdError);
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
          const token = localStorage.getItem('token');
          console.log('token', token);
          const decodedToken = jwt_decode(token);
          console.log('token', decodedToken);
          const userID = decodedToken.id;
          console.log('userID', userID);
          window.location = `/profile/${userID}`;
        })
        .catch((error) => {
          console.error(error);
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
