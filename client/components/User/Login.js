import React from 'react';
import { connect } from 'react-redux';
import { authenticateLogin, logout } from '../../redux/store/auth';
import jwt_decode from 'jwt-decode';
import { fetchUser } from '../../redux/store/auth';

const LoginForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form className='Login' onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor='username'>
            <small>Username</small>
          </label>
          <input name='username' type='text' />
        </div>
        <div>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input name='password' type='password' />
        </div>
        <div>
          <button type='submit'>{displayName}</button>
        </div>
        <div>
          <p>
            New user? <a href='/register'>Register here.</a>
          </p>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      logout();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticateLogin(username, password, formName))
        .then(() => {
          const token = localStorage.getItem('token');
          const decodedToken = jwt_decode(token);
          const userID = decodedToken.id;
          const endpoint = 'http://localhost:3000/api/cart/stripe';

          const user = fetchUser(userID);
          const { firstName, lastName, email, address, city, state, zip } = user;
        
          const formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          formData.append('address', address);
          formData.append('city', city);
          formData.append('state', state);
          formData.append('zip', zip);

          if (document.referrer.includes('/cart')) {
                fetch(endpoint, {
                  method: 'POST',
                  body: formData,
                })
                  .then(response => response.json())
                  .then(data => {
                    const { stripeRedirectUrl } = data;
                    window.location.href = stripeRedirectUrl;
                  })
                  .catch(error => {
                    console.error('Error processing payment:', error);
                  });
          } else {
            window.location = `/profile/${userID}`;
          }          
        })
        .catch((error) => {
          console.error(error);
          alert('Invalid username or password. Please try again.');
        });
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
