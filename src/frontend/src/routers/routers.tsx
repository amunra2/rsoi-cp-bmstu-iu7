import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import MainPage from "../pages/main";
import ProfilePage from "../pages/profile";
import AboutPage from "../pages/about";
import ReservationsPage from "../pages/reservations";


export const router = createBrowserRouter([
  {
    path: "/login", 
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }, 
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "", element: <MainPage />},
      {path: "about", element: <AboutPage />},
      {path: "profile", element: <ProfilePage />},
      {path: "reservations", element: <ReservationsPage />},
    ]
  },
]);
