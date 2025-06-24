import React from "react";
import AddCarForm from "@components/AddCarForm/AddCarForm";
import { Link } from "react-router-dom";
import Button from "@components/Button/Button";
import "./AddCarPage.css";

const AddCarPage = () => {
  const handleSubmit = (newCarData) => {
    console.log("Submitting new car from AddCarPage:", newCarData);

    alert("Car data submitted (func not yet implemented");
  };

  return (
    <div className="add-car-page-container">
      <AddCarForm onSubmit={handleSubmit} />
      <div style={{textAlign: "center", marginTop: "20px" }}>
        <Link to="/cars">
          <Button>Back to All Cars</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddCarPage;