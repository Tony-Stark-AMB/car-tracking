import React from "react";
import Button from "../Button/Button";
import "./EmptyState.css";

const EmptyState = ({message, showButton, buttonText, onButtonClick}) => {
  return (
    <div className="empty-state">
      <p>{message}</p>
      {showButton && (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      )}
    </div>
  );
};

export default EmptyState;