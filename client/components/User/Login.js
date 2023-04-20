import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../redux/store/auth';
import jwt_decode from 'jwt-decode';

const LoginForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
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
          <p>New user?<a href='/register'>Register here.</a></p>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
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
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName))
        .then(() => {
          const token = localStorage.getItem('token');
          const decodedToken = jwt_decode(token);
          console.log("token", decodedToken)
          const userID = decodedToken.id;
          window.location = `/profile/${userID}`;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
};


export const Login = connect(mapLogin, mapDispatch)(LoginForm);