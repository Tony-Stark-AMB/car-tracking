import React from "react";
import UserListCard from "../UserListCard/UserListCard";
import "./UserList.css";

const UserList = ({ users }) => {
  if(!users || users.length == 0) return null;

  return (
    <div className="user-list">
      {users.map(user => (<UserListCard key={user.id} user={user}/>))}
    </div>
  );
};

export default UserList;