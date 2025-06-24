import React from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_CARS } from "../../mock/data";
import Button from "@components/Button/Button";
import "./CarDetailsPage.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const car = MOCK_CARS.find(carId => carId.id == id);

  if(!car){
    return (
      <div className="car-detailes-container">
        <h2>Car Not Found</h2>
        <p>The car with ID "{id}" does not exist.</p>
        <Link to="/cars" >
          <Button>Back to all cars</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="car-detailes-container">
      <h2>Car Details</h2>
      <div className="car-detailes-card">
        <h3>{car.manufacturer} {car.model} ({car.year})</h3>
        <p><strong>Color: {car.color}</strong></p>
        <p><strong>Price: {car.price}</strong></p>
        <p><strong>VIN: {car.vin}</strong></p>
        <p><strong>Status:</strong> {car.isNew ? "New" : "Used"}</p>
         {car.userId && <p><strong>Owner ID:</strong> {car.userId}</p>}
      </div>
      <div className="car-details-actions">
        <Link to={`/cars/${car.id}/edit`}>
          <Button className="button-secondary">Edit Car</Button>
        </Link>
        <Link to="/cars">
          <Button>Back to all cars</Button>
        </Link>
      </div>
    </div>
  );
};

export default CarDetailsPage;
