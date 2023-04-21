// TODO 1. add coffee data table with editable form
// TODO 2. add 'addCoffee' form (maybe another component)
// TODO 3. add Registered Users table with deletebtn

import React, { useEffect } from 'react';
import AllCoffee from './AllCoffee';
import { fetchAllCoffeeAsync } from '../../redux/actions/allCoffeeActions';
import { allCoffeeSelector } from '../../redux/reducers/allCoffeeReducer';
import { useSelector, useDispatch } from 'react-redux';

const AdminDashboard = () => {
  const coffees = useSelector(allCoffeeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCoffeeAsync());
  }, [dispatch]);

  return (
    <div className='admin-dash-container'>
      <div className='admin-all-coffee'>
        <ul>
          {coffees ? (
            coffees.map((coffee) => <li key={coffee.id}>{coffee.name}</li>)
          ) : (
            <p>No Data Available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
