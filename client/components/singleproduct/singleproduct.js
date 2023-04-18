import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleProduct , handleAddToCart} from 

 const SingleProduct = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch, productId]);

    const coffees = useSelector(state => state.coffees);
    const singleProduct = coffees.find(coffee => coffee.id === productId);

    const handleAddToCart = (productId) => {
        dispatch(addProductToCart(productId));
    };

    return (

        <div className='product-container'>
        <div className='back-btn'>
            <Link to={'/allcoffee'}>back</Link>
        </div>
            {singleProduct ? (
                <>
                    <h1>{singleProduct.name}</h1>
                    <p>{singleProduct.description}</p>
                    <p>{singleProduct.stock}</p>
                    <button id='add-cart' onClick={() =>handleAddToCart(singleProduct.id)}> Add To Cart</button>
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default SingleProduct;
