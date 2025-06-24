import React from "react";
import EmptyState from "@components/EmptyState/EmptyState";
import {MOCK_USERS} from "../../mock/data";
import "./UsersPage.css";
import UserList from "../../components/UserList/UserList";

const UsersPage = () => {
  const users = MOCK_USERS;

  return (
    <section className="users-section">
      <h2>Users</h2>
      {users.length == 0 ? 
       (<EmptyState message="Nothing here yet" />)
        :
       (<UserList users={users} />)
      }
    </section>
  );
};

export default UsersPage;