import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import BG from "./../../assets/images/BG.png";
import userLogin from "./../../assets/images/UserLogin.png";
import lock from "./../../assets/images/lock.png";
import styles from "./login.module.scss";

const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigateToHome = useNavigate();
  const dispatch = useDispatch();

  const handleLogIn = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", login);

    dispatch(setUser({ login, password }));

    setIsLoggedIn(true);
    setUserName(login);
    navigateToHome("/main");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className={styles["background-color"]}>
        <div className={styles["form-wrapper"]}>
          <h3>Авторизация</h3>
          <p>
            Авторизируйтесь, чтобы начать <br /> публиковать свои объявления
          </p>
          <form onSubmit={handleLogIn}>
            <div className={styles["input-wrapper"]}>
              <img src={userLogin} />
              <input
                type="name"
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-wrapper"]}>
              <img src={lock} style={{ marginRight: "20px" }} />
              <input
                type="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
              />
            </div>

            <button className="login_page-btn" type="submit">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
