import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import HeaderLink from "components/HeaderLinks";

import logo from "assets/images/logo.png";
import cat from "assets/images/cat.jpg";
import icons from "assets/icons";
import chevrons from "assets/chevrons";

import styles from "./header.module.scss";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Logged") === "true"
      ? localStorage.getItem("Logged") === "true"
      : sessionStorage.getItem("Logged")
  );

  const [drop, setDrop] = useState(false);
  const [flatsValue, setFlatsValue] = useState("Квартиры на сутки");
  const [userDrop, setUserDrop] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [drop]);

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
        drop && setDrop(false);
        userDrop && setUserDrop(false);
        window.removeEventListener("keyup", e);
      }
    });
  }, [drop, userDrop]);

  return (
    <header>
      <div className={styles["col-1"]}>
        <nav className={styles["col-1__nav-1"]}>
          {["main", "newsList", "rates", "ADS", "contacts", "bookMarks"].map(
            (path) => (
              <HeaderLink
                path={path}
                style={
                  path === "bookMarks"
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
                        borderBottom: "3px solid #FFD54F",
                        paddingBottom: "9px",
                      }
                }
              />
            )
          )}
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
                <img src={chevrons.checkMarkPurple}></img>
              </div>
              {userDrop && (
                <div className={styles.userDrop}>
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
              )}
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

              <img src={icons.geoYellow} alt="geo-yellow-img" />
            </div>
            {["cottagesList", "bathHousesList", "carsList"].map((path) => (
              <div className={styles.linkWrap}>
                <HeaderLink
                  path={path}
                  style={{
                    borderBottom: "3px solid #FFD54F",
                    paddingBottom: "18px",
                  }}
                />
              </div>
            ))}
          </nav>
        </div>
        <button onClick={() => navigate("/rates")}>
          + Разместить объявление
        </button>
      </div>
      {drop && (
        <div ref={ref} className={styles.modalWindow}>
          <nav>
            {["Minsk", "Gomel", "Brest", "Vitebsk", "Grodno", "Mogilev"].map(
              (city) => (
                <NavLink
                  to={`/apartments/${city}`}
                  onClick={() => setDrop(false)}
                >
                  Квартиры на сутки в{" "}
                  {city === "Minsk"
                    ? "Минске"
                    : city === "Gomel"
                    ? "Гомеле"
                    : city === "Brest"
                    ? "Бресте"
                    : city === "Vitebsk"
                    ? "Витебске"
                    : city === "Grodno"
                    ? "Гродно"
                    : "Могилеве"}
                </NavLink>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
