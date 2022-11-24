import React from "react";
import logo_1 from "../../assets/images/logo 1.png";
import geoYellow from "../../assets/images/geoYellow.png";
import geoGray from "../../assets/images/geoGray.png";
import heart from "../../assets/images/heart.png";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles["col-1"]}>
        <ul className={styles["col-1__ul-1"]}>
          <li>Главная</li>
          <li>Новости</li>
          <li>Размещение и тарифы</li>
          <li>
            <img src={geoGray} alt="geo-gray" />
            Объявления на карте
          </li>
          <li>Контакты</li>
        </ul>
        <ul className={styles["col-1__ul-2"]}>
          <li className={styles.heart}>
            Закладки
            <img src={heart} alt="heart" />
          </li>
          <li>Вход и регистрация</li>
        </ul>
      </div>
      <div className={styles["col-2"]}>
        <div>
          <img
            src={logo_1}
            alt="logo"
            onClick={() => window.location.reload()}
            style={{ cursor: "pointer" }}
          />
          <ul className={styles["col-2__ul"]}>
            <li>
              Квартира на сутки
              <img src={geoYellow} alt="geo-yellow" />
            </li>
            <li>Коттеджи и усадьбы</li>
            <li>Бани и сауны</li>
            <li>Авто напрокат</li>
          </ul>
        </div>
        <button>+ Разместить объявление</button>
      </div>
    </header>
  );
};

export default Header;
