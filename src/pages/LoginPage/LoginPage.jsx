// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/reducers/authSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector(state => state.auth.authStatus);
  const authError = useSelector(state => state.auth.authError);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/cars');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email })).unwrap();
    } catch (error) {
      console.error("Login attempt failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email (e.g., admin@mail.com)"
          required={true}
        />
        {authStatus === 'loading' && <p className="status-message">Logging in...</p>}
        {authError && <p className="error-message">{authError}</p>}
        <Button type="submit" disabled={authStatus === 'loading'}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;