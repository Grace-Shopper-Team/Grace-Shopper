import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchAllCartAction } from '../redux/actions/cartActions';
import { selectCart } from '../redux/reducers/cartSlice';
import CheckOutlogIn from './Store/CheckOutlogIn';
// import { useAtom } from 'jotai';
//import GuestForm from './GuestForm';

const Checkout = (props) => {
  const cartState = props;
  const navigate = useNavigate();
  console.log('in the checkout component', cartState);
  // const dispatch = useDispatch();
  const cartStateFunc = useSelector(selectCart);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false); // state for modal visibility

  useEffect(() => {
    // Calculate subtotal
    console.log('cartStateFunc ===', cartStateFunc);

    if (Array.isArray(cartStateFunc) && cartStateFunc.length > 0) {
      const newSubtotal = cartStateFunc.reduce(
        (acc, cart) => acc + (cart?.quantity * cart?.coffee?.price || 0),
        0
      );
      setSubtotal(newSubtotal);

      // Calculate tax
      const taxPercentage = 0.1; // 10%
      const newTax = newSubtotal * taxPercentage;
      setTax(newTax);

      // Calculate total
      const newTotal = newSubtotal + newTax;
      setTotal(newTotal);
    } else {
      setSubtotal(0);
      setTax(0);
      setTotal(0);
    }
  }, [cartState]);

  //Guest Checkout
  const handleGuestCheckout = () => {
    localStorage.setItem('cartProducts', JSON.stringify(cartState.cartState));
    navigate('/GuestForm');
    console.log('Guest checkout clicked');
  };

  //SingIn
  const handleSignIn = () => {
    navigate('/login');
    console.log('Sign in clicked');
  };
  return (
    <div className='card'>
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <h3>Tax (10%): ${tax.toFixed(2)}</h3>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={handleGuestCheckout}>Checkout</button>
      {/* {showModal && (
        <div className='modal'>
          <h2>Checkout Options</h2>
          <button onClick={handleGuestCheckout}>Guest Checkout</button>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )} */}
    </div>
  );
};
// Add checkout Button, and pop out a window with 2 buttons, first one said Guest Checkout and the other one singn in.
export default Checkout;
