import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../api/apiConfig";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, {rejectWithValue}) => {
    try{
      const response = await fetch(API_ENDPOINTS.USERS);
      if(!response.ok){
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data;
    } catch (err){
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading",
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded",
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;