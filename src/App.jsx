import React, { useState } from 'react';
import Header from "./components/Header/Header";
import EmptyState from './components/EmptyState/EmptyState';
import UserList from './components/UserList/UserList';
import CarList from './components/CarList/CarList';
import AddCarForm from './components/AddCarForm/AddCarForm';
import { MOCK_USERS, MOCK_CARS } from './mock/data';
import './App.css'

function App() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [cars, setCars] = useState(MOCK_CARS);

  // const [users, setUsers] = useState([]);
  // const [cars, setCars] = useState([]);

  return (
    <div className="app-container">
      <Header />
      <main className="app-main-content">
        <section className="users-section">
          <h2>Users</h2>
          {users.length === 0 ? (
            <EmptyState message="Nothing here yet" />
          ) : (
            <UserList users={users} />
          )}
        </section>
        <section className="cars-section">
          <h2>All Cars</h2>
          {cars.length === 0 ? (
            <EmptyState 
              message="Nothing here yet"
              showButton={true}
              buttonText="Add a car"
              onButtonClick={() => console.log("add a car btn clicked")}
            />
          ) : (
              <CarList cars={cars} />
            )}
        </section>
        <section className="add-car-form-section">
          <h2>Add a New Car</h2>
          <AddCarForm />
        </section>
      </main>
    </div>
  );
}

export default App;
