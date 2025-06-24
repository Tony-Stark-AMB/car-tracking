import React from "react";
import CarList from "@components/CarList/CarList";
import EmptyState from "@components/EmptyState/EmptyState";
import Button from "@components/Button/Button";
import { MOCK_CARS } from "../../mock/data";
import { Link } from "react-router-dom";

const CarsPage = () => {
  const cars = MOCK_CARS;

  return (
    <section className="cars-section">
      <h2>All Cars</h2>
      {cars.length == 0 ? 
      (<EmptyState 
        message="Nothing here yet"
        showButton={true}
        buttonText="Add a car"
        onButtonClick={() => {}}
      >
        <Link to="/cars/add">
          <Button>Add a car</Button>
        </Link>
      </EmptyState >
    ) : (
      <>
        <div style={{ textAlign: "right", marginBottom: "20px"}}>
          <Link to="/cars/add">
            <Button>Add New Car</Button>
          </Link>
        </div>
        <CarList cars={cars}/>
      </>
    )}
    </section>
  );
};

export default CarsPage;