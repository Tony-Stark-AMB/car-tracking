import React, { useEffect } from "react";
import AddCarForm from "../../components/AddCarForm/AddCarForm";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./AddCarPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewCar } from "../../store/reducers/carsSlice";
import { fetchUsers } from "../../store/reducers/usersSlice";

const AddCarPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error);

  const carsStatus = useSelector(state => state.cars.status);
  const carsError = useSelector(state => state.cars.error);


  useEffect(() => {
    if(usersStatus === "idle" || usersStatus === "failed")
      dispatch(fetchUsers());
  }, [dispatch, usersStatus])

  const handleAddCarSubmit = (formData) => {
    dispatch(addNewCar(formData))
      .unwrap()
      .then(() => {
        alert('Car added successfully!');
        navigate('/cars');
      })
      .catch((error) => {
        alert(`Failed to add car: ${error.message || error}`);
      });
  };

  const handleCancel = () => {
    navigate('/cars');
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
          <AddCarForm onSubmit={handleAddCarSubmit} onCancle={handleCancel} />
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