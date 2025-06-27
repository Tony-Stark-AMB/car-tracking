import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarById, updateCar } from '../../store/reducers/carsSlice';
import AddCarForm from '../../components/AddCarForm/AddCarForm'; 
import Button from '../../components/Button/Button';
import './EditCarPage.css';

const EditCarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const car = useSelector(state => state.cars.list.find(c => c.id === id));
  const carStatus = useSelector(state => state.cars.status);
  const carError = useSelector(state => state.cars.error);

  // Загружаем автомобиль для редактирования, если он еще не загружен
  useEffect(() => {
    if (!car && carStatus === 'idle') {
      dispatch(fetchCarById(id));
    }
    // Здесь больше не нужны usersStatus, usersError и dispatch(fetchUsers()),
    // так как AddCarForm теперь сама управляет загрузкой пользователей.
  }, [car, carStatus, dispatch, id]);

  const handleUpdateCarSubmit = (formData) => {
    dispatch(updateCar({ id, ...formData }))
      .unwrap()
      .then(() => {
        alert('Car updated successfully!');
        navigate(`/cars/${id}`);
      })
      .catch((error) => {
        alert(`Failed to update car: ${error}`);
      });
  };

  const handleCancel = () => {
    navigate(`/cars/${id}`);
  };

  // --- Логика отображения состояния загрузки автомобиля ---
  if (carStatus === 'loading') {
    return (
      <div className="edit-car-container">
        <h2>Loading Car...</h2>
        <p>Please wait.</p>
      </div>
    );
  }

  if (carStatus === 'failed') {
    return (
      <div className="edit-car-container">
        <h2>Error Loading Car</h2>
        <p className="error-message">Error: {carError || 'Failed to load car details.'}</p>
        <Button onClick={() => navigate('/cars')}>Back to Cars</Button>
      </div>
    );
  }

  // Пока car не загружен, не рендерим форму, чтобы initialData не был undefined
  if (!car) {
    return (
      <div className="edit-car-container">
        <h2>Car Not Found</h2>
        <p>The car with ID "{id}" does not exist or is still loading.</p>
        <Button onClick={() => navigate('/cars')}>Back to Cars</Button>
      </div>
    );
  }

  return (
    <div className="edit-car-container">
      <h2>Edit Car</h2>
      <AddCarForm
        onSubmit={handleUpdateCarSubmit}
        onCancel={handleCancel}
        initialData={car} // Передаем объект car как initialData
      />
    </div>
  );
};

export default EditCarPage;