import React from "react";

import { useNavigate } from "react-router-dom";

import gaps from "../../assets/images/gaps.png";
import gapsWhite from "../../assets/images/gaps_2.png";
import House from "../../assets/images/House.png";

import styles from "./error.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={gaps} alt="gaps-img" className={styles.gaps} />
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <h1>Ошибка 404</h1>
          <p>
            Возможно, у вас опечатка в адресе
            <br /> страницы, или её просто не существует
          </p>
          <button onClick={() => navigate("/main")}>
            <img src={House} alt="house-img" />
            <p>Вернуться на главную</p>
          </button>
        </div>
        <p className={styles.number}>404</p>
      </div>
      <img src={gapsWhite} alt="gapsWhite-img" className={styles.gaps_2} />
    </div>
  );
};

export default ErrorPage;
