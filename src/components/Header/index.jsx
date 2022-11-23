import React from "react";
import logo_1 from "../../assets/images/logo 1.png";
import geoYellow from "../../assets/images/geoYellow.png";
import geoGray from "../../assets/images/geoGray.png";
import heart from "../../assets/images/heart.png";
import "./style.scss";

const Header = () => {
  return (
    <header>
      <div className="header-col-1">
        <ul className="col-1-ul-1">
          <li>Главная</li>
          <li>Новости</li>
          <li>Размещение и тарифы</li>
          <li>
            <img className="img_geo-gray" src={geoGray} alt="geo-gray" />
            Объявления на карте
          </li>
          <li>Контакты</li>
        </ul>
        <ul className="col-1-ul-2">
          <li id="li-heart">
            Закладки
            <img className="img_heart" src={heart} alt="heart" />
          </li>
          <li>Вход и регистрация</li>
        </ul>
      </div>
      <div className="header-col-2">
        <div>
          <img
            src={logo_1}
            alt="logo"
            onClick={() => window.location.reload()}
            style={{ cursor: "pointer" }}
          />
          <ul className="col-2-ul">
            <li>
              Квартира на сутки
              <img
                className="img_geo-yellow"
                src={geoYellow}
                alt="geo-yellow"
              />
            </li>
            <li>Коттеджи и усадьбы</li>
            <li>Бани и сауны</li>
            <li>Авто напрокат</li>
          </ul>
        </div>
        <button className="col-2-btn">+ Разместить объявление</button>
      </div>
    </header>
  );
};

export default Header;
