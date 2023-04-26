import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders } from '../../redux/reducers/allUserReducer';
import { getUsersOrdersAsync } from '../../redux/actions/additionalUserActions';

const Order = ({ userId }) => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrdersAsync(userId));
  }, [dispatch]);

  return (
    <div className='orders-container'>
      {orders ? (
        orders.map((order) => (
          <div key={`${order.id} - ${order.orderNumber}`} className='one-order'>
            <p>Confirmation Number: {order.orderNumber}</p>
            <p>SubTotal: ${order.totalAmount}</p>
            <p>Ship to Address: {order.shippingAddress}</p>
            <p>Coffee Ordered: </p>
            <div className='orders-coffee-container'>
              {order.orderItems.map((item) => (
                <div
                  key={`${item.id}-${order.id}-${order.orderNumber}`}
                  className='order-coffee'>
                  <p>Name: {item.coffee.name}</p>
                  <p>Price: {item.coffee.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${item.quantity * item.coffee.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No Orders Placed</p>
      )}
    </div>
  );
};

export default Order;
