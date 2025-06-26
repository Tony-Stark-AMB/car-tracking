import React from "react";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const userName = "Tony Stark";
  const handleLogout = () => {
    console.log("logout btn clicked");
  };

  return (
    <header className="app-header">
      <div className="app-logo">CarTracker</div>
      <div className="user-info-header">
        <span>{userName}</span>
        <Button onClick={handleLogout}></Button>
      </div>
    </header>
  );
};

export default Header;