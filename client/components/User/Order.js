import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders } from '../../redux/reducers/allUserReducer';
import { getUsersOrdersAsync } from '../../redux/actions/additionalUserActions';
import { useParams } from 'react-router';

const Order = ({ userId }) => {
  const orders = useSelector(selectOrders);
  console.log('orders: ', orders);
  console.log('userId: ', userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrdersAsync(userId));
  }, [dispatch]);

  return (
    <div>
      {orders ? (
        orders.map((order) => (
          <div key={`${order.id} - ${order.orderNumber}`}>
            <p>{order.id}</p>
            <p>{order.orderNumber}</p>
            <p>{order.totalAmount}</p>
            <p>{order.shippingAddress}</p>
          </div>
        ))
      ) : (
        <p>no data available</p>
      )}
    </div>
  );
};

export default Order;
