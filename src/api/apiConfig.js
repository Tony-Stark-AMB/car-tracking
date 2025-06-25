const BASE_URL = "https://6198b49a164fa60017c23190.mockapi.io/api";

export const API_ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  CARS: `${BASE_URL}/cars`,
  USER_CARS: (userId) => `${BASE_URL}/users/${userId}/cars`,
  CAR_DETAILS: (carId) => `${BASE_URL}/cars/${carId}`,
  USER_DETAILS: (userId) => `${BASE_URL}/users/${userId}`,
}