import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import BG from "./../../assets/images/BG.png";
import userLogin from "./../../assets/images/UserLogin.png";
import lock from "./../../assets/images/lock.png";
import styles from "./login.module.scss";
import { useForm } from "react-hook-form";
import clsx from "clsx";

const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  const navigateToHome = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setUser({ login: data.login, password: data.password }));
    navigateToHome("/main");
  };

  // const handleLogIn = (e) => {
  //   e.preventDefault();

  //   localStorage.setItem("isLoggedIn", true);
  //   localStorage.setItem("userName", login);

  //   dispatch(setUser({ login, password }));

  //   setIsLoggedIn(true);
  //   setUserName(login);
  //   navigateToHome("/main");
  // };

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
                  {...register("login", { required: true, minLength: 4 })}
                  placeholder={errors.login ? `Логин > 4 символов` : "Логин"}
                  onChange={(e) => {
                    // setLogin(e.target.value);
                    console.log(errors.login);
                    // errors.login = false;
                  }}
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
                    maxLength: 30,
                  })}
                  style={{ paddingLeft: "20px" }}
                  onChange={(e) => {
                    // setPassword(e.target.value);
                    errors.password = false;
                  }}
                  placeholder={
                    errors.password ? `Пароль > 4 символов` : "Пароль"
                  }
                />
              </div>
              <div className={styles["buttons-wrapper"]}>
                <div>
                  <label className={styles.checkbox}>
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
            Еще нет аккаунта? <span>Создайте аккаунт</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
