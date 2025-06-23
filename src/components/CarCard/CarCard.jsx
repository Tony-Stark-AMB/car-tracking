import React from "react";
import Button from "../Button/Button";
import "./CarCard.css";

const CarCard = ({car}) => {
  const handleDetaileClick = () => {
    console.log("Detaile click btn have been clicked");
  };

  const handleEditClick = () => {
    console.log("Edit click btn have been clicked");
  };

  return (
    <div className="car-card">
      <h3>{car.manufacturer} {car.model} ({car.year})</h3>
      <p>Color: {car.color}</p>
      <p>VIN: {car.vin}</p>
      <div className="car-card-actions">
        <Button onClick={handleDetaileClick}>Details</Button>
        <Button onClick={handleEditClick} className="button-secondary">Edit</Button>
      </div>
    </div>
  );
};

export default CarCard;