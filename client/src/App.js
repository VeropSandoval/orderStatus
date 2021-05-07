import logo from './assets/parcelLab_Logo_White.png';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Orders from "./components/orders";
import OrderDetails from "./components/order-details";
import OrdersForm from "./components/orders-form";
import NotFound from "./components/not-found";
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <header className="App-header">
        <img src={logo} alt="ParcelLab" />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={OrdersForm} />
          <Route path="/orders/:email" component={Orders} />
          <Route path="/order-details/:orderNo" component={OrderDetails} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  </Router>
  );
}

export default App;
