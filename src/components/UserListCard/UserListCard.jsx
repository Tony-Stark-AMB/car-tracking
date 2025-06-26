import React from "react";
import Button from "../Button/Button";

import "./UserListCard.css";
import { useNavigate } from "react-router-dom";

const UserListCard = ({user}) => {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0);
    return parts.map(part => part.charAt(0)).join('');
  };
  
  const handlerUserClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
     <div className="user-card">
      <div className="user-avatar">
        {/* Здесь можно было бы использовать user.avatarUrl, если бы он был в данных */}
        {/* А пока используем инициалы как заглушку */}
        {user.avatar ? <img src={user.avatar} /> : <span className="initials">{getInitials(user.name)}</span>}
        {/* В будущем:
        {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} />
        ) : (
            <span className="initials">{getInitials(user.name)}</span>
        )}
        */}
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        {user.phone && <p>{user.phone}</p>}
      </div>
      <div className="user-card-actions">
        <Button onClick={handlerUserClick}>Details</Button>
      </div>
    </div>
  );
};

export default UserListCard;