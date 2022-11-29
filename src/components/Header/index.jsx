import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import logo_1 from "../../assets/images/logo 1.png";
import geoYellow from "../../assets/images/geoYellow.png";
import geoGray from "../../assets/images/geoGray.png";
import heart from "../../assets/images/heart.png";
import styles from "./header.module.scss";
import { useState } from "react";

const Header = () => {
  const [drop, setDrop] = useState(false);
  const [flatsValue, setFlatsValue] = useState("Квартиры на сутки");

  const navigate = useNavigate();

  return (
    <header>
      <div className={styles["col-1"]}>
        <nav className={styles["col-1__nav-1"]}>
          <div>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                    }
                  : undefined
              }
              to="/main"
              onClick={() => setFlatsValue("Квартиры на сутки")}
            >
              Главная
            </NavLink>
          </div>
          <div>
            {" "}
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                    }
                  : undefined
              }
              to="/newsList"
            >
              Новости
            </NavLink>
          </div>
          <div>
            {" "}
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                    }
                  : undefined
              }
              to="/rates"
            >
              Размещение и тарифы
            </NavLink>
          </div>
          <div>
            {" "}
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                    }
                  : undefined
              }
              to="/ADS"
            >
              <img src={geoGray} alt="geo-gray" />
              Объявления на карте
            </NavLink>
          </div>
          <div>
            {" "}
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                    }
                  : undefined
              }
              to="/contacts"
            >
              Контакты
            </NavLink>
          </div>
        </nav>
        <ul className={styles["col-1__ul-2"]}>
          <li className={styles.heart}>
            Закладки
            <img src={heart} alt="heart" />
          </li>
          <li>Вход и регистрация</li>
        </ul>
      </div>
      <div className={styles["col-2"]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo_1}
            alt="logo"
            onClick={() => {
              navigate("/main");
            }}
            style={{ cursor: "pointer" }}
          />

          <nav>
            <div className={styles.linkWrap}>
              <div>
                <a
                  onClick={() => setDrop(!drop)}
                  style={
                    flatsValue != "Квартиры на сутки"
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "18px",
                        }
                      : undefined
                  }
                >
                  {flatsValue}
                </a>
              </div>

              <img src={geoYellow} alt="geo-yellow" />
            </div>
            <div className={styles.linkWrap}>
              <div>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "19px",
                        }
                      : undefined
                  }
                  to={"/cottagesList"}
                >
                  Коттеджи и усадьбы
                </NavLink>
              </div>
            </div>
            <div className={styles.linkWrap}>
              <div>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "19px",
                        }
                      : undefined
                  }
                  to={"/bathHousesList"}
                >
                  Бани и сауны
                </NavLink>
              </div>
            </div>
            <div className={styles.linkWrap}>
              <div>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "19px",
                        }
                      : undefined
                  }
                  to={"/carsList"}
                >
                  Авто напрокат{" "}
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
        <button>+ Разместить объявление</button>
      </div>
      <div
        className={styles.modalWindow}
        style={drop ? { display: "block" } : { display: "none" }}
      >
        <nav>
          <NavLink
            to="/flatsList"
            onClick={() => {
              setFlatsValue("Квартиры в Минске");
              setDrop(false);
            }}
          >
            Квартиры на сутки в Минске
          </NavLink>
          <NavLink
            to="#"
            onClick={() => {
              setFlatsValue("Квартиры в Гомеле");
              setDrop(false);
            }}
          >
            Квартиры на сутки в Гомеле
          </NavLink>
          <NavLink
            to="#"
            onClick={() => {
              setFlatsValue("Квартиры в Бресте");
              setDrop(false);
            }}
          >
            Квартиры на сутки в Бресте
          </NavLink>
          <NavLink
            to="#"
            onClick={() => {
              setFlatsValue("Квартиры в Витебске");
              setDrop(false);
            }}
          >
            Квартиры на сутки в Витебске
          </NavLink>
          <NavLink
            to="#"
            onClick={() => {
              setFlatsValue("Квартиры в Гродно");
              setDrop(false);
            }}
          >
            Квартиры на сутки в Гродно
          </NavLink>
          <NavLink
            to="#"
            onClick={() => {
              setFlatsValue("Квартиры в Могилеве");
              setDrop(false);
            }}
          >
            Квартиры на сутки в Могилеве
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
