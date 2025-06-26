import React, { useEffect } from "react";
import AddCarForm from "@components/AddCarForm/AddCarForm";
import { Link, useNavigate } from "react-router-dom";
import Button from "@components/Button/Button";
import "./AddCarPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewCar } from "../../store/reducers/carsSlice";
import { fetchUsers } from "../../store/reducers/usersSlice";

const AddCarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carsStatus = useSelector(state => state.cars.status);
  const carsError = useSelector(state => state.cars.error);
  const users = useSelector(state => state.users.list);
  const usersStatus = useSelector(state => state.users.status);

  useEffect(() => {
    if(usersStatus === "idle" || usersStatus === "failed")
      dispatch(fetchUsers());
  }, [usersStatus, dispatch])
  
  const handleAddCarSubmit = async (newCarData) => {
    console.log("Submitting new car from AddCarPage:", newCarData);

    alert("Car data submitted (func not yet implemented");

    try{
      const resultAction = await dispatch(addNewCar(newCarData)).unwrap();
      console.log("New car added:", resultAction);
      alert("Car added successfully!");
      navigate("/cars");
    } catch (err) {
      console.error("Failed to add car:", err);
      alert(`Failed to add car: ${err.message || "Unknow Error"}`);
    }
  };

  switch(usersStatus){
    case "loading":
      return (
        <div className="add-car-page-container">
          <h2>Add New Car</h2>
          <p>Loading users for owner selection...</p>
        </div>
      );
    case "failed":
      return (
        <div className="add-car-page-container">
          <h2>Add New Car</h2>
          <p className="error-message">Error loading users: {usersError}</p>
          <Link to="/cars">
            <Button>Back to All Cars</Button>
          </Link>
        </div>
      );
    case "succeeded":
      return (
         <div className="add-car-page-container">
          <h2>Add New Car</h2>
          {carsStatus == "loading" && <p>Adding car...</p>}
          {carsStatus == "failed" && <p className="error-message">Error: ${carsError}</p>}
          <AddCarForm onSubmit={handleAddCarSubmit} users={users} />
          <div style={{textAlign: "center", marginTop: "20px" }}>
            <Link to="/cars">
              <Button>Back to All Cars</Button>
            </Link>
          </div>
        </div>
      );
  }
};

export default AddCarPage;