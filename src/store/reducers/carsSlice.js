import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../api/apiConfig';

// Thunk для загрузки всех автомобилей
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.CARS);
      if (!response.ok) {
        throw new Error(`Failed to fetch cars: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для добавления нового автомобиля
export const addNewCar = createAsyncThunk(
  'cars/addNewCar',
  async (newCarData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.CARS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarData),
      });
      if (!response.ok) {
        throw new Error(`Failed to add car: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для обновления автомобиля
export const updateCar = createAsyncThunk(
  'cars/updateCar',
  async (updatedCarData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.CAR_DETAILS(updatedCarData.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCarData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update car: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для удаления автомобиля
export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (carId, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.CAR_DETAILS(carId), {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete a car by id: ${carId}. Status: ${response.status}`);
      }
      return carId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для загрузки автомобилей конкретного пользователя
export const fetchCarsByUserId = createAsyncThunk(
  'cars/fetchCarsByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER_CARS(userId));
      if (!response.ok) {
        throw new Error(`Failed to fetch cars for user ${userId}: ${response.statusText}`);
      }
      const data = await response.json();
      return { userId, cars: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// <--- НОВЫЙ Thunk для загрузки автомобиля по ID
export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (carId, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.CAR_DETAILS(carId));
      if (!response.ok) {
        throw new Error(`Failed to fetch car by ID ${carId}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    userCars: [],
    userCarsStatus: 'idle',
    userCarsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCars (все автомобили)
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // addNewCar
      .addCase(addNewCar.fulfilled, (state, action) => {
        state.list.push(action.payload);
        // Если добавлен автомобиль с userId, который совпадает с текущим userCars,
        // можно добавить его и сюда, но лучше переиспользовать fetchCarsByUserId для синхронизации
      })
      // updateCar
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.list.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        // Также обновить в userCars, если он там есть
        // const userCarIndex = state.userCars.findIndex(car => car.id === action.payload.id);
        // if (userCarIndex !== -1) {
        //   state.userCars[userCarIndex] = action.payload;
        // }
      })
      // deleteCar
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.list = state.list.filter(car => car.id !== action.payload);
        state.userCars = state.userCars.filter(car => car.id !== action.payload);
      })
      // fetchCarsByUserId
      .addCase(fetchCarsByUserId.pending, (state) => {
        state.userCarsStatus = 'loading';
      })
      .addCase(fetchCarsByUserId.fulfilled, (state, action) => {
        state.userCarsStatus = 'succeeded';
        state.userCars = action.payload.cars;
      })
      .addCase(fetchCarsByUserId.rejected, (state, action) => {
        state.userCarsStatus = 'failed';
        state.userCarsError = action.payload;
      })
      // <--- НОВЫЕ КЕЙСЫ ДЛЯ fetchCarById
      .addCase(fetchCarById.pending, (state) => {
        state.status = 'loading'; // Или можно использовать отдельный статус, если нужна детальная индикация
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Обновляем или добавляем один автомобиль в общий список
        const index = state.list.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          // Если по какой-то причине его не было в списке (например, прямая ссылка)
          state.list.push(action.payload);
        }
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;