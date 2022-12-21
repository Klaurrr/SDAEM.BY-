import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./apartments.module.scss";
import more from "../../assets/images/more.png";
import BreadCrumbs from "../../components/BreadCrumbs";
import cross from "../../assets/images/cross.png";
import checkMark from "../../assets/images/checkMark.png";
import checkMarkRight from "../../assets/images/checkMark_right.png";
import byDefault from "../../assets/images/byDefault.png";
import list from "../../assets/images/list.png";
import tiles from "../../assets/images/tiles.png";
import geoPurple from "../../assets/images/geoPurple.png";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import clsx from "clsx";

const Apartments = () => {
  const location = useLocation();

  const apartments = useSelector((state) => state.data.apartments);
  const searchedApartments = useSelector((state) => state.search);

  const [data, setData] = useState(undefined);

  const [selected, setSelected] = useState("");

  const [selectActive, setSelectActive] = useState(false);

  const [nameSelectRooms, setNameSelectRooms] = useState("Выберите");

  const [showApartments, setShowApartments] = useState("list");

  const [costMax, setCostMax] = useState(undefined);
  const [costMin, setCostMin] = useState(undefined);
  const [rooms, setRooms] = useState(undefined);
  const [city, setCity] = useState({
    city:
      location.pathname === "/apartments/Minsk"
        ? "Минск"
        : location.pathname === "/apartments/Gomel"
        ? "Гомель"
        : location.pathname === "/apartments/Brest"
        ? "Брест"
        : location.pathname === "/apartments/Vitebsk"
        ? "Витебск"
        : location.pathname === "/apartments/Grodno"
        ? "Гродно"
        : "Могилев",
  });

  useEffect(() => {
    searchedApartments.searchedApartments.length > 0 &&
      setData(searchedApartments.searchedApartments);
  }, []);

  useEffect(() => {
    setCity({
      city:
        location.pathname === "/apartments/Minsk"
          ? "Минск"
          : location.pathname === "/apartments/Gomel"
          ? "Гомель"
          : location.pathname === "/apartments/Brest"
          ? "Брест"
          : location.pathname === "/apartments/Vitebsk"
          ? "Витебск"
          : location.pathname === "/apartments/Grodno"
          ? "Гродно"
          : "Могилев",
    });
  }, [location.pathname]);

  const selectValue = (e) => {
    setSelectActive(selectActive ? false : true);
    setRooms({ rooms: e.target.outerText });
    setNameSelectRooms(e.target.outerText);
  };

  const createFinallyObj = (rooms, costMin, costMax) => {
    const finallyObj = Object.assign({}, rooms, costMin, costMax);
    setData(
      apartments.filter((el) => {
        {
          if (finallyObj.rooms && finallyObj.rooms !== "Выберите") {
            if (finallyObj.costMin && finallyObj.costMax) {
              return (
                city.city == el.city &&
                finallyObj.rooms == el.rooms &&
                finallyObj.costMin <= el.costMin &&
                finallyObj.costMax >= el.costMin
              );
            } else if (finallyObj.costMin) {
              return (
                finallyObj.rooms == el.rooms &&
                finallyObj.costMin <= el.costMin &&
                city.city == el.city
              );
            } else if (finallyObj.costMax) {
              return (
                finallyObj.rooms == el.rooms &&
                city.city == el.city &&
                finallyObj.costMax > el.costMin
              );
            } else return finallyObj.rooms == el.rooms && city.city == el.city;
          } else {
            if (finallyObj.costMin && finallyObj.costMax) {
              return (
                city.city == el.city &&
                finallyObj.costMin <= el.costMin &&
                finallyObj.costMax >= el.costMin
              );
            } else if (finallyObj.costMin) {
              return city.city == el.city && finallyObj.costMin <= el.costMin;
            } else if (finallyObj.costMax) {
              return city.city == el.city && finallyObj.costMax > el.costMin;
            } else return undefined;
          }
        }
      })
    );
  };

  const checkbox = (el) => {
    setSelected(el);
    setData(
      apartments.filter((item) =>
        el === "Недорогие"
          ? item.costMin < 30 && item.city == city.city
          : el === "1-комнатные"
          ? item.rooms === 1 && item.city == city.city
          : el === "2-комнатные"
          ? item.rooms === 2 && item.city == city.city
          : el === "3-комнатные"
          ? item.rooms === 3 && item.city == city.city
          : el === "4-комнатные"
          ? item.rooms === 4 && item.city == city.city
          : el === "5-комнатные"
          ? item.rooms === 5 && item.city == city.city
          : ""
      )
    );
  };

  useEffect(() => {
    console.log(data);
    // console.log(apartments);
  }, [data]);

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
              onClick={() => {
                setSelected("");
                setData(undefined);
              }}
            >
              {selected}
              <img src={cross} alt="cross-img" style={{ marginLeft: "10px" }} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.search}>
        <div>
          <div className={clsx(styles["select_item"], styles.rooms)}>
            <p className={styles["select_item-title"]}>Комнаты</p>
            <div style={{ position: "relative" }}>
              <div
                className={
                  selectActive ? `${styles["select-active"]}` : `${styles.city}`
                }
                onClick={() => setSelectActive(selectActive ? false : true)}
              >
                <div className={styles["city-wrapper"]}>
                  {nameSelectRooms}
                  <img src={checkMark} alt="checkMark" />
                </div>
              </div>
              <div
                className={
                  selectActive
                    ? `${styles["drop-down-active"]}`
                    : `${styles["drop-down-unactive"]}`
                }
              >
                <p className={styles["city-p"]} onClick={(e) => selectValue(e)}>
                  1 комн.
                </p>
                <p className={styles["city-p"]} onClick={(e) => selectValue(e)}>
                  2 комн.
                </p>
                <p className={styles["city-p"]} onClick={(e) => selectValue(e)}>
                  3 комн.
                </p>
                <p className={styles["city-p"]} onClick={(e) => selectValue(e)}>
                  4 комн.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "431px", display: "flex" }}>
          <div
            className={clsx(styles["select_item"], styles["select_item_cost"])}
            style={{ width: "100%" }}
          >
            <p className={styles["select_item-title"]}>Цена за сутки (BYN)</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="От"
                onChange={(e) =>
                  setCostMin({
                    costMin: e.target.value,
                  })
                }
              />
              -
              <input
                type="text"
                placeholder="До"
                onChange={(e) =>
                  setCostMax({
                    costMax: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div style={{ width: "187px" }}>
          <div className={styles["select_item"]}>
            <div className={styles.more}>
              Больше опций
              <img src={more} alt="more" />
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              setData(undefined);
              setCostMin(undefined);
              setCostMax(undefined);
              setRooms(undefined);
            }}
          >
            Очистить
          </button>
          <button
            onClick={() => {
              createFinallyObj(rooms, costMin, costMax);
              setTimeout(() => {
                setNameSelectRooms("Выберите");
              }, 10);
            }}
          >
            Показать объекты
            <img src={checkMarkRight} alt="checkMarkRight-img" />
          </button>
        </div>
      </div>
      <div className={styles.buttons_2}>
        <div className={styles.button_byDefault}>
          <img src={byDefault} alt="byDefault-img" />
          <p>По умолчанию</p>
          <img src={checkMark} alt="checkmark-png" />
        </div>
        <div
          className={clsx(
            styles.button_list,
            showApartments === "list" && styles.button_active
          )}
          onClick={() => setShowApartments("list")}
        >
          <img src={list} alt="list-img" />
          <p>Список</p>
        </div>
        <div
          className={clsx(
            styles.button_tiles,
            showApartments === "tiles" && styles.button_active
          )}
          onClick={() => setShowApartments("tiles")}
        >
          <img src={tiles} alt="tiles-img" />
          <p>Плитки</p>
        </div>
        <div className={styles.button_map}>
          <img src={geoPurple} alt="geoPurple-img" />
          <p>Показать на карте</p>
        </div>
      </div>
      <div>
        <h1>
          Найдено{" "}
          {data
            ? data.length
            : apartments.filter((item) => item.city === city.city).length}{" "}
          результата
        </h1>
        <div>
          {
            data ? (
              // data.map((item) => item.city)
              <Card data={[...data]} />
            ) : (
              <Card
                data={[...apartments].filter((item) => item.city === city.city)}
              ></Card>
            )
            // : apartments
            //     .filter((item) => item.city === city.city)
            //     .map((item) => (
            //       <>
            //         <p>{item.city}</p>
            //         <p>
            //           {item.costMin} - {item.costMax}
            //         </p>
            //       </>
            //     ))
          }
        </div>
      </div>
    </motion.section>
  );
};

export default Apartments;
