import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/reducers/usersSlice';
import Button from '../../components/Button/Button';
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.list);
  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0);
    return parts.map(part => part.charAt(0)).join('');
  };

  useEffect(() => {
    if(usersStatus == "idle" || usersStatus == "failed")
      dispatch(fetchUsers());
  }, [usersStatus, dispatch]);

  const user = users.find(u => u.id == id);
  
  if(usersStatus == "loading"){
    return (
        <div className="user-profile-container">
          <h2>Loading User Profile...</h2>
        </div>
      );
    }
  if(usersStatus == "failed"){
    return (
        <div className="user-profile-container">
          <h2>Error Loading User</h2>
          <p className="error-message">Error: {usersError || "Failed to load user profile"}</p>
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
        <p>The user with ID "{id}" does not exist or could not be loaded.</p>
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
        {/* <UserCarsList userId={user.id} /> */}
      </div>
      <div className="user-profile-actions">
        <Link to="/users">
          <Button>Back to all users</Button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfilePage;