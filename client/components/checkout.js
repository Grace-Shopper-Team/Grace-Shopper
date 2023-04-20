import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCartAction } from '../redux/actions/cartActions';
import { selectCart } from '../redux/reducers/cartSlice';

const Checkout = (props) => {
  const cartState = props;
  console.log('in the checkout component', cartState);
  // const dispatch = useDispatch();
  // const cartState = useSelector(selectCart);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    //   dispatch(fetchAllCartAction(1));
    //   //Calculate subtotal
    const newSubtotal = cartState.reduce(
      (acc, cart) => acc + cart.quantity * cart.coffee.price,
      0
    );
    setSubtotal(newSubtotal);

    //   // Calculate tax
    const taxPercentage = 0.1; // 10%
    const newTax = newSubtotal * taxPercentage;
    setTax(newTax);

    //   // Calculate total
    const newTotal = newSubtotal + newTax;
    setTotal(newTotal);
  }, [cartState]);
  return (
    <div id='checkout'>
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <h3>Tax (10%): ${tax.toFixed(2)}</h3>
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default Checkout;
