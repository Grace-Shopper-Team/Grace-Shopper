import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCoffeeToStockAsync,
  fetchAllCoffeeAsync,
} from '../../redux/actions/allCoffeeActions';

const AddCoffeeForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [roast, setRoast] = useState('');
  const [origin, setOrigin] = useState('');
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCoffeeAsync());
  }, [dispatch]);

  const resetForm = () => {
    setName('');
    setPrice(0);
    setDescription('');
    setImageUrl('');
    setRoast('');
    setOrigin('');
    setStock(0);
  };

  const handleAddCoffeeToStock = (e) => {
    e.preventDefault();
    dispatch(
      addCoffeeToStockAsync({
        name,
        price,
        description,
        imageUrl,
        roast,
        origin,
        stock,
      })
    );
    resetForm();
  };

  return (
    <div className='add-coffee-container'>
      <form className='form' onSubmit={handleAddCoffeeToStock}>
        <label className='label'>Name: </label>
        <input
          className='input'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className='label'>Price: </label>
        <input
          className='input'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label className='label'>Description: </label>
        <input
          className='input'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='label'>Image Url: </label>
        <input
          className='input'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label className='label'>Roast: </label>
        <input
          className='input'
          value={roast}
          onChange={(e) => setRoast(e.target.value)}
        />
        <label className='label'>Origin: </label>
        <input
          className='input'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <label className='label'>Stock: </label>
        <input
          className='input'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type='submit'>Add Coffee to Shop Database</button>
      </form>
    </div>
  );
};

export default AddCoffeeForm;
