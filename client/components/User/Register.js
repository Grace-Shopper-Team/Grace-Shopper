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

  const emailValidation= (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(emailRegex)){
        setEmailError("Please enter a valid email address.");
    } else {
        setEmailError('');
    }
  }

  const pwdValidation = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      if (e.target.value.length < 8) {
        setPwdError("Password must be at least 8 characters.");
      } else if (e.target.value.search(/[a-z]/) < 0) {
        setPwdError("Password must contain at least one lowercase character.");
      } else if (e.target.value.search(/[0-9]/) < 0) {
        setPwdError("Password must contain at least one number.");
      } else if (e.target.value.search(/[A-Z]/) < 0) {
        setPwdError("Password must contain at least one uppercase character.");
      } else if (e.target.value.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0) {
        setPwdError("Password must contain at least one special character.");
      } else if (e.target.value !== confirmPass){
        setPwdError("Passwords do not match.");
      } else {
          setPwdError('')
      }
    } else if (e.target.name === 'confirmPass') {
      setConfirmPass(e.target.value);
      if(e.target.value !== password) {
        setPwdError("Passwords do not match.");
      } else {
        setPwdError('')
      }
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
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
              <input name='email' type='text' onChange={emailValidation} required />
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
          <input name='password' type='password' onChange={pwdValidation} required />
          <span style={{ color: 'red' }}>{pwdError}</span>
        </div>
          <div>
            <label htmlFor='confirmPass'>
              <small>Confirm Password</small>
            </label>
            <input name='confirmPass' type='password' onChange={pwdValidation} required />
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

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       dispatch(authenticate(username, password, formName))
//         .then(() => {
//           const token = localStorage.getItem('token');
//           const decodedToken = jwt_decode(token);
//           console.log("token", decodedToken)
//           const userID = decodedToken.id;
//           window.location = `/profile/${userID}`;
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     },
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;

      // check if the username already exists in the database
      fetch(`/api/users?username=${username}`)
        .then((response) => {
          if (response.ok) {
            // if username is available, dispatch the authenticate action
            return dispatch(authenticate(username, password, formName))
              .then(() => {
                const token = localStorage.getItem('token');
                const decodedToken = jwt_decode(token);
                console.log("token", decodedToken)
                const userID = decodedToken.id;
                window.location = `/profile/${userID}`;
              })
              .catch((err) => console.error(err));
          } else {
            // if username is already taken, display an error message
            throw new Error('Username is already taken. Please select a different username.');
          }
        })
        .catch((err) => {
          console.error(err);
          // display the error message
          alert(err.message);
        });
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

export const Register = connect(mapRegister, mapDispatch)(RegisterForm);