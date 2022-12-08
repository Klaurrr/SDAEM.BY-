import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";

import { useEffect, useState } from "react";
import FlatsList from "../FlatsList";
import styles from "./app.module.scss";
import Header from "../Header";
import RegisterPage from "../../pages/RegisterPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Logged") === "true"
      ? localStorage.getItem("Logged") === "true"
      : sessionStorage.getItem("Logged")
  );

  console.log(isLoggedIn);

  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  let location = useLocation();

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/register"
          ? null
          : styles.container
      }
    >
      <div>
        {location.pathname != "/login" &&
          location.pathname != "/register" &&
          location.pathname != "/" && (
            <Header userName={userName} isLoggedIn={isLoggedIn} />
          )}
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/flatsList" element={<FlatsList />} />
          <Route
            path="/login"
            element={
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="*" element={<Navigate to="/main" replace />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
