import React from "react";
import "./card-info.css";

const CardInfo = ({label, data}) => {
  return (
    <>
    <div className="CardInfo-label">{label}</div>
    <div className="CardInfo-text">{data.map((item, index) => {
        return (<span key={`cardInfo_${index}`}>{item}</span>);
      })}
    </div>
    </>
  );
};

export default CardInfo;