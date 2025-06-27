import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../api/apiConfig";

const HARDCODED_SPECIAL_EMAIL = 'dima.stetse.vac@gmail.com';
const HARDCODED_SPECIAL_USER = {
  id: '500', // Уникальный ID для этого пользователя
  name: 'Dima', // Ваше имя или никнейм
  email: HARDCODED_SPECIAL_EMAIL,
  // Можете добавить любые другие поля, которые ожидаются от пользователя
  // Например: phone: '123-456-7890', avatar: 'https://example.com/avatar.jpg'
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async(credentials, {rejectWithValue}) => {
    try {
      const { email } = credentials;
      if (email === HARDCODED_SPECIAL_EMAIL) {
        console.log("Logging in with hardcoded special email.");
        return HARDCODED_SPECIAL_USER; // Возвращаем предопределенного пользователя
      }
      // 1. Запрос всех пользователей
      const response = await fetch(API_ENDPOINTS.USERS);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const users = await response.json();

      // 2. Ищем пользователя по email (предполагаем, что credentials содержит email)
      const foundUser = users.find(user => user.email === email);

      if (foundUser) {
        // В реальном приложении здесь бы проверялся пароль
        return foundUser; // Возвращаем найденного пользователя
      } else {
        // Если пользователь не найден по email
        return rejectWithValue('Invalid email or user not found');
      }
    } catch (error) {
      // Обработка сетевых ошибок или других исключений
      return rejectWithValue(error.message || 'An unknown error occurred during login');
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null, 
    isAuthenticated: false, 
    authStatus: 'idle', 
    authError: null, 
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.authStatus = 'idle';
      state.authError = null;
      localStorage.removeItem('currentUser');
    },
    loadUserFromLocalStorage: (state) => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          state.currentUser = user;
          state.isAuthenticated = true;
          state.authStatus = 'succeeded';
        }
      } catch (err) {
        console.error("Failed to load user from local storage:", err);
        state.currentUser = null;
        state.isAuthenticated = false;
        state.authStatus = 'idle';
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authStatus = 'loading';
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = 'succeeded';
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.authError = null;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authStatus = 'failed';
        state.isAuthenticated = false;
        state.currentUser = null;
        state.authError = action.payload || 'Login failed: An unknown error occurred.'; // Сообщение об ошибке
        localStorage.removeItem('currentUser'); // Убедимся, что данные удалены при неудаче
      });
  },
});

// Экспортируем actions для использования в компонентах
export const { logout, loadUserFromLocalStorage } = authSlice.actions;

// Экспортируем редюсер по умолчанию
export default authSlice.reducer;