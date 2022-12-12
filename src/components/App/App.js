import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Main from "../Main";
import { useState, useRef } from "react";
import FlatsList from "../FlatsList";
import styles from "./app.module.scss";
import Header from "../Header";
import RegisterPage from "../../pages/RegisterPage";
import DetailPage from "../../pages/DetailPage";
import { ScaleLoader } from "react-spinners";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import NewsPage from "../../pages/NewsPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Logged") === "true"
      ? localStorage.getItem("Logged") === "true"
      : sessionStorage.getItem("Logged")
  );

  let location = useLocation();

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, [location]);

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/register"
          ? null
          : styles.container
      }
    >
      <div>
        {/* {loading ? (
          <div style={{ textAlign: "center", marginTop: "50vh" }}>
            <ScaleLoader color="#664EF9" height={25} width={5} />
          </div>
        ) : ( */}

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
            <Routes>
              <Route path="/main" element={<Main />} />
              <Route path="/flatsList" element={<FlatsList />} />
              <Route path="/NewsList" element={<NewsPage />} />
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
              <Route path="/newsList/detail/:id" element={<DetailPage />} />
              {/* <Route path="*" element={<Navigate to="/main" replace />} /> */}
            </Routes>
          </AnimatePresence>
        </>

        {/* )} */}
      </div>
    </div>
  );
};

export default App;
