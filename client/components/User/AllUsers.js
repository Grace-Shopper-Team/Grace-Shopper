import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAsync } from '../../redux/actions/allUserActions';
import { selectUsers } from '../../redux/reducers/allUserReducer';
import { deleteSingleUserAsync } from '../../redux/actions/additionalUserActions.js';

const AllUsers = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteSingleUserAsync(id));
  };

  return (
    <>
      <div className='container'>
        {users ? (
          users.map((user) => (
            <div key={user.id} className='user-container'>
              <p>id: {user.id}</p>
              <p>username: {user.username}</p>
              <p>firstName: {user.firstName}</p>
              <p>lastName: {user.lastName}</p>
              <p>email: {user.email}</p>
              <p>isAdmin: ${user.isAdmin}</p>
              <button onClick={() => handleDeleteUser(user.id)}>❌</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default AllUsers;
