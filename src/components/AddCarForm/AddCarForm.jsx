import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./AddCarForm.css";

const AddCarForm = ({ onSubmit, initialData = {}, users = [] }) => {
  const [carData, setCarData] = useState({
    manufacturer: "",
    model: "",
    color: "",
    price: "",
    vin: "",
    isNew: false,
    userId: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarData(prevData => ({
      ...prevData, 
      [name]: type === "checkbox" ? checked : value
    }));
    setErrors(prevErros => ({
      ...prevErros,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if(!carData.manufacturer.trim()){
      newErrors.manufacturer = "Manufacturer is required.";
      isValid = false;
    }

    if(!carData.model.trim()){
      newErrors.model = "Model is required.";
      isValid = false;
    }

    if(!carData.color.trim()){
      newErrors.color = "Color is required.";
      isValid = false;
    }

    if(!carData.price || isNaN(carData.price) || parseFloat(carData.price) <= 0){
      newErrors.price = "Price must be a postitive number.";
      isValid = false;
    }

    if(!carData.vin.trim()){
      newErrors.vin = "VIN is required.";
      isValid = false;
    } else if (carData.vin.trim().length !== 17){
      newErrors.vin = "VIN must be 17 charectars long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      if(onSubmit){
        onSubmit(carData);
      }
      setCarData({
        manufacturer: "",
        model: "",
        color: "",
        price: "",
        vin: "",
        isNew: false,
        userID: ""
      })
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h3>{initialData.id ? "Editing" : "Add New Car"}</h3>
      <Input 
        label="Manufacturer"
        id="manufacturer"
        name="manufacturer"
        value={carData.manufacturer}
        onChange={handleChange}
        placeholder="e.g., Mercedes Benz"
        required={true}
        error={errors.manufacturer}
      />
      <Input 
        label="Model"
        id="model"
        name="model"
        value={carData.model}
        onChange={handleChange}
        placeholder="e.g., CX-9"
        required={true}
        error={errors.model}
      />
      <Input 
        label="Color"
        id="color"
        name="color"
        value={carData.color}
        onChange={handleChange}
        placeholder="e.g., grey"
        required={true}
        error={errors.color}
      />
      <Input 
        label="price"
        id="price"
        name="price"
        value={carData.price}
        onChange={handleChange}
        placeholder="e.g., 880.69"
        required={true}
        error={errors.price}
      />
      <Input 
        label="VIN"
        id="vin"
        name="vin"
        value={carData.vin}
        onChange={handleChange}
        placeholder="e.g., G7NY4BL7JKT113509"
        required={true}
        error={errors.vin}
      />
      <div className="input-group">
        <label htmlFor="userId">Owner</label>
        <select 
          name="userId"
          id="userId"
          value={carData.userId}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select an owner (Optional)</option>
          {users.map(user => {
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          })}
        </select>
        {errors.userId && <p className="input-error-message">{errors.userId}</p>}
      </div>

      <div className="checkbox-group">
        <input 
          type="checkbox" 
          id="isNew"
          name="isNew"
          checked={carData.isNew}
          onChange={handleChange}
        />
        <label htmlFor="isNew">Is new</label>
      </div>
      <Button type="submit">{initialData.id ? "Save Changes" : "Submit"}</Button>
    </form>
  );
};

export default AddCarForm;