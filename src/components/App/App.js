import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Main from "../../pages/MainPage";
import { useState, useRef } from "react";
import Apartments from "../../pages/ApartmentsPage";
import styles from "./app.module.scss";
import Header from "../Header";
import RegisterPage from "../../pages/RegisterPage";
import DetailPage from "../../pages/DetailPage";
import { AnimatePresence } from "framer-motion";
import NewsPage from "../../pages/NewsPage";
import ErrorPage from "../../pages/ErrorPage";
import Footer from "../Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Logged") === "true"
      ? localStorage.getItem("Logged") === "true"
      : sessionStorage.getItem("Logged")
  );

  let location = useLocation();

  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/register"
          ? null
          : styles.container
      }
    >
      <div>
        <>
          {location.pathname != "/login" &&
            location.pathname != "/register" &&
            location.pathname != "/" && (
              <Header
                userName={userName}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          <AnimatePresence>
            <Routes path="/">
              <Route default path="main" element={<Main />} />
              <Route path="apartments/:city" element={<Apartments />} />
              <Route path="newsList" element={<NewsPage />} />
              <Route
                path="login"
                element={
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                }
              />
              <Route path="register" element={<RegisterPage />} />
              <Route path="newsList/detail/:id" element={<DetailPage />} />
              <Route path="/" element={<Navigate to="/main" replace />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AnimatePresence>
          {location.pathname != "/login" &&
            location.pathname != "/register" &&
            location.pathname != "/" && <Footer />}
        </>
      </div>
    </div>
  );
};

export default App;
