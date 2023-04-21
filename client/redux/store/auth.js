import axios from 'axios';
import history from 'history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const SET_USER = 'SET_USER';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const setUser = (user) => ({ type: SET_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticateLogin =
  (username, password, method) => async (dispatch) => {
    try {
      console.log('Trying to authenticate');
      const res = await axios.post(`/auth/${method}`, { username, password });
      console.log('Response from server:', res.data);
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      console.error('Error authenticating:', authError);
      return dispatch(setAuth({ error: authError }));
    }
};

export const authenticate =
  (userInfo, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, userInfo);
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
};

  export const updateUser = (userInfo) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const res = await axios.put(`/auth/users/${userInfo.id}`, userInfo, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(res.data));
      history.push(`/users/${userInfo.id}`);
    } catch (err) {
      console.error(err);
    }
  };
  
  export const fetchUser = (userID) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const res = await axios.get(`/auth/users/${userID}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(res.data));
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  //history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */

const initialState = {
  auth: {},
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.auth,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}