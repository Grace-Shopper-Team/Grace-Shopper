import React, { useState, useEffect } from 'react';

const SortingAndSearching = ({
  coffees,
  onFilteredCoffees,
  setCurrentPage,
}) => {
  const [selectedOption, setSelectedOption] = useState('default');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const sortedCoffee = coffees.slice().sort((a, b) => {
      if (selectedOption === 'default') return a.id - b.id;
      if (selectedOption === 'lowprice') return a.price - b.price;
      if (selectedOption === 'highprice') return b.price - a.price;
      if (selectedOption === 'name-az') return a.name.localeCompare(b.name);
      if (selectedOption === 'name-za') return b.name.localeCompare(a.name);
    });

    const filteredCoffee = sortedCoffee.filter((coffee) =>
      coffee.name.toLowerCase().includes(search.toLowerCase())
    );

    onFilteredCoffees(filteredCoffee);
  }, [selectedOption, search, coffees, onFilteredCoffees]);

  const handleSort = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
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
  );
};

export default SortingAndSearching;
