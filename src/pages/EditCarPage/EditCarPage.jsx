import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCarForm from "../../components/AddCarForm/AddCarForm";
import Button from "../../components/Button/Button";
import { fetchCars, updateCar } from "../../store/reducers/carsSlice";
import { fetchUsers } from "../../store/reducers/usersSlice";
import "./EditCarPage.css";

const EditCarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cars = useSelector(state => state.cars.list);
  const carsStatus = useSelector(state => state.cars.status);
  const carsError = useSelector(state => state.cars.error);

  const users = useSelector(state => state.users.list);
  const usersStatus = useSelector(state => state.users.status);

  const [initialCarData, setInitialCarData] = useState(null);

  useEffect(() => {
    if(carsStatus == "idle" || carsStatus == "failed")
      dispatch(fetchCars());
    if(usersStatus == "idle" || usersStatus == "failed")
      dispatch(fetchUsers());
  }, [dispatch, carsStatus, usersStatus])

  useEffect(() => {
    if(carsStatus == "succeeded" && cars.length > 0){
      const carToEdit = cars.find(car => car.id === id);
      if(carToEdit)
        setInitialCarData(carToEdit)
      else  {
        alert(`Car with ID ${id} not found`);
        navigate("/cars");
      }
    }
  }, [carsStatus, cars, id, navigate]);

  const handleEditCarSubmit = async (updatedData) => {
    console.log("Submiting update car data:", updatedData);
    try{
      const resultAction = await dispatch(updateCar({...updatedData, id})).unwrap();
      console.log("Car updated:", resultAction);
      alert("Car updated successfully!");
      navigate(`/cars/${id}`);
    } catch (err) {
      console.error("Failed to update car:", err);
      alert(`Failed to update car: ${err.message || "Uknown Error"}`);
      dispatch(fetchCars());
    }
  };

  if(carsStatus == "loading" || usersStatus == "loading"){
    return (
      <div className="edit-car-page-container">
        <h2>Loading Car Detailes for Edit...</h2>
      </div>
    );
  };

  if(carsStatus == "failed" || usersStatus == "failed"){
    return (
      <div className="edit-car-page-container">
        <h2>Error Loading Car for Edit</h2>
        <p className="error-message">Error: {carsError || "Failed to load data"}</p>
        <Link to="/cars">
          <Button>Back to All Cars</Button>
        </Link>
      </div>
    );
  }

  if(!initialCarData){
    return (
      <div className="edit-car-page-container">
        <h2>Car Not found or Not Loaded</h2>
        <p>Attempting to load car detailes for ID: {id}</p>
        <Link to="/cars">
          <Button>Back to All Cars</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-car-page-container">
      <h2>Edit Car</h2>
      <AddCarForm onSubmit={handleEditCarSubmit} initialData={initialCarData} users={users}/>
      <div style={{textAlign: "center", marginTop: "20px"}}>
        <Link to={`/cars/${id}`}>
          <Button>Cancel</Button>
        </Link>
      </div>
    </div>
  );
};

export default EditCarPage;