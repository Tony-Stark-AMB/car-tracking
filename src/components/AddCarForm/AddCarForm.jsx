import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./AddCarForm.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/reducers/usersSlice";

const AddCarForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.list);
  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error); 

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

  useEffect(() => {
    if(usersStatus == "idle" || usersStatus == "failed")
      dispatch(fetchUsers());
  }, [dispatch, usersStatus])

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarData(prevData => ({
      ...prevData, 
      [name]: type === "checkbox" ? checked : value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
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
        userId: ""
      })
    } else {
      console.log("Form has errors");
    }
  };

  if (usersStatus === 'loading') {
    return (
      <div className="add-car-form-status-message">
        <p>Loading users for owner selection...</p>
      </div>
    );
  }

  if (usersStatus === 'failed') {
    return (
      <div className="add-car-form-status-message error">
        <p className="error-message">Error loading users: {usersError || 'Unknown error'}</p>
        <p>Please try again later.</p>
      </div>
    );
  }


  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h3>{initialData.id ? "Edit Car" : "Add New Car"}</h3>
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
        type="number"
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
        {users.length > 0 ? (<select 
          name="userId"
          id="userId"
          value={carData.userId}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select an owner (Optional)</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        ) : (
          <p>No users avaliable. Please add users first.</p>
        )}
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
      <div className="form-actions"> 
        <Button type={"submit"}>{initialData.id ? "Save Changes" : "Add Car"}</Button>
        {onCancel && <Button  onClick={onCancel} className="button-secondary">Cancel</Button>}
      </div>
    </form>
  );
};

export default AddCarForm;