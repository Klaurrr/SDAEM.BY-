import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import BG from "./../../assets/images/BG.png";
import userLogin from "./../../assets/images/UserLogin.png";
import lock from "./../../assets/images/lock.png";
import styles from "./login.module.scss";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useEffect } from "react";

const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  const navigateTo = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.setItem("Logged", false);
    localStorage.removeItem("remember");
  }, []);

  const [labelState, setLabelState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const logged = (data) => {
    navigateTo("/main");
    setIsLoggedIn(true);
    setUserName(data.login);
    labelState
      ? localStorage.setItem("Logged", true)
      : sessionStorage.setItem("Logged", true);
    localStorage.setItem("remember", labelState);
    sessionStorage.setItem("login", localStorage.getItem("login"));
  };

  const onSubmit = (data) => {
    localStorage.getItem("login") === data.login &&
      localStorage.getItem("password") === data.password &&
      logged(data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={styles["input-wrapper"]}
                style={{
                  border: errors.login && "2px solid red",
                }}
              >
                <img src={userLogin} />
                <input
                  type="name"
                  {...register("login", {
                    required: true,
                    minLength: 4,
                    validate: (value) =>
                      value === localStorage.getItem("login"),
                  })}
                  value={errors.login && ""}
                  placeholder={
                    errors.login ? `Логин не зарегестрирован` : "Логин"
                  }
                  onChange={() => clearErrors("login")}
                  autoсomplete="on"
                />
              </div>
              <div
                className={styles["input-wrapper"]}
                style={{
                  border: errors.password && "2px solid red",
                }}
              >
                <img src={lock} />
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 4,
                    validate: (value) =>
                      value === localStorage.getItem("password"),
                  })}
                  value={errors.password && ""}
                  style={{ paddingLeft: "20px" }}
                  onChange={() => clearErrors("password")}
                  placeholder={errors.password ? `Неверный пароль` : "Пароль"}
                  autoсomplete="on"
                />
              </div>
              <div className={styles["buttons-wrapper"]}>
                <div>
                  <label
                    className={styles.checkbox}
                    onChange={() => setLabelState(!labelState)}
                  >
                    <input type="checkbox" />
                    <span className={styles["checkbox-switch"]}></span>
                  </label>
                  <p>Запомнить меня</p>
                </div>
                <p className={styles["forgot-pass"]}>Забыли пароль?</p>
              </div>
              <button className="login_page-btn" type="submit">
                Войти
              </button>
            </div>
          </form>
          <p className={styles["create-acc"]}>
            Еще нет аккаунта?{" "}
            <span onClick={() => navigateTo("/register")}>
              Создайте аккаунт
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
