import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAsync } from '../../redux/actions/allUserActions';
import { selectUsers } from '../../redux/reducers/allUserReducer';
import {
  deleteSingleUserAsync,
  makeUserAdminAsync,
  removeUserAdminAsync,
} from '../../redux/actions/additionalUserActions.js';

const AllUsers = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteSingleUserAsync(id));
  };

  const handleMakeAdmin = (id) => {
    dispatch(makeUserAdminAsync(id));
  };

  const handleRemoveAdmin = (id) => {
    dispatch(removeUserAdminAsync(id));
  };

  return (
    <>
      <div className='users-container'>
        {users ? (
          users.map((user) => (
            <div key={user.id} className='user-container'>
              <p>id: {user.id}</p>
              <p>username: {user.username}</p>
              <p>firstName: {user.firstName}</p>
              <p>lastName: {user.lastName}</p>
              <p>email: {user.email}</p>
              <p>isAdmin: ${user.isAdmin}</p>
              <div className='buttons-container'>
                <button onClick={() => handleDeleteUser(user.id)}>❌</button>
                {!user.isAdmin ? (
                  <button onClick={() => handleMakeAdmin(user.id)}>
                    Make Admin ➕
                  </button>
                ) : (
                  <button onClick={() => handleRemoveAdmin(user.id)}>
                    Remove Admin ➖
                  </button>
                )}
              </div>
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
