import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Card from "../../components/Card";

import chevron from "../../assets/images/chevron.png";
import more from "../../assets/images/more.png";
import geoPurple from "../../assets/images/geoPurple.png";
import gaps from "../../assets/images/gaps.png";
import gapsWhite from "../../assets/images/gaps_2.png";
import metro from "../../assets/images/metro.png";
import checkMark from "../../assets/images/checkMark.png";
import glare from "../../assets/images/glare.png";
import checkMarkRight from "../../assets/images/checkMark_right.png";
import AdFree from "../../assets/images/AD_Free.png";
import orchid from "../../assets/images/orchid.png";
import AdUp from "../../assets/images/AD_Up.png";
import geoYellow from "../../assets/images/geoYellow.png";

import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../../store/slices/searchApartmentsSlice";

import { IState } from "types/IState";

import clsx from "clsx";

import { motion } from "framer-motion";
import styles from "./main.module.scss";

const Main = () => {
  const [style, setStyle] = useState("one");

  const [data, setData] = useState({
    city: undefined,
    rooms: undefined,
    costMin: undefined,
    costMax: undefined,
  });

  const [selectIsOpen, setSelectIsOpen] = useState({
    selectCity: false,
    selectRooms: false,
    selectMetro: false,
    selectDistrict: false,
  });

  const [nameSelect, setNameSelect] = useState({
    city: "Выберите",
    rooms: "Выберите",
    metro: "Метро",
    district: "Район",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const cityRef = useRef<null | HTMLDivElement>(null);
  const roomsRef = useRef<null | HTMLDivElement>(null);
  const metroRef = useRef<null | HTMLDivElement>(null);
  const districtRef = useRef<null | HTMLDivElement>(null);

  const news = useSelector((state: IState) => state.data.news);
  const apartments = useSelector((state: IState) => state.data.apartments);

  const selectValueFirst = (e: any) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectCity: !selectIsOpen.selectCity,
    }));
    setData((prev) => ({ ...prev, city: e.target.outerText }));
    setNameSelect((prev) => ({ ...prev, city: e.target.outerText }));
  };

  const selectValueSecond = (e: any) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectRooms: !selectIsOpen.selectRooms,
    }));
    setData((prev) => ({ ...prev, rooms: e.target.outerText }));
    setNameSelect((prev) => ({ ...prev, rooms: e.target.outerText }));
  };

  const setDropDown = (e: any) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectMetro: !selectIsOpen.selectMetro,
    }));
    setNameSelect((prev) => ({ ...prev, metro: e }));
  };
  const setDropDownTwo = (e: any) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectDistrict: !selectIsOpen.selectDistrict,
    }));
    setNameSelect((prev) => ({ ...prev, district: e }));
  };

  useEffect(() => {
    location.pathname === "/main" &&
      dispatch(setApartments({ searchedApartments: [] }));
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: any) => {
      if (!cityRef.current) return;
      if (!cityRef.current.contains(e.target)) {
        selectIsOpen.selectCity &&
          setSelectIsOpen((prev) => ({ ...prev, selectCity: false }));
      }
      if (!roomsRef.current) return;
      if (!roomsRef.current.contains(e.target)) {
        selectIsOpen.selectRooms &&
          setSelectIsOpen((prev) => ({ ...prev, selectRooms: false }));
      }
      if (!metroRef.current) return;
      if (!metroRef.current.contains(e.target)) {
        selectIsOpen.selectMetro &&
          setSelectIsOpen((prev) => ({ ...prev, selectMetro: false }));
      }
      if (!districtRef.current) return;
      if (!districtRef.current.contains(e.target)) {
        selectIsOpen.selectDistrict &&
          setSelectIsOpen((prev) => ({ ...prev, selectDistrict: false }));
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [selectIsOpen]);

  useLayoutEffect(() => {
    window.addEventListener("keyup", (e: any) => {
      if (e.key === "Escape") {
        selectIsOpen.selectCity &&
          setSelectIsOpen((prev) => ({ ...prev, selectCity: false }));
        selectIsOpen.selectRooms &&
          setSelectIsOpen((prev) => ({ ...prev, selectRooms: false }));
        selectIsOpen.selectMetro &&
          setSelectIsOpen((prev) => ({ ...prev, selectMetro: false }));
        selectIsOpen.selectDistrict &&
          setSelectIsOpen((prev) => ({ ...prev, selectDistrict: false }));
        window.removeEventListener("keyup", e);
      }
    });
  }, [selectIsOpen]);

  const dispatchSearchedApartments = () => {
    const filteredData = JSON.parse(JSON.stringify(data));
    dispatch(
      setApartments({
        searchedApartments: apartments.filter((entry: any) => {
          return (Object.keys(filteredData) as Array<keyof typeof data>).every(
            (key) => {
              if (key === "costMin" || key === "costMax") {
                if (key === "costMax") {
                  return entry["costMin"] <= data[key]!;
                } else if (key === "costMin") {
                  return entry[key] >= data[key]!;
                } else if (key === "costMin" && key === "costMax") {
                  return (
                    entry[key] >= data[key] && entry["costMin"] <= data[key]
                  );
                }
              } else return entry[key] == data[key];
            }
          );
        }),
      })
    );
    navigate(
      `/apartments/${
        data.city === "Минск"
          ? "Minsk"
          : data.city === "Гомель"
          ? "Gomel"
          : data.city === "Гродно"
          ? "Grodno"
          : data.city === "Могилев"
          ? "Mogilev"
          : "Brest"
      }`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
            Sdaem.by - у нас живут <span>ваши объявления</span>
          </h1>
          <ul className={styles.ul}>
            <li
              onClick={() => setStyle(style === "one" ? "one" : "one")}
              className={`main_li ${style === "one" ? `${styles.active}` : ""}`}
            >
              Квартиры на сутки
            </li>
            <li
              onClick={() => setStyle(style === "two" ? "two" : "two")}
              className={`main_li ${style === "two" ? `${styles.active}` : ""}`}
            >
              Коттеджи и усадьбы
            </li>
            <li
              onClick={() => setStyle(style == "three" ? "three" : "three")}
              className={`main_li ${
                style === "three" ? `${styles.active}` : ""
              }`}
            >
              Бани и сауны
            </li>
            <li
              onClick={() => setStyle(style == "four" ? "four" : "four")}
              className={`main_li ${
                style === "four" ? `${styles.active}` : ""
              }`}
            >
              Авто напрокат
            </li>
          </ul>
          <form className={styles.select}>
            <div className={clsx(styles["select_item"], styles.city)}>
              <p className={styles["select_item-title"]}>Город</p>
              <div>
                <div
                  className={
                    selectIsOpen.selectCity
                      ? `${styles["select-active"]}`
                      : `${styles.city}`
                  }
                  onClick={() =>
                    setSelectIsOpen((prev) => ({
                      ...prev,
                      selectCity: !selectIsOpen.selectCity,
                    }))
                  }
                >
                  <div className={styles["city-wrapper"]}>
                    {nameSelect.city}
                    <img src={checkMark} alt="checkmark-img" />
                  </div>
                </div>
                <div
                  ref={cityRef}
                  style={{ position: "relative", left: "0" }}
                  className={
                    selectIsOpen.selectCity
                      ? `${styles["drop-down-active"]}`
                      : `${styles["drop-down-unactive"]}`
                  }
                >
                  <div>
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Минск
                    </p>
                  </div>
                  <div>
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Гомель
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Гродно
                    </p>
                  </div>
                  <div>
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Могилев
                    </p>
                  </div>
                  <div>
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Брест
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(styles["select_item"], styles.rooms)}>
              <p className={styles["select_item-title"]}>Комнаты</p>
              <div>
                <div
                  className={
                    selectIsOpen.selectRooms
                      ? `${styles["select-active"]}`
                      : `${styles.city}`
                  }
                  onClick={() =>
                    setSelectIsOpen((prev) => ({
                      ...prev,
                      selectRooms: !selectIsOpen.selectRooms,
                    }))
                  }
                >
                  <div className={styles["city-wrapper"]}>
                    {nameSelect.rooms}
                    <img src={checkMark} alt="checkMark-img" />
                  </div>
                </div>
                <div
                  ref={roomsRef}
                  style={{ position: "relative", left: "0" }}
                  className={
                    selectIsOpen.selectRooms
                      ? `${styles["drop-down-active"]}`
                      : `${styles["drop-down-unactive"]}`
                  }
                >
                  <div>
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueSecond(e)}
                    >
                      1
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueSecond(e)}
                    >
                      2
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueSecond(e)}
                    >
                      3
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p
                      className={styles["city-p"]}
                      onClick={(e) => selectValueSecond(e)}
                    >
                      4
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles["select_item"],
                styles["select_item_cost"]
              )}
            >
              <p className={styles["select_item-title"]}>Цена за сутки (BYN)</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  placeholder="От"
                  onChange={(e: any) =>
                    setData((prev) => ({ ...prev, costMin: e.target.value }))
                  }
                />
                -
                <input
                  type="number"
                  placeholder="До"
                  onChange={(e: any) =>
                    setData((prev) => ({ ...prev, costMax: e.target.value }))
                  }
                />
              </div>
            </div>
            <div
              className={styles["select_item"]}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className={styles.more}>
                Больше опций
                <img src={more} alt="more-img" />
              </div>
            </div>
            <div className={styles["select_item"]}>
              <div className={styles["more_two"]}>
                На карте
                <img
                  className="img_geo-purple"
                  src={geoPurple}
                  alt="geo-purple-img"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    data.city
                      ? dispatchSearchedApartments()
                      : alert("Укажите город");
                  }}
                >
                  Показать
                  <img src={checkMarkRight} alt="checkmarkRight-img" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.cards}>
          <section className={styles["container-2"]}>
            <div>
              <div className={styles["wrapper-2"]}>
                <div className={styles.apartment}>
                  <p className={styles["title-2"]}>Снять квартиру</p>
                  <p className={styles["subtitle-2"]}>Квартиры на сутки</p>
                  <ul className={styles["ul-2"]}>
                    <li onClick={() => navigate("/apartments/Minsk")}>Минск</li>
                    <li onClick={() => navigate("/apartments/Vitebsk")}>
                      Витебск
                    </li>
                    <li onClick={() => navigate("/apartments/Grodno")}>
                      Гродно
                    </li>
                    <li onClick={() => navigate("/apartments/Gomel")}>
                      Гомель
                    </li>
                    <li
                      onClick={() => navigate("/apartments/Brest")}
                      id={styles["li_brest"]}
                    >
                      Брест
                    </li>
                    <li onClick={() => navigate("/apartments/Mogilev")}>
                      Могилев
                    </li>
                  </ul>
                </div>
                <div
                  className={styles.cottages}
                  onClick={() => navigate("/cottagesList")}
                >
                  <p className={styles["title-2"]}>СНЯТЬ коттедж НА ПРАЗДНИК</p>
                  <p className={styles["subtitle-2"]}>Коттеджи и усадьбы</p>
                  <img
                    style={{ paddingLeft: "346px", marginTop: "20%" }}
                    src={chevron}
                    alt="chevron-img"
                  />
                </div>
              </div>
              <div
                className={styles["wrapper-2"]}
                style={{ marginTop: "30px" }}
              >
                <div
                  className={styles.bathHouse}
                  onClick={() => navigate("/bathHousesList")}
                >
                  <p className={styles["title-2"]}>
                    Попариться в бане с друзьями
                  </p>
                  <p className={styles["subtitle-2"]}>Бани и сауны</p>
                  <img
                    style={{ paddingLeft: "346px", marginTop: "20%" }}
                    src={chevron}
                    alt="chevron-img"
                  />
                </div>
                <div
                  className={styles.cars}
                  onClick={() => navigate("/carsList")}
                >
                  <p className={styles["title-2"]}>EСЛИ СРОЧНО НУЖНА МАШИНА</p>
                  <p className={styles["subtitle-2"]}>Авто на прокат</p>
                  <img
                    style={{
                      marginLeft: "88%",
                      marginTop: "16%",
                      padding: "0px",
                    }}
                    src={chevron}
                    alt="chevron-img"
                  />
                </div>
              </div>
              <img
                style={{
                  marginTop: "41px",
                  width: "61.19px",
                  height: "61.19px",
                  marginLeft: "-28px",
                }}
                src={gaps}
                alt="gaps-img"
              ></img>
            </div>
            <div className={styles.desc}>
              <div>
                <h2>Квартиры</h2>
                <p onClick={() => navigate("/apartments/Minsk")}>
                  Квартиры в Минске
                  <span>
                    {[...apartments].filter((el) => el.city === "Минск").length}
                  </span>
                </p>
                <p onClick={() => navigate("/apartments/Gomel")}>
                  Квартиры в Гомеле
                  <span>
                    {
                      [...apartments].filter((el) => el.city === "Гомель")
                        .length
                    }
                  </span>
                </p>
                <p onClick={() => navigate("/apartments/Grodno")}>
                  Квартиры в Гродно
                  <span>
                    {
                      [...apartments].filter((el) => el.city === "Гродно")
                        .length
                    }
                  </span>
                </p>
                <p onClick={() => navigate("/apartments/Mogilev")}>
                  Квартиры в Могилеве{" "}
                  <span>
                    {
                      [...apartments].filter((el) => el.city === "Могилев")
                        .length
                    }
                  </span>
                </p>
                <p onClick={() => navigate("/apartments/Brest")}>
                  Квартиры в Бресте
                  <span>
                    {[...apartments].filter((el) => el.city === "Брест").length}
                  </span>
                </p>
                <p onClick={() => navigate("/apartments/Vitebsk")}>
                  Квартиры в Витебске{" "}
                  <span>
                    {
                      [...apartments].filter((el) => el.city === "Город 6")
                        .length
                    }
                  </span>
                </p>
              </div>
              <div>
                <h2>Коттеджи и усадьбы</h2>
                <p>Агроусадьбы</p>
                <p>Коттеджи</p>
                <p>Загородный комплекс</p>
                <p>Базы отдыха</p>
                <select>
                  <option value="Еще">Еще</option>
                </select>
              </div>
              <div>
                <h2>Популярные направления</h2>
                <p>Коттеджи и усадьбы на о.Брасласких </p>
                <p>Коттеджи и усадьбы (жилье) на Нарочи</p>
                <p>Коттеджи и усадьбы (жилье) у воды, на берегу, на озере</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <section className={styles["container-3"]}>
        <div>
          <p className={styles["title-3"]}>Квартиры на сутки</p>
          <h3 className={styles["subtitle-3"]}>Аренда квартир в Минске</h3>

          <div className={styles["flat-Wrap"]}>
            <Card
              data={[...apartments]
                .slice(0, 3)
                .filter((item) => item.city == "Минск")}
            />
          </div>
          <div
            style={{
              position: "absolute",
              marginTop: "610px",
              display: "flex",
            }}
          >
            <div className={styles.offers}>
              <h1>
                {[...apartments].filter((el) => el.city === "Минск").length}{" "}
                <span>+</span>
              </h1>
              <p>Предложений по Минску</p>
            </div>
            <div
              style={{
                height: "70px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                className={styles["offers-button"]}
                onClick={() => navigate("/apartments/Minsk")}
              >
                Посмотреть все
                <img src={checkMarkRight} alt="checkMarkRight-img" />
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className={styles["wrapper-3"]}></div>
          <div className={styles["drop-down"]}>
            <div style={{ display: "flex" }}>
              <div
                className={styles["drop-down__item"]}
                onClick={() =>
                  setSelectIsOpen((prev) => ({
                    ...prev,
                    selectMetro: !selectIsOpen.selectMetro,
                  }))
                }
              >
                <div
                  className={styles["drop-down__item_wrap"]}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={metro} alt="metro-img" />
                  <p style={{ marginLeft: "8px" }}>{nameSelect.metro}</p>
                </div>
                <img
                  style={{ marginRight: "16px" }}
                  src={checkMark}
                  alt="checkmark-img"
                />
              </div>
              <div
                className={styles["drop-down__item"]}
                onClick={() =>
                  setSelectIsOpen((prev) => ({
                    ...prev,
                    selectDistrict: !selectIsOpen.selectDistrict,
                  }))
                }
              >
                <p className={styles["drop-down__item_wrap"]}>
                  {nameSelect.district}
                </p>
                <img
                  style={{ marginRight: "16px" }}
                  src={checkMark}
                  alt="checkmark-img"
                />
              </div>
            </div>
            <div
              ref={metroRef}
              className={
                selectIsOpen.selectMetro
                  ? `${styles["drop-down-active"]}`
                  : `${styles["drop-down-unactive"]}`
              }
            >
              <div>
                <p onClick={(e: any) => setDropDown(e.target.outerText)}>
                  Есть
                </p>
              </div>
              <div>
                <p onClick={(e: any) => setDropDown(e.target.outerText)}>Нет</p>
              </div>
            </div>
            <div
              ref={districtRef}
              className={
                selectIsOpen.selectDistrict
                  ? `${styles["drop-down-active"]}`
                  : `${styles["drop-down-unactive"]}`
              }
              style={{ left: "16em" }}
            >
              <div>
                <p onClick={(e: any) => setDropDownTwo(e.target.outerText)}>
                  Район 1
                </p>
              </div>
              <div>
                <p onClick={(e: any) => setDropDownTwo(e.target.outerText)}>
                  Район 2
                </p>
              </div>
              <div>
                <p onClick={(e: any) => setDropDownTwo(e.target.outerText)}>
                  Район 3
                </p>
              </div>
              <div>
                <p onClick={(e: any) => setDropDownTwo(e.target.outerText)}>
                  Район 4
                </p>
              </div>
            </div>
          </div>
          <div className={styles.chevrons}>
            <div>
              <img src={checkMark} alt="chevronNavigate-img" />
            </div>
            <div>
              {" "}
              <img src={checkMark} alt="chevronNavigate-img" />
            </div>
          </div>
        </div>
      </section>
      <section style={{ position: "relative" }}>
        <img
          style={{ position: "absolute", right: "140px", top: "46px" }}
          src={gapsWhite}
          alt="gaps_white-img"
        />
        <div className={styles["wrapper-4"]}>
          <div className={styles["background-2"]}>
            <div className={styles["search-desc"]}>
              <h3>Поиск квартир на карте</h3>
              <p>
                Ищите квартиры на сутки в центре города,
                <br /> возле парка или в живописном районе
              </p>
              <button>
                <div>
                  <img src={geoYellow} alt="geoYellow-img" />
                  <p>Открыть карту</p>
                </div>
              </button>
            </div>
          </div>
          <div className={styles["search-wrap"]}>
            <div className={styles["search-cards"]}>
              <div
                style={{
                  paddingLeft: "37px",
                  paddingTop: "27px",
                  paddingRight: "39px",
                }}
              >
                <div className={styles["search-cards-title"]}>
                  <div className={styles.circle}>
                    <img src={AdFree} alt="ad_free-img" />
                  </div>
                  <p>
                    Начните привлекать <br /> клиентов бесплатно!
                  </p>
                </div>
                <div className={styles["search-cards-desc"]}>
                  <p>
                    Пройдя простую регистрацию на сайте у Вас появится личный
                    кабинет, в котором возможно{" "}
                    <span>бесплатно создавать и публиковать </span>
                    объявления на сайте.
                  </p>
                </div>
                <button onClick={() => navigate("/rates")}>
                  + Разместить объявление
                </button>
              </div>
            </div>
            <div className={styles["search-cards"]}>
              <div
                style={{
                  paddingLeft: "37px",
                  paddingTop: "27px",
                  paddingRight: "39px",
                }}
              >
                <div className={styles["search-cards-title"]}>
                  <div className={styles.circle}>
                    <img src={AdUp} alt="AD_UP-img" />
                  </div>
                  <p>
                    Поднимайте <br /> объявления
                  </p>
                </div>
                <div className={styles["search-cards-desc"]}>
                  <p>
                    Вы в любое время можете <span>поднимать</span> объявления{" "}
                    <span>вверх первой страницы</span> каталога, они разместятся
                    сразу после платных объявлений до тех пор, пока другой
                    пользователь не повторит процедуру.
                  </p>
                </div>
                <button onClick={() => navigate("/rates")}>
                  <p>Узнать стоимость услуги</p>
                  <img
                    style={{ filter: "invert(1)" }}
                    src={checkMarkRight}
                    alt="checkMarkRight-img"
                  />
                </button>
              </div>
            </div>
            <div className={clsx(styles["search-cards"], styles.gold)}>
              <img
                src={glare}
                alt="glare-img"
                style={{
                  position: "absolute",
                  left: "134px",
                  top: "118px",
                  borderRadius: "0px 0px 10px",
                }}
              />
              <h2>Приоритет Gold</h2>
              <div
                style={{
                  paddingLeft: "37px",
                  paddingRight: "39px",
                }}
              >
                <div className={styles["gold-desc"]}>
                  <p>
                    Приоритетное размещение <span>Gold</span> позволяет{" "}
                    <span>закрепить ваше объявление</span> в верхней части
                    каталога!
                  </p>
                  <p>
                    Gold объявления <span>перемещаются каждые 5 мин</span> на 1
                    позицию, что делает размещение одинаковым для всех.
                  </p>
                </div>
                <button
                  id={styles["btn-purple"]}
                  onClick={() => navigate("/rates")}
                >
                  <p>Еще о тарифе Gold</p>
                  <img src={checkMarkRight} alt="checkMarkRight-img" />
                </button>
              </div>
            </div>
          </div>
          <img
            style={{
              position: "absolute",
              right: "165px",
              top: "705px",
            }}
            src={gaps}
            alt="gaps-img"
          />
        </div>
      </section>
      <section className={styles["container-4"]}>
        <div style={{ display: "flex" }}>
          <div>
            <p className={styles["title-4"]}>Что такое SDAEM.BY</p>
            <h3 className={styles["subtitle-4"]}>Квартира на сутки в Минске</h3>
            <div style={{ width: "842px", marginTop: "30px" }}>
              <div style={{ display: "flex", position: "relative" }}>
                <img src={orchid} alt="orchid_img" id={styles.orchid} />
                <img
                  style={{
                    position: "absolute",
                    marginTop: "181px",
                    marginLeft: "346px",
                  }}
                  src={gaps}
                  alt="gaps-img"
                />
                <div className={styles["desc-4"]}>
                  <p>
                    <span>Нужна квартира на сутки в Минске?</span> На веб-сайте
                    sdaem.by вас ждет масса выгодных предложений. Каталог
                    насчитывает <span>более 500 квартир.</span> Благодаря
                    удобной навигации вы быстро найдете подходящий вариант.
                  </p>
                  <p>
                    В каталоге представлены комфортабельные однокомнатные
                    квартиры на сутки и квартиры с большим количеством комнат в
                    разных районах города, с различной степенью удобства от
                    дешевых до VIP с джакузи.
                  </p>
                </div>
              </div>
              <p className={styles["desc-4-p"]}>
                Чтобы снять квартиру на сутки в Минске, вам достаточно
                определиться с выбором и связаться с владельцем для уточнения
                условий аренды и заключить договор. Заметим, на сайте
                представлены исключительно квартиры на сутки без посредников,
                что избавляет посетителей от необходимости взаимодействовать с
                агентствами, тратя свое время и деньги. Также пользователи сайта
                могут совершенно бесплатно размещать объявления о готовности
                сдать квартиру на сутки.{" "}
              </p>
            </div>
          </div>
          <div className={styles.news}>
            <div style={{ marginLeft: "23px" }}>
              <h2>Новости</h2>
              <div className={styles["news-desc"]}>
                {news &&
                  news.slice(0, 5).map((item) => (
                    <NavLink to={`/newsList/detail/${item.id}`} key={item.id}>
                      <h5>{item.title}</h5>
                      <p>{item.date}</p>
                    </NavLink>
                  ))}
              </div>
              <button onClick={() => navigate("/newsList")}>
                Посмотреть все <img src={checkMark} alt="checkMarkRight-img" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Main;
