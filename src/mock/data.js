// src/mock/data.js

export const MOCK_USERS = [
  { id: '1', name: 'Cameron Konopelski', email: 'admin@mail.com' },
  { id: '2', name: 'Terri Jaskolski', email: 'Kavon_Nienow74@hotmail.com' },
  { id: '3', name: 'Bill Lesch', email: 'Daisy_Wolff@gmail.com' },
];

export const MOCK_CARS = [
  { id: 'c1', userId: '1', manufacturer: 'Ford', model: 'Mustang', year: 1999, color: 'Black', vin: '39VIT7U77526879967', price: 15000, isNew: false },
  { id: 'c2', userId: '1', manufacturer: 'Toyota', model: 'Corolla', year: 1998, color: 'Red', vin: '1VRIFBUV93785614798', price: 8000, isNew: false },
  { id: 'c3', userId: '2', manufacturer: 'Honda', model: 'Civic', year: 2005, color: 'Blue', vin: 'XYZ123ABC456DEF7890', price: 7500, isNew: false },
  { id: 'c4', userId: '3', manufacturer: 'BMW', model: 'X5', year: 2018, color: 'White', vin: 'QWE987RTY654UIO3210', price: 45000, isNew: true },
];