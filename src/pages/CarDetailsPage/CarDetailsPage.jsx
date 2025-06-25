import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@components/Button/Button";
import "./CarDetailsPage.css";
import { useDispatch, useSelector } from "react-redux";
//fetchCarById

const CarDetailsPage = () => {
  const { id } = useParams();
  const cars = useSelector(state => state.cars.list);
  const car = cars.find(carId => carId.id == id);

  const carsStatus = useSelector(state => state.cars.status);
  const carsError = useSelector(state => state.cars.error); 

  // const dispatch = useDispatch()
  // const [specificCar, setSpecificCar] = useState(null);
  // useEffect(() => {
  //   if(id)
  //     dispatch(fetchCardById(id));
  // }, [])

  switch(carsStatus){
    case "loading":
      return (
        <div className="car-details-container">
          <h2>Loading Car Detailes...</h2>
        </div>
      );
    case "failed":
      return (
        <div className="car-details-container">
          <h2>Error Loading Car</h2>
          <p className="error-message">Error: {carsError || "Failed to load car detailes"}</p>
            <Link to="/cars" >
              <Button>Back to all cars</Button>
            </Link>
        </div>
      );
    case "succeeded":
      return (
        <div className="car-detailes-container">
          <h2>Car Details</h2>
          <div className="car-detailes-card">
            <h3>{car.manufacturer} {car.model}</h3>
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
  }



  
};

export default CarDetailsPage;
