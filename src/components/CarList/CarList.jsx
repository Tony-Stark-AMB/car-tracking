import React from "react";
import CarCard from "../CarCard/CarCard";
import "./CarList.css";

const CarList = ({ cars }) => {
  if(!cars || cars.length == 0) return null;

  return (
    <div className="car-list">
      {cars.map(car => (<CarCard key={car.id} car={car} />))}
    </div>
  );
};

export default CarList;