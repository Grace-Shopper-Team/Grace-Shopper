import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoffeeAsync } from '../../redux/actions/allCoffeeActions';
import { allCoffeeSelector } from '../../redux/reducers/allCoffeeReducer';

const AllCoffee = () => {
  const coffees = useSelector(allCoffeeSelector);
  const [selectedOption, setSelectedOption] = useState('default');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCoffeeAsync());
  }, [dispatch]);

  const sortedCoffee = coffees.slice().sort((a, b) => {
    if (selectedOption === 'default') return a.id - b.id;
    if (selectedOption === 'price') return a.price - b.price;
    if (selectedOption === 'name') return a.name.localeCompare(b.name);
  });

  const handleSort = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className='sort'>
        <span>Sort By: </span>
        <select value={selectedOption} onChange={handleSort}>
          <option value='default'>Default</option>
          <option value='price'>Price</option>
          <option value='name'>Name</option>
        </select>
      </div>
      <div className='container'>
        {coffees ? (
          sortedCoffee.map((coffee) => (
            <div key={coffee.id} className='coffee-container'>
              <img className='coffee-img' src={coffee.imageUrl} />
              <p>{coffee.name}</p>
              <p>Origin: {coffee.origin}</p>
              <p>Price: {coffee.price}</p>
              <button>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default AllCoffee;
