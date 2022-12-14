import React, { useLayoutEffect, useState, useEffect, HTMLAttributes } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import geoYellow from "../../assets/images/geoYellow.png";
import geoGray from "../../assets/images/geoGray.png";
import heart from "../../assets/images/heart.png";
import cat from "../../assets/images/cat.jpg";
import checkMark from "../../assets/images/checkMark.png";
import heartFilled from "../../assets/images/HeartFilled.png";

import { useSelector } from "react-redux";

import { IBookMarks } from "types/IBookMarks";

import styles from "./header.module.scss";

const Header = ({ isLoggedIn, setIsLoggedIn }: {isLoggedIn: boolean, setIsLoggedIn: (open: boolean) => void}) => {
  const [drop, setDrop] = useState(false);
  const [flatsValue, setFlatsValue] = useState("Квартиры на сутки");
  const [userDrop, setUserDrop] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const flats = useSelector((state: {bookMarks: IBookMarks}) => state.bookMarks.bookMarks);

  useEffect(() => {
    location.pathname === "/apartments/Minsk"
      ? setFlatsValue("Квартиры в Минске")
      : location.pathname === "/apartments/Gomel"
      ? setFlatsValue("Квартиры в Гомеле")
      : location.pathname === "/apartments/Brest"
      ? setFlatsValue("Квартиры в Бресте")
      : location.pathname === "/apartments/Vitebsk"
      ? setFlatsValue("Квартиры в Витебске")
      : location.pathname === "/apartments/Grodno"
      ? setFlatsValue("Квартиры в Гродно")
      : location.pathname === "/apartments/Mogilev"
      ? setFlatsValue("Квартиры в Могилеве")
      : setFlatsValue("Квартиры на сутки");
  }, [location.pathname]);

  useLayoutEffect(() => {
    window.addEventListener("keyup", (e: any) => {
      if (e.key === "Escape") {
        setDrop(false);
        setUserDrop(false);
        window.removeEventListener("keyup", e);
      }
    });
  });

  return (
    <header>
      <div className={styles["col-1"]}>
        <nav className={styles["col-1__nav-1"]}>
          <div>
            <NavLink
              style={({ isActive }): any =>
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
              style={({ isActive }): any =>
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
              style={({ isActive }): any =>
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
              style={({ isActive }): any =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                    }
                  : undefined
              }
              to="/ADS"
            >
              <img src={geoGray} alt="geo-gray-img" />
              Объявления на карте
            </NavLink>
          </div>
          <div>
            {" "}
            <NavLink
              style={({ isActive }): any =>
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
          <div style={{ marginLeft: "230px", position: "relative" }}>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #FFD54F",
                      paddingBottom: "9px",
                      marginRight: "0px",
                      position: "absolute",
                      top: "2px",
                      display: "flex",
                      alignItems: "center",
                    }
                  : {
                      marginRight: "0px",
                      position: "absolute",
                      top: "2px",
                      display: "flex",
                      alignItems: "center",
                    }
              }
              to="/bookMarks"
            >
              Закладки
              <img
                src={flats.length > 0 ? heartFilled : heart}
                alt="heart-img"
                className={styles.heart}
              />
            </NavLink>
          </div>
        </nav>

        <ul className={styles["col-1__ul-2"]}>
          {isLoggedIn ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setUserDrop(!userDrop)}
              >
                <img src={cat} className={styles.cat}></img>
                <p
                  className={styles.userName}
                  style={{
                    color: "#1E2123",
                    marginRight: "15px",
                    fontWeight: "500",
                  }}
                >
                  {localStorage.getItem("remember") === "true"
                    ? localStorage.getItem("login")
                    : JSON.parse(sessionStorage.getItem("login")!)}
                </p>
                <img src={checkMark}></img>
              </div>
              <div
                className={styles.userDrop}
                style={{ display: userDrop ? "flex" : "none" }}
              >
                <p
                  onClick={() => {
                    localStorage.removeItem("Logged");
                    sessionStorage.removeItem("Logged");
                    setUserDrop(false);
                    setIsLoggedIn(false);
                  }}
                >
                  Выйти
                </p>
              </div>
            </div>
          ) : (
            <li onClick={() => navigate("/login")}>Вход и регистрация</li>
          )}
        </ul>
      </div>
      <div className={styles["col-2"]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="logo-img"
            onClick={() => {
              navigate("/main");
              setFlatsValue("Квартиры на сутки");
            }}
            style={{ cursor: "pointer" }}
          />

          <nav>
            <div className={styles.linkWrap}>
              <div>
                <a
                  onClick={() => setDrop(!drop)}
                  style={
                    flatsValue != "Квартиры на сутки" &&
                    location.pathname.slice(0, 11) == "/apartments"
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

              <img src={geoYellow} alt="geo-yellow-img" />
            </div>
            <div className={styles.linkWrap}>
              <div>
                <NavLink
                  style={({ isActive }): any =>
                    isActive
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "18px",
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
                  style={({ isActive }): any =>
                    isActive
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "18px",
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
                  style={({ isActive }): any =>
                    isActive
                      ? {
                          borderBottom: "3px solid #FFD54F",
                          paddingBottom: "18px",
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
          <NavLink to="/apartments/Minsk" onClick={() => setDrop(false)}>
            Квартиры на сутки в Минске
          </NavLink>
          <NavLink to="/apartments/Gomel" onClick={() => setDrop(false)}>
            Квартиры на сутки в Гомеле
          </NavLink>
          <NavLink to="/apartments/Brest" onClick={() => setDrop(false)}>
            Квартиры на сутки в Бресте
          </NavLink>
          <NavLink to="/apartments/Vitebsk" onClick={() => setDrop(false)}>
            Квартиры на сутки в Витебске
          </NavLink>
          <NavLink to="/apartments/Grodno" onClick={() => setDrop(false)}>
            Квартиры на сутки в Гродно
          </NavLink>
          <NavLink to="/apartments/Mogilev" onClick={() => setDrop(false)}>
            Квартиры на сутки в Могилеве
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
