import React from 'react';

const SortingAndSearching = ({
  selectedOption,
  handleSort,
  search,
  handleSearchChange,
}) => {
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
