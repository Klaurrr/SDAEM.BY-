import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "./../../assets/images/BG.png";

import styles from "./login.module.scss";

const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigateToHome = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", login);

    setIsLoggedIn(true);
    setUserName(login);
    navigateToHome("/main");
  };

  return (
    <div style={{ backgroundImage: `url(${BG})`, height: "100vh" }}>
      <div className={styles["background-color"]}>
        <form onSubmit={handleLogIn}>
          <input
            type="name"
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Имя"
            required
          />
          <input
            type="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
          <button className="login_page-btn" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
