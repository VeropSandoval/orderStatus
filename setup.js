const express = require("express");
const cors = require('cors');
const orders = require("./orders");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/orders/:email", (req, res) => {
  return orders.getByEmail(req.params.email)
    .then((response) => {
      res.json(response);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.get("/order-details/:orderNo", (req, res) => {
  return orders.getByOrderNumber(req.params.orderNo)
    .then((response) => {
      res.json(response);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});