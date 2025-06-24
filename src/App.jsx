import React, { useState } from 'react';
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import CarsPage from "./pages/CarsPage/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import AddCarPage from './pages/AddCarPage/AddCarPage';
import { MOCK_USERS, MOCK_CARS } from './mock/data';
import './App.css'

function App() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [cars, setCars] = useState(MOCK_CARS);

  // const [users, setUsers] = useState([]);
  // const [cars, setCars] = useState([]);

  return (
    <Router>
      <div className="app-container">
      <Header />
      <nav className="main-nav">
        <Link to="/users">Users</Link>
        <Link to="/cars">Cars</Link>
      </nav>
      <main className="app-main-content">
        <Routes>
          <Route path="/cars/add" element={<AddCarPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          {/* <Route path="/cars/:id/edit" /> */}
          <Route path="/login"/>
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/users" element={<UsersPage />}/>
          <Route path="/" element={<CarsPage />} />
          <Route path="*" element={
            <div>
              <h1>404 Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <Link to="/">Go Home</Link>
            </div>}/>
        </Routes>
      </main>
    </div>
    </Router>
    
  );
}

export default App;
