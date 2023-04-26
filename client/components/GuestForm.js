import { Action } from 'history';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { fetchUser } from '../redux/store/auth';
import { useDispatch } from 'react-redux';

const GuestForm = (props) => {
  const products = JSON.parse(localStorage.getItem('cartProducts'));
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const dispatch = useDispatch();
  console.log(products);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken.id);
      } else {
        setUserId(null);
      }
      setIsTokenChecked(true);
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (!isTokenChecked) {
      return;
    }
    console.log(userId, 'userId');
    const fetchUserData = async () => {
      if (userId) {
        const user = await dispatch(fetchUser(userId));
        setUserInfo(user);
      }
    };
    fetchUserData();
  }, [userId, isTokenChecked]);

  const pay = async (form) => {
    form.preventDefault();
    const data = await fetch('http://localhost:3000/api/cart/stripe', {
      method: 'POST',
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(products),
    }).then(async (data) => data.json());
    window.location.href = data.url;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const clearCart = () => localStorage.removeItem('cartProducts');

  return (
    <div>
      <form className='guest'
        onSubmit={(e) => {
          pay(e);
          clearCart();
        }}
        method='POST'>
        <div>
          <label htmlFor='firstname'>
            <small>First Name</small>
          </label>
          <input
            name='firstname'
            type='text'
            value={userInfo.firstName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='lastname'>
            <small>Last Name</small>
          </label>
          <input
            name='lastname'
            type='text'
            value={userInfo.lastName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>
            <small>Email</small>
          </label>
          <input
            name='email'
            type='text'
            value={userInfo.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='address'>
            <small>Address</small>
          </label>
          <input
            name='address'
            type='text'
            value={userInfo.address || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='city'>
            <small>City</small>
          </label>
          <input
            name='city'
            type='text'
            value={userInfo.city || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='state'>
            <small>State</small>
          </label>
          <select
            name='state'
            value={userInfo.state || ''}
            onChange={handleChange}>
            <option value='' disabled>
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
          <input
            name='zip'
            type='number'
            value={userInfo.zip || ''}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
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

export default GuestForm;
