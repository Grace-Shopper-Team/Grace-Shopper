import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCoffeeAsync,
  deleteCoffeeAsync,
} from '../../redux/actions/allCoffeeActions';
import { allCoffeeSelector } from '../../redux/reducers/allCoffeeReducer';
import { addProductToCart } from '../../redux/actions/singleProductActions';
import { cartSelector } from '../../redux/reducers/singleProductReducer';
import { Link } from 'react-router-dom';
import SortingAndSearching from './SortingAndSearchBar';
import Pagination from './Pagination';

const AllCoffee = ({ isAdmin = false, selectedCoffee, setSelectedCoffee }) => {
  const [filteredCoffee, setFilteredCoffee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cart = useSelector(cartSelector);
  const coffees = useSelector(allCoffeeSelector);
  const dispatch = useDispatch();
  const coffeesPerPage = 6;

  useEffect(() => {
    dispatch(fetchAllCoffeeAsync());
  }, [dispatch]);

  // pagination
  const totalPages = Math.ceil(filteredCoffee.length / coffeesPerPage);
  const indexOfLastCoffee = currentPage * coffeesPerPage;
  const indexOfFirstCoffee = indexOfLastCoffee - coffeesPerPage;
  const currentCoffees = filteredCoffee.slice(
    indexOfFirstCoffee,
    indexOfLastCoffee
  );

  const handleAddToCart = (productId) => {
    dispatch(addProductToCart({ productId, quantity: 1 }));
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = (id) => {
    dispatch(deleteCoffeeAsync(id));
  };

  return (
    <>
      <SortingAndSearching
        coffees={coffees}
        onFilteredCoffees={setFilteredCoffee}
        setCurrentPage={setCurrentPage}
      />
      <div className='container'>
        {coffees ? (
          currentCoffees.map((coffee) => (
            <div key={coffee.id} className='coffee-container'>
              <img className='coffee-img' src={coffee.imageUrl} />
              <Link id='spro' to={`/coffee/${coffee.id}`}>
                <p>{coffee.name}</p>
              </Link>
              <p>Origin: {coffee.origin}</p>
              <p>Price: ${coffee.price}</p>
              <button onClick={() => handleAddToCart(coffee.id)}>
                Add to Cart
              </button>
              {isAdmin && (
                <div>
                  <button onClick={() => handleDelete(coffee.id)}>❌</button>
                  <span>Stock: {coffee.stock}</span>
                  <button onClick={() => setSelectedCoffee(coffee)}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default AllCoffee;
