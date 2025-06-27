import React, { useEffect } from 'react';
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import CarsPage from "./pages/CarsPage/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import AddCarPage from './pages/AddCarPage/AddCarPage';
import EditCarPage from './pages/EditCarPage/EditCarPage';
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import LoginPage from './pages/LoginPage/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromLocalStorage } from './store/reducers/authSlice';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const authStatus = useSelector(state => state.auth.authStatus);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  // const [users, setUsers] = useState([]);
  // const [cars, setCars] = useState([]);

   const ProtectedRoute = ({ children }) => {
    if (authStatus === 'loading') {
      return <div className="app-loading-screen">Authenticating...</div>; // Или спиннер загрузки
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />; // Перенаправляем на логин, если не аутентифицирован
    }
    return children; // Если аутентифицирован, рендерим дочерние элементы
  };

  return (
    <Router>
      <div className="app-container">
      <Header />
       {isAuthenticated && (
          <nav className="main-nav">
            <Link to="/users">Users</Link>
            <Link to="/cars">Cars</Link>
          </nav>
        )}
      <main className="app-main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cars/add" element={<ProtectedRoute><AddCarPage /></ProtectedRoute>} />
          <Route path="/cars/:id/edit" element={<ProtectedRoute><EditCarPage /></ProtectedRoute>} />
          <Route path="/cars/:id" element={<ProtectedRoute><CarDetailsPage /></ProtectedRoute>} />
          <Route path="/login"/>
          <Route path="/cars" element={<ProtectedRoute><CarsPage /></ProtectedRoute>} />
          <Route path="/users/:id" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>}/>
          <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>}/>
          <Route path="/" element={<ProtectedRoute><CarsPage /></ProtectedRoute>} />
           <Route path="*" element={isAuthenticated ? (
                <div><h1>404 Not Found</h1><p>The page you are looking for does not exist.</p><Link to="/cars">Go Home</Link></div>
              ) : (
                <Navigate to="/login" replace />
              )}
            />
        </Routes>
      </main>
    </div>
    </Router>
    
  );
}

export default App;
