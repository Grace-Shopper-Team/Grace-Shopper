// TODO 1. add Registered Users table with deletebtn

import React, { useState } from 'react';
import AllCoffee from './AllCoffee';
import AddCoffeeForm from './AddCoffeeForm';

const AdminDashboard = () => {
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  const handleSubmit = () => {
    setSelectedCoffee(null);
  };

  return (
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
  );
};

export default AdminDashboard;
