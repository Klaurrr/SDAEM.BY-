import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Layout } from "components/Layout/Layout";

import LoginPage from "pages/LoginPage";
import Main from "pages/MainPage";
import Apartments from "pages/ApartmentsPage";
import RegisterPage from "pages/RegisterPage";
import DetailPage from "pages/DetailPage";
import BookMarks from "pages/BookMarksPage";
import ContactsPage from "pages/ContactsPage";
import NewsPage from "pages/NewsPage";
import ErrorPage from "pages/ErrorPage";

import { AnimatePresence } from "framer-motion";
import styles from "./app.module.scss";

const App = () => {
  let location = useLocation();

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/register"
          ? null
          : styles.container
      }
    >
      <Layout>
        <AnimatePresence>
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/apartments/:city" element={<Apartments />} />
            <Route path="/newsList" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/newsList/detail/:id" element={<DetailPage />} />
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/bookMarks" element={<BookMarks />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </div>
  );
};

export default App;
