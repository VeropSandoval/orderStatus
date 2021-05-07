import React from "react";
import CardInfo from "../card-info";
import CardField from "../card-field";
import { useHistory } from "react-router-dom";
import "./order-card.css";

const OrderCard = ({order, isClickable}) => {
  const history = useHistory();
  const handleClick = () => {
    console.log(order.orderNo);
    isClickable && history.push(`/order-details/${order.orderNo}`);
  }
  return (<div 
      className={`OrderCard-container ${isClickable ? `OrderCard-container__clickable` : ''}`.trim()}
      onClick={handleClick}
      >
    <CardField size="small">
      <CardInfo label="Order Number" data={[order.orderNo]} />
    </CardField>
    <CardField size="small">
      <CardInfo label="Current Status" data={[order.currentStatus.status_text]} />
    </CardField>
    <CardField>
      <CardInfo label="Delivery Address" data={order.address} />
    </CardField>
  </div>);
};

export default OrderCard;