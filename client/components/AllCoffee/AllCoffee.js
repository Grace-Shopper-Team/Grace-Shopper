import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoffeeAsync } from '../../redux/actions/allCoffeeActions';
import { allCoffeeSelector } from '../../redux/reducers/allCoffeeReducer';

const AllCoffee = () => {
  const [selectedOption, setSelectedOption] = useState('default');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
  const indexOfLastCoffee = currentPage * coffeesPerPage;
  const indexOfFirstCoffee = indexOfLastCoffee - coffeesPerPage;
  const currentCoffees = filteredCoffee.slice(
    indexOfFirstCoffee,
    indexOfLastCoffee
  );

  const handleSort = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddCartItem = (coffee) => {
    // dispatch(AddCartItem(coffee))
    // add erikas code
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className='container'>
        {coffees ? (
          currentCoffees.map((coffee) => (
            <div key={coffee.id} className='coffee-container'>
              <img className='coffee-img' src={coffee.imageUrl} />
              <p>{coffee.name}</p>
              <p>Origin: {coffee.origin}</p>
              <p>Price: ${coffee.price}</p>
              <button onClick={() => handleAddCartItem(coffee)}>
                Add to Cart
              </button>
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
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastCoffee >= filteredCoffee.length}>
          Next
        </button>
      </div>
    </>
  );
};

export default AllCoffee;