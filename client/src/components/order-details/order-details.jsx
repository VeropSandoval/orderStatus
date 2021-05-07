import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardInfo from "../card-info";
import CardField from "../card-field";
import * as ordersApi from "../../api/ordersApi";
import "./order-details.css";

const OrdersDetails = () => {
  const { orderNo } = useParams();
  const { history } = useHistory();
  const [ details, setDetails ] = useState(null);

  useEffect(() => {
    ordersApi
    .getOrdersDetails(orderNo)
    .then((response) => {
      setDetails(response);
    })
    .catch((error) => {
      return <span>There was an error retrieving trackings for {orderNo} </span>
    });
  }, [orderNo]);

  if (!details) {
    return <span>There is no orders for orderNo {orderNo} </span>
  }
  return (
    <div className="OrdersDetails_container">
      <CardField>
        <CardInfo label="Order Number" data={[details.orderNo]} />
      </CardField>
      <CardField>
        <CardInfo label="Delivery Address" data={details.address} />
      </CardField>
      <CardField>
        <CardInfo label="Tracking Number" data={[details.trackingNumber]} />
      </CardField>
      <CardField>
        <CardInfo label="Current Status" data={[details.checkpoints[0].status_details]} />
      </CardField>
      <CardField>
        <div className="OrderDetails_tracking">
            <ul>
            {details.checkpoints.map((item, index) => {
              return (<li>
                <div className="OrderDetails_trackingDate">{new Date(item.timestamp).toLocaleString()}</div>
                <div className="OrderDetails_trackingStatus">{item.status_text}</div>
              </li>)
            })}
            </ul>
          </div>
        
      </CardField>
      <CardField>
      <CardInfo label="Articles" data={[]} />
        <div className="OrderDetails_articles">
            <ul>
            {details.articles.map((item, index) => {
              return (<li>
                <div className="OrderDetails_articleQuantity">x{item.quantity}</div>
                <div className="OrderDetails_articleImage">
                  <img src={item.articleImageUrl} />
                </div>
                <div className="OrderDetails_articleName">{item.productName}</div>
              </li>)
            })}
            </ul>
          </div>
        
      </CardField>
    </div>
  )
}

export default OrdersDetails;