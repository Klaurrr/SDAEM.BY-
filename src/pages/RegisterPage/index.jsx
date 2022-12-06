import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import BG from "./../../assets/images/BG.png";
import userGray from "./../../assets/images/userGray.png";
import lock from "./../../assets/images/lock.png";
import styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import email from "../../assets/images/email.png";
import captcha from "../../assets/images/recaptcha.jpg";
import clsx from "clsx";

const RegisterPage = () => {
  const navigateToLogin = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      setUser({ login: data.login, password: data.password, email: data.email })
    );
    localStorage.setItem("login", data.login);
    localStorage.setItem("password", data.password);

    navigateToLogin("/login");
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
          <h3>Регистрация</h3>
          <div style={{ display: "flex" }}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className={styles["input-wrapper"]}
                  style={{
                    border: errors.login && "2px solid red",
                  }}
                >
                  <img src={userGray} />
                  <input
                    type="name"
                    {...register("login", { required: true, minLength: 4 })}
                    placeholder={errors.login ? `Логин > 4 символов` : "Логин"}
                    onChange={() => clearErrors("login")}
                    autoComplete="on"
                  />
                </div>
                <div
                  className={styles["input-wrapper"]}
                  style={{
                    border: errors.email && "2px solid red",
                  }}
                >
                  <img src={email} style={{ opacity: "0.3" }} />
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                      minLength: 4,
                      maxLength: 30,
                    })}
                    style={{ paddingLeft: "17px" }}
                    onChange={() => clearErrors("email")}
                    placeholder={
                      errors.email ? `Почта > 4 символов` : "Электронная почта"
                    }
                    autoComplete="on"
                  />
                </div>
                <div
                  className={styles["input-wrapper"]}
                  style={{
                    border: errors.password && "2px solid red",
                  }}
                >
                  <img src={lock} style={{ opacity: "0.3" }} />
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 4,
                      maxLength: 30,
                    })}
                    style={{ paddingLeft: "20px" }}
                    onChange={() => clearErrors("password")}
                    placeholder={
                      errors.password ? `Пароль > 4 символов` : "Пароль"
                    }
                    autoComplete="on"
                  />
                </div>
                <div
                  className={styles["input-wrapper"]}
                  style={{
                    border: errors.repeatPass && "2px solid red",
                  }}
                >
                  <img src={lock} style={{ opacity: "0.3" }} />
                  <input
                    type="password"
                    {...register("repeatPass", {
                      required: true,
                      minLength: 4,
                      maxLength: 30,
                    })}
                    style={{ paddingLeft: "20px" }}
                    onChange={() => clearErrors("repeatPass")}
                    placeholder={
                      errors.repeatPass
                        ? `Повторите пароль`
                        : "Повторите пароль"
                    }
                    autoComplete="on"
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <div className={styles.captcha}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        {...register("checkbox", {
                          required: true,
                        })}
                      />
                      <p style={{ marginLeft: "15px" }}>Я не робот</p>
                    </div>
                    <img src={captcha} alt="reCaptcha" />
                  </div>
                  <p className={styles["captcha-desc"]}>
                    Конфиденциальность - Условия использования
                  </p>
                </div>

                <button className="login_page-btn" type="submit">
                  Зарегистрироваться
                </button>
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

{
  /* <p className={styles["create-acc"]}>
            Еще нет аккаунта? <span>Создайте аккаунт</span>
          </p> */
}
