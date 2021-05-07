const csvToJson = require('convert-csv-to-json');
var path = require("path");

const trackings = csvToJson.getJsonFromCsv(path.join(__dirname, 'trackings.csv'));
const checkpoints = csvToJson.getJsonFromCsv(path.join(__dirname, 'checkpoints.csv'));

const createOrder = (item) => {
  const checkpoints = createCheckpoints(item.tracking_number);
  const article = createArticle(item)
  return {
    email: item.email,
    orderNo: item.orderNo,
    trackingNumber: item.tracking_number,
    address: [item.street, item.zip_code + " " + item.city],
    courier: item.courier,
    destinationCountry: item.destination_country_iso3,
    articles: article ? [article] : [],
    checkpoints,
    currentStatus: checkpoints && checkpoints.length > 0 
      ? checkpoints[0] 
      : "",
  };
};

const createCheckpoints = (trackingNumber) => {
  return checkpoints
    .filter((item) => item.tracking_number === trackingNumber)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

const createArticle = (item) => {
  if (item.articleImageUrl || item.articleNo || item.product_name || item.quantity) {
    return {
      articleImageUrl: item.articleImageUrl,
      articleNo: item.articleNo,
      productName: item.product_name,
      quantity: item.quantity,
    };
  }
  return null;
};

const allOrders = trackings.reduce((total, current) => {
  const currentOrder = total.find((item) => item.orderNo === current.orderNo);
  if (!currentOrder) {
    const newOrder = createOrder(current);
    total.push(newOrder);
  } else {
    currentOrder.articles.push(createArticle(current));
  }
  return total;
}, []);

const getByEmail = (email) => new Promise((resolve) => {
  const order = allOrders.filter((item) => item.email === email);
  resolve(order);
});

const getByOrderNumber = (orderNo) => new Promise((resolve) => {
  const order = allOrders.find((item) => item.orderNo === orderNo);
  resolve(order);
});

module.exports = {
  getByEmail,
  getByOrderNumber
};