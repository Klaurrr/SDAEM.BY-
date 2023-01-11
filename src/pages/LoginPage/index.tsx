import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import BG from "./../../assets/images/BG.png";
import userLogin from "./../../assets/images/UserLogin.png";
import lock from "./../../assets/images/lock.png";
import alert from "../../assets/images/alert.png";

import { IUser } from "types/IUser";

import { motion } from "framer-motion";
import styles from "./login.module.scss";


const LoginPage = ({ setIsLoggedIn, setUserName }: {setIsLoggedIn: (open: boolean) => void, setUserName: (open: string) => void}) => {
  const navigateTo = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.setItem("Logged", JSON.stringify(false));
    localStorage.removeItem("remember");
  }, []);

  const [labelState, setLabelState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IUser>();

  const logged = (data: IUser) => {
    navigateTo("/main");
    setIsLoggedIn(true);
    setUserName(data.login);
    labelState
      ? localStorage.setItem("Logged", JSON.stringify(true))
      : sessionStorage.setItem("Logged", JSON.stringify(true));
    localStorage.setItem("remember", JSON.stringify(labelState));
    sessionStorage.setItem("login", JSON.stringify(localStorage.getItem("login")));
  };

  const onSubmit = (data: IUser) => {
    localStorage.getItem("login") === data.login &&
      localStorage.getItem("password") === data.password &&
      logged(data);
  };

  return (
    <motion.div
      style={{
        backgroundImage: `url(${BG})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles["background-color"]}>
        <div className={styles["form-wrapper"]}>
          <h3>Авторизация</h3>
          <p>
            Авторизируйтесь, чтобы начать <br /> публиковать свои объявления
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                  autoComplete="on"
                />
                <img
                  src={alert}
                  alt="alert-img"
                  style={{ display: errors.login ? "block" : "none" }}
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
                  autoComplete="on"
                />
                <img
                  src={alert}
                  alt="alert-img"
                  style={{ display: errors.password ? "block" : "none" }}
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
    </motion.div>
  );
};

export default LoginPage;
