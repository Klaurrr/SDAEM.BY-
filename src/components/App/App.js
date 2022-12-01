import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";

import { useState } from "react";
import FlatsList from "../FlatsList";
import styles from "./app.module.scss";
import Header from "../Header";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  let location = useLocation();

  // useEffect(() => {
  //   console.log("локал стордж поменялся");
  // }, [localStorage.getItem("isLoggedIn")]);

  // if (location.pathname === "/login") {
  //   localStorage.setItem("isLoggedIn", "false");
  // }

  return (
    <div className={location.pathname === "/login" ? null : styles.container}>
      <div>
        {location.pathname != "/login" && <Header />}
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
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
