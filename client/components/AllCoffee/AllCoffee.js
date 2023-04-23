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

const AllCoffee = ({ isAdmin = false, selectedCoffee, setSelectedCoffee }) => {
  const [selectedOption, setSelectedOption] = useState('default');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cart = useSelector(cartSelector);
  const coffees = useSelector(allCoffeeSelector);
  const dispatch = useDispatch();
  const coffeesPerPage = 6;

  useEffect(() => {
    dispatch(fetchAllCoffeeAsync());
  }, [dispatch]);

  // sorting
  const sortedCoffee = coffees.slice().sort((a, b) => {
    if (selectedOption === 'default') return a.id - b.id;
    if (selectedOption === 'lowprice') return a.price - b.price;
    if (selectedOption === 'highprice') return b.price - a.price;
    if (selectedOption === 'name-az') return a.name.localeCompare(b.name);
    if (selectedOption === 'name-za') return b.name.localeCompare(a.name);
  });

  // filter
  const filteredCoffee = sortedCoffee.filter(
    (coffee) => coffee.name.toLowerCase().includes(search.toLowerCase())
    // add "coffee not found" if search doesnt match any coffee
  );

  // pagination
  const totalPages = Math.ceil(filteredCoffee.length / coffeesPerPage);
  const indexOfLastCoffee = currentPage * coffeesPerPage;
  const indexOfFirstCoffee = indexOfLastCoffee - coffeesPerPage;
  const currentCoffees = filteredCoffee.slice(
    indexOfFirstCoffee,
    indexOfLastCoffee
  );

  const handleSort = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddToCart = (productId) => {
    dispatch(addProductToCart({ productId, quantity: 1 }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    dispatch(deleteCoffeeAsync(id));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className='sort-search-container'>
        <div className='sort'>
          <span>Sort By: </span>
          <select value={selectedOption} onChange={handleSort}>
            <option value='default'>Default</option>
            <option value='lowprice'>Price Lowest to Highest</option>
            <option value='highprice'>Price Highest to Lowest</option>
            <option value='name-az'>Name A-Z</option>
            <option value='name-za'>Name Z-A</option>
          </select>
        </div>
        <div className='search'>
          <span>Search for Coffee: </span>
          <input value={search} onChange={handleSearchChange} />
        </div>
      </div>
      <div className='container'>
        {coffees ? (
          currentCoffees.map((coffee) => (
            <div key={coffee.id} className='coffee-container'>
              <img className='coffee-img' src={coffee.imageUrl} />
              <Link to={`/coffee/${coffee.id}`}>
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
      <div className='pagination'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default AllCoffee;
