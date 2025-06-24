# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


2 ШАГ
Создать UserListCard для отображения информации об одном пользователе.
Создать UserList для отображения списка UserListCard.
Создать CarCard для отображения информации об одном автомобиле.
Создать CarList для отображения списка CarCard.
Интегрировать UserList и CarList в App.jsx.

Согласно ТЗ, нам нужны следующие страницы:

UsersPage.jsx + (/users) - для списка пользователей.
CarsPage.jsx (/cars) - для списка всех автомобилей.
CarDetailsPage.jsx (/cars/:id) - для деталей конкретного автомобиля.
AddCarPage.jsx (/cars/add) - для добавления нового автомобиля.
LoginPage.jsx (/login) - (опционально, мы сделаем это позже, если потребуется).