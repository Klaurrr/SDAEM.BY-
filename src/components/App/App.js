import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Main from "../Main";
import { useState } from "react";
import FlatsList from "../FlatsList";
import styles from "./app.module.scss";
import Header from "../Header";
import RegisterPage from "../../pages/RegisterPage";
import DetailPage from "../../pages/DetailPage";
import Mocks from "../Mocks";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Logged") === "true"
      ? localStorage.getItem("Logged") === "true"
      : sessionStorage.getItem("Logged")
  );

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
        <Mocks />
        {location.pathname != "/login" &&
          location.pathname != "/register" &&
          location.pathname != "/" && (
            <Header
              userName={userName}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        <Routes>
          <Route path="/main" element={<Main />} />
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
          <Route path="/detail/:id" element={<DetailPage />} />
          {/* <Route path="*" element={<Navigate to="/main" replace />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
