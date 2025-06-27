import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/reducers/usersSlice';
import Button from '../../components/Button/Button';
import CarList from "../../components/CarList/CarList";
import "./UserProfilePage.css";
import { fetchCarsByUserId } from '../../store/reducers/carsSlice';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const {id: userId } = useParams();
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.list);
  const userStatus = useSelector(state => state.users.status);
  const userError = useSelector(state => state.users.error);

  const userCars = useSelector(state => state.cars.userCars);
  const userCarsStatus = useSelector(state => state.cars.userCarsStatus);
  const userCarsError = useSelector(state => state.cars.userCarsError);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0);
    return parts.map(part => part.charAt(0)).join('');
  };

  useEffect(() => {
    if(userStatus == "idle" || userStatus == "failed")
      dispatch(fetchUsers());
  }, [userStatus, dispatch]);

  useEffect(() => {
    if (userId && (userCarsStatus === 'idle' || userCarsStatus === 'failed')) {
      dispatch(fetchCarsByUserId(userId));
    }
  }, [dispatch, userId, userCarsStatus]);

  const user = users.find(u => u.id == userId);
  
  if(userStatus === "loading" || userCarsStatus === "loading"){
    return (
        <div className="user-profile-container">
          <h2>Loading User Profile and Cars...</h2>
        </div>
      );
    }
  if(userStatus == "failed" || userCarsStatus === "failed"){
    return (
        <div className="user-profile-container">
          <h2>Error Loading User</h2>
          <p className="error-message">Error loading profile or cars: {userError || userCarsError}</p>
          <Link to="/users">
            <Button>Back to all users</Button>
          </Link>
        </div>
      )
  }
  
  if(!user){
    return (
      <div className="user-profile-container">
        <h2>User Not Found</h2>
        <p>The user with ID "{userId}" does not exist or could not be loaded.</p>
        <Link to="/users">
          <Button>Back to all users</Button>
        </Link>
      </div>
    )
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="user-profile-avatar">
        {user.avatar ? <img src={user.avatar} /> : <span className="initials">getInitials(user.name)</span>}
      </div>
      <div className="user-profile-card">
        <h3>{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>ID:</strong> {user.id}</p>
        <div className="user-cars-section">
          <h3>Cars owned by {user.name}</h3>
        </div>
        {userCarsStatus == "loading" && (<p>Loading cars...</p>)}
        {userCarsStatus == "failed" &&  (
          <p className="error-message">
            Failed to load cars: {userCarsError}
          </p>
        )}
        {userCarsStatus === 'succeeded' && userCars.length === 0 && (
          <p>This user currently owns no cars.</p>
        )}
        {userCarsStatus == "succeeded" && userCars.length > 0 && (
          <CarList cars={userCars}/>
        )}
      </div>
      <div className="user-profile-actions">
        <Link>
          <Button onClick={() => navigate(`/cars/add?userId=${userId}`)}>Add New Car for this User</Button>
          <Button>Back to all users</Button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfilePage;