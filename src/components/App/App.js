import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";
import { useState } from "react";
import styles from "./app.module.scss";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
