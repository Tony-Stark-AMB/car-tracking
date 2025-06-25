import React, { useEffect } from "react";
import EmptyState from "@components/EmptyState/EmptyState";
import "./UsersPage.css";
import UserList from "../../components/UserList/UserList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/reducers/usersSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);
  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error);

  useEffect(() => {
    if(usersStatus === "idle"){
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  switch(usersStatus){
    case "loading": 
      return (
        <section className="users-section">
          <h2>Users</h2>
          <p>Loading Users...</p>
        </section>
      );
    case "failed":
      return (
        <section className="users-section">
          <h2>Users</h2>
          <p>Error: {usersError}</p>
        </section>
      );
    case "succeeded":
      return (
        <section className="users-section">
          <h2>Users</h2>
          {users.length === 0 ? (
            <EmptyState message="Nothing here yet" />
          ) : (
            <UserList users={users} />
          )}
        </section>
      );
  }
};

export default UsersPage;