import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

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
    <div className="login_page">
      <form className="login_page-form" onSubmit={handleLogIn}>
        <input
          className="login_page-input-1"
          type="name"
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Имя"
          required
        />
        <input
          className="login_page-input-2"
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
  );
};

export default LoginPage;
