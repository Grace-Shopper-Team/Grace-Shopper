// TODO 1. add coffee data table with editable form
// TODO 2. add 'addCoffee' form (maybe another component)
// TODO 3. add Registered Users table with deletebtn

import React, { useState } from 'react';
import AllCoffee from './AllCoffee';
import { fetchAllCoffeeAsync } from '../../redux/actions/allCoffeeActions';
import { allCoffeeSelector } from '../../redux/reducers/allCoffeeReducer';
import { useSelector, useDispatch } from 'react-redux';
import AddCoffeeForm from './AddCoffeeForm';
import AllUsers from '../User/AllUsers';

const AdminDashboard = () => {

  const [selectedCoffee, setSelectedCoffee] = useState(null);

  const handleSubmit = () => {
    setSelectedCoffee(null);
  };

  return (
    <>
      <div className='admin-dash-container'>
        <div className='coffee-container-admin'>
          <AllCoffee
            isAdmin={true}
            selectedCoffee={selectedCoffee}
            setSelectedCoffee={setSelectedCoffee}
          />
        </div>
        <div className='add-form-container'>
          <AddCoffeeForm
            selectedCoffee={selectedCoffee}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className='registered-users-container'>
        <span>Registered Users: </span>
        <AllUsers />
      </div>
    </>
  );
};

export default AdminDashboard;
