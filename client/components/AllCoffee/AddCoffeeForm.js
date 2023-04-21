import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoffeeToStockAsync } from '../../redux/actions/allCoffeeActions';

const AddCoffeeForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [roast, setRoast] = useState('');
  const [origin, setOrigin] = useState('');
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

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
        <span className='title'>Add Coffee to Shop Stock</span>
        <label className='label'>Name: </label>
        <input
          required
          className='input'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className='label'>Price: </label>
        <input
          required
          className='input'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label className='label'>Description: </label>
        <input
          required
          className='input'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='label'>Image Url: </label>
        <input
          required
          className='input'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label className='label'>Roast: </label>
        <input
          required
          className='input'
          value={roast}
          onChange={(e) => setRoast(e.target.value)}
        />
        <label className='label'>Origin: </label>
        <input
          required
          className='input'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <label className='label'>Stock: </label>
        <input
          required
          className='input'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type='submit' className='submit'>
          Add Coffee
        </button>
      </form>
    </div>
  );
};

export default AddCoffeeForm;
