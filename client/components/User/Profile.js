import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser, fetchUser } from '../../redux/store/auth';
import Order from './Order';

const ProfilePage = ({ updateUser, fetchUser }) => {
  const { userID } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await fetchUser(userID);
      setUserInfo(user);
    };
    fetchUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowChangePassword(false);
    updateUser(userInfo);
  };

  const handlePasswordChangeCancel = () => {
    setShowChangePassword(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label htmlFor='username'>
            <small>Username</small>
          </label>
          <input
            name='username'
            type='text'
            value={userInfo.username || ''}
            onChange={handleChange}
            required
          />
        </div>
        {!showChangePassword && (
          <div>
            <button type='button' onClick={() => setShowChangePassword(true)}>
              Change Password
            </button>
          </div>
        )}
        {showChangePassword && (
          <>
            <div>
              <label htmlFor='password'>
                <small>New Password</small>
              </label>
              <input
                name='password'
                type='password'
                value={userInfo.password || ''}
                onChange={handleChange}
                required
              />
            </div>
            <span>
              <button type='button' onClick={handlePasswordChangeCancel}>
                Cancel
              </button>
            </span>
          </>
        )}
        <div>
          <button type='submit'>Update Profile</button>
        </div>
        <div>
          <Order userId={userID} />
        </div>
      </form>
    </div>
  );
};

const mapProfile = (state) => ({
  user: state.auth.user,
});

const mapDispatch = {
  updateUser,
  fetchUser,
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

export const Profile = connect(mapProfile, mapDispatch)(ProfilePage);
