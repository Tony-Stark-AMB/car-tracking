import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import "./CarDetailsPage.css";
import { fetchUsers } from "../../store/reducers/usersSlice";
//fetchCarById

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const cars = useSelector(state => state.cars.list);
  const carsStatus = useSelector(state => state.cars.status);
  const carsError = useSelector(state => state.cars.error); 

  const users = useSelector(state => state.users.list);
  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error);

  useEffect(() => {
    if(usersStatus == "idle" || usersStatus == "failed")
      dispatch(fetchUsers());
  }, [usersStatus, dispatch]);

  const car = cars.find(car => car.id === id);
  const owner = car && users.find(user => user.id === car.userId);

  // const [specificCar, setSpecificCar] = useState(null);
  // useEffect(() => {
  //   if(id)
  //     dispatch(fetchCardById(id));
  // }, [])

  switch(true){
    case !car:
      return (
        <div className="car-details-container">
          <h2>Car not Found</h2>
          <p>The car with ID "{id}" does not exist or has not been loaded.</p>
          <Link to="/cars" >
              <Button>Back to all cars</Button>
          </Link>
        </div>
      );
    case carsStatus == "loading" || usersStatus == "loading":
      return (
        <div className="car-details-container">
          <h2>Loading Car Detailes...</h2>
        </div>
      );
    case carsStatus == "failed" || usersStatus == "failed":
      return (
        <div className="car-details-container">
          <h2>Error Loading Car</h2>
          <p className="error-message">Error: {carsError || usersError || "Failed to load car detailes"}</p>
            <Link to="/cars" >
              <Button>Back to all cars</Button>
            </Link>
        </div>
      );
    case carsStatus == "succeeded" || carsStatus == "succeeded":
      return (
        <div className="car-detailes-container">
          <h2>Car Details</h2>
          <div className="car-detailes-card">
            <h3>{car.manufacturer} {car.model}</h3>
            <p><strong>Color: {car.color}</strong></p>
            <p><strong>Price: {car.price}</strong></p>
            <p><strong>VIN: {car.vin}</strong></p>
            <p><strong>Status:</strong> {car.isNew ? "New" : "Used"}</p>
            {owner ? (
              <p><strong>Owner:</strong> <Link to={`/users/${owner.id}`}>{owner.name} ({owner.email})</Link></p>
            ) : (
              car.userId && <p><strong>Owner ID:</strong> {car.userId} (Not Found)</p>
            )}
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
};

export default CarDetailsPage;
