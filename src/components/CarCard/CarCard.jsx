import React from "react";
import Button from "../Button/Button";
import "./CarCard.css";
import { deleteCar, fetchCars } from "../../store/reducers/carsSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CarCard = ({car}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetaileClick = () => {
    navigate(`/cars/${car.id}`);
  };

  const handleEditClick = () => {
    navigate(`/cars/${car.id}/edit`);
  };

  const handleDeleteClick = async () => {
    if(window.confirm(`Are you sure you want to delete ${car.manufacturer} ${car.model}?`)){
      try{
        await dispatch(deleteCar(car.id)).unwrap();
        alert("Car deleted successfully!");
      } catch (err) {
        console.error("Failed to delete car:", err);
        alert(`Failed to delete car ${err}`);
        dispatch(fetchCars());
      }
    }
  }

  return (
    <div className="car-card">
      <h3>{car.manufacturer} {car.model}</h3>
      <p>Color: {car.color}</p>
      <p>VIN: {car.vin}</p>
      <div className="car-card-actions">
        <Button onClick={handleDetaileClick}>Details</Button>
        <Button onClick={handleEditClick} className="button-secondary">Edit</Button>
        <Button onClick={handleDeleteClick} className="button-danger">Delete</Button>
      </div>
    </div>
  );
};

export default CarCard;