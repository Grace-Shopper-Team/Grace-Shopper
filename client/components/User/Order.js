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
    <div>
      {orders ? (
        orders.map((order) => (
          <div key={`${order.id} - ${order.orderNumber}`}>
            <p>{order.id}</p>
            <p>{order.orderNumber}</p>
            <p>{order.totalAmount}</p>
            <p>{order.shippingAddress}</p>
            <p>Items in Order: </p>
            {orderItems &&
              orderItems.map((item) => (
                <p>{order.orderItems[0].coffee.name}</p>
              ))}
          </div>
        ))
      ) : (
        <p>No Orders Placed</p>
      )}
    </div>
  );
};

export default Order;
