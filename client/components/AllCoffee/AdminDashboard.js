import React, { useState, useEffect } from 'react';
import AllCoffee from './AllCoffee';
import AddCoffeeForm from './AddCoffeeForm';
import AllUsers from '../User/AllUsers';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ isAdmin }) => {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  console.log('in admin dash', isAdmin);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSelectedCoffee(null);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/home');
    }
  }, [isAdmin, navigate]);

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
