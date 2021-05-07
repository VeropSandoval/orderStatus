import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderCard from "../order-card";
import * as ordersApi from "../../api/ordersApi";
import "./orders.css";

const Orders = () => {
  const { email } = useParams();
  const [ orderList, setOrderList ] = useState([]);

  useEffect(() => {
    ordersApi
    .getOrders(email)
    .then((response) => {
      setOrderList(response);
    })
    .catch((error) => {
      return <span>There was an error retrieving trackings for {email} </span>
    });
  }, [email]);

  if (!orderList || orderList.length === 0) {
    return <span>There is no orders for email {email} </span>
  }
  return (
    <div className="Orders-container">
      <ul>
        {orderList.map((order, index) => {
          return (
          <li key={`orders_${index}`}>
              <OrderCard order={order} isClickable={true} />
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Orders;