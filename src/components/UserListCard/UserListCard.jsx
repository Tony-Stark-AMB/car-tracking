import React from "react";
import Button from "../Button/Button";

import "./UserListCard.css";

const UserListCard = ({user}) => {
  const handlerUserClick = () => {
    console.log(`Btn Details click for user: ${user.name} (ID: ${user.id})`)
  };

  return (
    <div className="user-list-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Button onClick={handlerUserClick}>Details</Button>
    </div>
  );
};

export default UserListCard;