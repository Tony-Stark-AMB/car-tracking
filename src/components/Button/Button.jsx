import React from "react";
import "./Button.css";

const Button = ({type="button", children, onClick, className = "" }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;