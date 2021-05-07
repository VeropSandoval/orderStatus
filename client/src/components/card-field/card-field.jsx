import React from "react";
import "./card-field.css"; 

const CardField = (props) => {
  const {size, children} = props;

  return (<div className={`CardField ${size ? `CardField__${size}` : ''}`.trim()}>
    {children}
  </div>)
}

export default CardField;