import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../api/apiConfig";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async(_, {rejectWithValue}) => {
    try{
      const response = await fetch(API_ENDPOINTS.CARS);
      if(!response.ok){
        throw new Error("Failed to fetch cars");
      };
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addNewCar = createAsyncThunk(
  "cars/addNewCar",
  async(newCar, {rejectWithValue}) => {
    try{
      const response = await fetch(API_ENDPOINTS.CARS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      if(!response.ok){
        throw new Error("Failed to add new car");
      } 
      const data = await response.json();
      return data;
    } catch (err){
      return rejectWithValue(err.message);
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async(updateCar, {rejectWithValue}) => {
    try{
      const response = await fetch(API_ENDPOINTS.CAR_DETAILS(updateCar.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCar),
      });
      if(!response.ok){
        throw new Error(`Failed to update car ${updateCar.id}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async(carId, {rejectWithValue}) => {
    console.log(carId)
    try{
      const response = await fetch(API_ENDPOINTS.CAR_DETAILS(carId), {
        method: "DELETE",
      });
      if(!response.ok){
        throw new Error(`Failed to delete a car by id: ${carId}`)
      }
      return carId;
    } catch (err){
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCarsByUserId = createAsyncThunk(
  "cars/fetchCarsByUserId",
  async (userId, {rejectWithValue}) => {
    try{
      const response = await fetch(API_ENDPOINTS.USER_CARS(userId));
      if(!response.ok){
        throw new Error(`Failed to fetch cars for user ${userId} ${response.statusText}`);
      }
      const data = await response.json();
      return { userId, cars: data };
    } catch (err){
      return rejectWithValue(err.message);
    }
  }
)

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    userCars: [],
    userCarsStatus: "idle",
    userCarsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) =>{
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong while fetching cars";
      })
      .addCase(addNewCar.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNewCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addNewCar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add car";
      })
      .addCase(updateCar.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex(car => car.id === action.payload.id)
        if(index !== -1)
          state.list[index] = action.payload;
      })
      .addCase(updateCar.rejected, (status, action) =>{
        state.status = "failed";
        status.error = action.payload || "Failed to update car"; 
      })
      .addCase(deleteCar.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(car => car.id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete car";
      })
      .addCase(fetchCarsByUserId.pending, (state) => {
        state.usersarsStatus = "loading";
      })
      .addCase(fetchCarsByUserId.fulfilled, (state, action) => {
        state.userCarsStatus = "succeeded";
        state.userCars = action.payload.cars;
      })
      .addCase(fetchCarsByUserId.rejected, (state, action) => {
        state.usersCarsStatus = "failed";
        state.userСarsError = action.payload;
      });
  },
});

export default carsSlice.reducer;