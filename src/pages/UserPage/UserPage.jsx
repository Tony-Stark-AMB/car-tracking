import React from "react";
import UserList from "@components/UserList/UserList";
import EmptyState from "@components/EmptyState/EmptyState";
import {MOCK_USERS} from "../../mock/data";

const UserPage = () => {
  const users = MOCK_USERS;

  return (
    <section className="users-section">
      <h2>Users</h2>
      {users.length == 0 ? 
       (<EmptyState message="Nothing here yet" />)
        :
       (<EmptyState users={users} />)
      }
    </section>
  );
};

export default UserPage;