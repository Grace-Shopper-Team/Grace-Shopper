import React, { useEffect, useState } from 'react';

const Confirmation = () => {
  //   const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [orderTotal, setOrderTotal] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    useEffect(() => {
      async function fetchData() {
        let urlParams = new URLSearchParams(window.location.search);
        let sessionId = urlParams.get('session_id');
        if (sessionId) {
          const response = await fetch(`/order-info?session_id=${sessionId}`);
          const data = await response.json();
          const { customer, session } = data;
          // setCustomerName(customer.name);
          setCustomerEmail(customer.email);
          setOrderTotal(customer.total);
          setPaymentStatus(session.payment_status);
          let currencyFmt = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: `${session.currency}`,
          });
          setOrderTotal(`${currencyFmt.format(session.amount_total / 100)}`);
        }
      }
      fetchData();
    }, []);
    return (
      <section className="order-info">
        <h1> Thank you for your order!</h1>
        <img src="https://ctl.s6img.com/society6/img/2TKPBeEQrFWMGSLx0QcOBpalVXU/w_700/prints/~artwork/s6-0082/a/32591968_12340380/~~/thanks-a-latte-prints.jpg"></img>
        <ul>
          {/* <li>Name:<span id="customer_name">{customerName}</span></li> */}
          <li>Email:<span id="customer_email">{customerEmail}</span></li>
        </ul>
        <ul>
          <li>Order Total:<span id="order_total">{orderTotal}</span></li>
          <li>Payment Status:<span id="payment_status">{paymentStatus}</span></li>
        </ul>
        <p>
          We appreciate your business!
        </p>
      </section>
    );
  };
  export default Confirmation;