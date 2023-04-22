import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCoffeeToStockAsync } from '../../redux/actions/allCoffeeActions';
import { updateProduct } from '../../redux/actions/singleProductActions';

const AddCoffeeForm = ({ selectedCoffee, onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [roast, setRoast] = useState('');
  const [origin, setOrigin] = useState('');
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCoffee) {
      setName(selectedCoffee.name);
      setPrice(selectedCoffee.price);
      setDescription(selectedCoffee.description);
      setImageUrl(selectedCoffee.imageUrl);
      setRoast(selectedCoffee.roast);
      setOrigin(selectedCoffee.origin);
      setStock(selectedCoffee.stock);
    }
  }, [selectedCoffee]);

  const resetForm = () => {
    setName('');
    setPrice(0);
    setDescription('');
    setImageUrl('');
    setRoast('');
    setOrigin('');
    setStock(0);
  };

  const handleAddOrUpdateCoffee = (e) => {
    e.preventDefault();
    if (selectedCoffee) {
      dispatch(
        updateProduct({
          id: selectedCoffee.id,
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
    } else {
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
    }
    onSubmit();
  };

  return (
    <div className='add-coffee-container'>
      <form className='form' onSubmit={handleAddOrUpdateCoffee}>
        <span className='title'>
          {selectedCoffee ? 'Edit Coffee' : 'Add Coffee to Shop Stock'}
        </span>
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
          {selectedCoffee ? 'Update Coffee' : 'Add Coffee'}
        </button>
      </form>
    </div>
  );
};

export default AddCoffeeForm;
