import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/";


export function getOrders(email) {
  return fetch(baseUrl + "orders/" + email ).then(handleResponse).catch(handleError);
}

export function getOrdersDetails(orderNo) {
  return fetch(baseUrl + "order-details/" + orderNo ).then(handleResponse).catch(handleError);
}
