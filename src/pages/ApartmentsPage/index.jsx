import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./apartments.module.scss";
import BreadCrumbs from "../../components/BreadCrumbs";
import cross from "../../assets/images/cross.png";
import { useSelector } from "react-redux";
import clsx from "clsx";
// import { useState } from "react";

const Apartments = () => {
  const location = useLocation();

  const apartments = useSelector((state) => state.data.apartments);

  const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState("");

  const checkbox = (el) => {
    setSelected(el);
    setData(
      apartments.filter((item) =>
        el === "Недорогие"
          ? item.costMin < 30
          : el === "1-комнатные"
          ? item.rooms === 1
          : el === "2-комнатные"
          ? item.rooms === 2
          : el === "3-комнатные"
          ? item.rooms === 3
          : el === "4-комнатные"
          ? item.rooms === 4
          : el === "5-комнатные"
          ? item.rooms === 5
          : ""
      )
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ height: "319px", position: "relative" }}>
        <div className={styles.background}></div>
        <div className={styles.container_1}>
          <BreadCrumbs
            crumbSubTitle={`Квартиры в ${
              location.pathname === "/apartments/Minsk"
                ? "Минске"
                : location.pathname === "/apartments/Gomel"
                ? "Гомеле"
                : location.pathname === "/apartments/Brest"
                ? "Бресте"
                : location.pathname === "/apartments/Vitebsk"
                ? "Витебске"
                : location.pathname === "/apartments/Grodno"
                ? "Гродно"
                : "Могилеве"
            }`}
          />
          <h1
            style={{
              margin: selected === "" ? "30px 0px 40px" : "30px 0px 15px",
            }}
          >
            Аренда квартир на сутки в{" "}
            {location.pathname === "/apartments/Minsk"
              ? "Минске"
              : location.pathname === "/apartments/Gomel"
              ? "Гомеле"
              : location.pathname === "/apartments/Brest"
              ? "Бресте"
              : location.pathname === "/apartments/Vitebsk"
              ? "Витебске"
              : location.pathname === "/apartments/Grodno"
              ? "Гродно"
              : "Могилеве"}
          </h1>
          {selected === "" ? (
            <div>
              <p className={styles.subtitle}>Рекомендуем посмотреть</p>
              <div>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Недорогие
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  1-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  2-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  3-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  4-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  5-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Заводской р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Ленинский р.{" "}
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Московский р.{" "}
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Октябрьский р.{" "}
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Партизанский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Первомайский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Советский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Фрунзенский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e) => checkbox(e.target.outerText)}
                >
                  Центральный р.
                </button>
              </div>
            </div>
          ) : (
            <button
              className={clsx(styles.checkbox, styles.checkbox_active)}
              onClick={() => setSelected("")}
            >
              {selected}
              <img src={cross} alt="cross-img" style={{ marginLeft: "10px" }} />
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Apartments;
