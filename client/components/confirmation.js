import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderInfo}  from '../redux/actions/cartActions';

const Confirmation = () => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderTotal, setOrderTotal] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      let urlParams = new URLSearchParams(window.location.search);
      let sessionId = urlParams.get('session_id');
      if (sessionId) {
        try {
          const response = await fetch(`/api/cart/order-info?session_id=${sessionId}`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
          }
          const data = await response.json();
          const { customer, session } = data;
          setCustomerEmail(customer.email);
          setOrderTotal(session.amount_total);
          setPaymentStatus(session.payment_status);
        } catch (error) {
          console.error('Error fetching order info:', error);
        }
      }
    }
    fetchData();
  }, []);
  
  
    

  return (
    <section className='order-info'>
      <h1> Thank you for your order!</h1>
      <img src='https://ctl.s6img.com/society6/img/2TKPBeEQrFWMGSLx0QcOBpalVXU/w_700/prints/~artwork/s6-0082/a/32591968_12340380/~~/thanks-a-latte-prints.jpg'></img>
      <ul>
        {/* <li>Name:<span id="customer_name">{customerName}</span></li> */}
        <li>
          Email:<span id='customer_email'>{customerEmail}</span>
        </li>
      </ul>
      <ul>
        <li>
          Order Total:<span id='order_total'>{orderTotal}</span>
        </li>
        <li>
          Payment Status:<span id='payment_status'>{paymentStatus}</span>
        </li>
      </ul>
      <p>We appreciate your business!</p>
    </section>
  );
};
export default Confirmation;
