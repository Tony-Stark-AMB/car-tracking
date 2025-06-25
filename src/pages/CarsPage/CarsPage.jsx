import React, { useEffect } from "react";
import CarList from "@components/CarList/CarList";
import EmptyState from "@components/EmptyState/EmptyState";
import Button from "@components/Button/Button";
import { MOCK_CARS } from "../../mock/data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../store/reducers/carsSlice";

const CarsPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars.list);
  const carsStatus = useSelector(state => state.cars.status);
  const carsErros = useSelector(state => state.cars.errors);

  useEffect(() => {
    if(carsStatus == "idle")
      dispatch(fetchCars());
  }, [carsStatus, dispatch])

  switch(carsStatus){
    case "loading":
      return (
        <section className="cars-section">
          <h2>All Cars</h2>
          <p>Loading Cars...</p>
        </section>
      );
    case "failed":
      return (
        <section className="cars-section">
          <h2>All Cars</h2>
          <p>Error: {carsErros}</p>
        </section>
      );
    case "succeeded":
      return (
        <section className="cars-section">
          <h2>All Cars</h2>
          {cars.length == 0 ? 
          (<EmptyState message="Nothing here yet">
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
  }
  
};

export default CarsPage;