import React from "react";
import "./Input.css";

const Input = ({label, id, type = "text", value, name, onChange, placeholder, required=false, error = ""}) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}{required && <span className="required-star">*</span>}</label>}
      <input 
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        className={`input-field ${error ? "input-error" :  ''}`}
      />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default Input;