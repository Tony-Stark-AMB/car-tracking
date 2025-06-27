import React from "react";
import Button from "../Button/Button";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">CarTracker</Link>
      <div className="user-info-header">
        {isAuthenticated ? (
          <>
            <span>Welcome, {currentUser ? currentUser.name : "User"}!</span>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <></>// <Button onClick={handleLogin}>Logout</Button>
        )}
      </div>
    </header>
  );
};

export default Header;