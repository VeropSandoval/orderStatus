import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./orders-form.css";

const EMAIL_VALIDATOR = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const OrdersForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      setError("Email cannot be empty");
    } else if (EMAIL_VALIDATOR.test(email)) {
      history.push(`/orders/${email}`);
    } else {
      setError("Invalid email")
    }
  };

  return (
    <div>
      <p>Please enter your email address to see your recent orders</p>
      <form className="OrdersForm" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" onChange={handleChange} value={email} />
          <span className="OrdersForm-error">{error}</span>
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

export default OrdersForm;