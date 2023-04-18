import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoffeeAsync } from '../../redux/actions/allCoffeeActions';
import { allCoffeeSelector } from '../../redux/reducers/allCoffeeReducer';

const AllCoffee = () => {
  const coffees = useSelector(allCoffeeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCoffeeAsync());
  }, [dispatch]);

  return (
    <div className='container'>
      {coffees ? (
        coffees.map((coffee) => <p key={coffee.id}>{coffee.name}</p>)
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default AllCoffee;
