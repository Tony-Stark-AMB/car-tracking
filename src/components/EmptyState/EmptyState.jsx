import React from "react";
import "./EmptyState.css";

const EmptyState = ({message, children}) => {
  return (
    <div className="empty-state">
      <p>{message}</p>
      {children}
    </div>
  );
};

export default EmptyState;