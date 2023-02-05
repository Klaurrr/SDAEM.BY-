import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import DropDownButton from "components/DropDownButton";

import chevrons from "assets/chevrons";
import icons from "assets/icons";

import { IState } from "types/IState";
import { MainProps } from "types/TMainProps";

import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "store/slices/searchApartmentsSlice";

import clsx from "clsx";

import styles from "./main.module.scss";

type Data = {
  city?: string;
  rooms?: string;
  costMin?: string;
  costMax?: string;
};

const MainChoice: React.FC<MainProps> = ({ selectIsOpen, setSelectIsOpen }) => {
  const [style, setStyle] = useState("one");

  const [data, setData] = useState<Data>({
    city: undefined,
    rooms: undefined,
    costMin: undefined,
    costMax: undefined,
  });

  const [nameSelect, setNameSelect] = useState({
    city: "Выберите",
    rooms: "Выберите",
  });

  const cityRef = useRef<null | HTMLDivElement>(null);
  const roomsRef = useRef<null | HTMLDivElement>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const apartments = useSelector((state: IState) => state.data.apartments);

  const dispatchSearchedApartments = () => {
    const filteredData = JSON.parse(JSON.stringify(data));
    dispatch(
      setApartments({
        searchedApartments: apartments.filter((entry) => {
          return (Object.keys(filteredData) as Array<keyof typeof data>).every(
            (key) => {
              if (key === "costMin" || key === "costMax") {
                if (key === "costMax") {
                  return entry["costMin"] <= parseFloat(data[key]!);
                } else if (key === "costMin") {
                  return entry[key] >= parseFloat(data[key]!);
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

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (!cityRef.current) return;
      if (!cityRef.current.contains(target)) {
        selectIsOpen.selectCity &&
          setSelectIsOpen((prev) => ({ ...prev, selectCity: false }));
      }
      if (!roomsRef.current) return;
      if (!roomsRef.current.contains(target)) {
        selectIsOpen.selectRooms &&
          setSelectIsOpen((prev) => ({ ...prev, selectRooms: false }));
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [selectIsOpen]);

  const selectValueFirst = (e: string) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectCity: !selectIsOpen.selectCity,
    }));
    setData((prev) => ({ ...prev, city: e }));
    setNameSelect((prev) => ({ ...prev, city: e }));
  };

  const selectValueSecond = (e: string) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectRooms: !selectIsOpen.selectRooms,
    }));
    setData((prev) => ({ ...prev, rooms: e }));
    setNameSelect((prev) => ({ ...prev, rooms: e }));
  };

  return (
    <section className={styles.container_2}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Sdaem.by - у нас живут <span>ваши объявления</span>
        </h1>
        <ul className={styles.ul}>
          <li
            onClick={() => setStyle(style === "one" ? "one" : "one")}
            className={`main_li ${style === "one" && `${styles.active}`}`}
          >
            Квартиры на сутки
          </li>
          <li
            onClick={() => setStyle(style === "two" ? "two" : "two")}
            className={`main_li ${style === "two" && `${styles.active}`}`}
          >
            Коттеджи и усадьбы
          </li>
          <li
            onClick={() => setStyle(style == "three" ? "three" : "three")}
            className={`main_li ${style === "three" && `${styles.active}`}`}
          >
            Бани и сауны
          </li>
          <li
            onClick={() => setStyle(style == "four" ? "four" : "four")}
            className={`main_li ${style === "four" && `${styles.active}`}`}
          >
            Авто напрокат
          </li>
        </ul>
        <form className={styles.select}>
          <div className={clsx(styles.select_item, styles.city)}>
            <p className={styles["select_item-title"]}>Город</p>
            <div>
              <div
                className={
                  selectIsOpen.selectCity
                    ? `${styles.select_active}`
                    : `${styles.city}`
                }
                onClick={() =>
                  setSelectIsOpen((prev) => ({
                    ...prev,
                    selectCity: !selectIsOpen.selectCity,
                  }))
                }
              >
                <div className={styles.city_wrapper}>
                  {nameSelect.city}
                  <img src={chevrons.checkMarkPurple} alt="checkmark-img" />
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
                {["Минск", "Гомель", "Гродно", "Могилев", "Брест"].map(
                  (city) => (
                    <DropDownButton
                      text={city}
                      setState={(e: { target: { outerText: string } }) =>
                        selectValueFirst(e.target.outerText)
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className={clsx(styles.select_item, styles.rooms)}>
            <p className={styles["select_item-title"]}>Комнаты</p>
            <div>
              <div
                className={
                  selectIsOpen.selectRooms
                    ? `${styles.select_active}`
                    : `${styles.city}`
                }
                onClick={() =>
                  setSelectIsOpen((prev) => ({
                    ...prev,
                    selectRooms: !selectIsOpen.selectRooms,
                  }))
                }
              >
                <div className={styles.city_wrapper}>
                  {nameSelect.rooms}
                  <img src={chevrons.checkMarkPurple} alt="checkMark-img" />
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
                {["1", "2", "3", "4"].map((room) => (
                  <DropDownButton
                    text={room}
                    setState={(e: { target: { outerText: string } }) =>
                      selectValueSecond(e.target.outerText)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={clsx(styles.select_item, styles.select_item_cost)}>
            <p className={styles["select_item-title"]}>Цена за сутки (BYN)</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                placeholder="От"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData((prev) => ({ ...prev, costMin: e.target.value }))
                }
              />
              -
              <input
                type="number"
                placeholder="До"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData((prev) => ({ ...prev, costMax: e.target.value }))
                }
              />
            </div>
          </div>
          <div
            className={styles.select_item}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={styles.more}>
              Больше опций
              <img src={icons.more} alt="more-img" />
            </div>
          </div>
          <div className={styles.select_item}>
            <div className={styles.more_two}>
              На карте
              <img
                className="img_geo-purple"
                src={icons.geoPurple}
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
                <img src={chevrons.checkMarkWhite} alt="checkmarkRight-img" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.wrapper_2}>
        <div className={styles.cards}>
          <div>
            <div className={styles.cards_wrapper}>
              <div className={styles.apartment}>
                <p className={styles["title-2"]}>Снять квартиру</p>
                <p className={styles["subtitle-2"]}>Квартиры на сутки</p>
                <ul className={styles["ul-2"]}>
                  <li onClick={() => navigate("/apartments/Minsk")}>Минск</li>
                  <li onClick={() => navigate("/apartments/Vitebsk")}>
                    Витебск
                  </li>
                  <li onClick={() => navigate("/apartments/Grodno")}>Гродно</li>
                  <li onClick={() => navigate("/apartments/Gomel")}>Гомель</li>
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
                  src={chevrons.chevronWhite}
                  alt="chevron-img"
                />
              </div>
            </div>
            <div className={styles.cards_wrapper} style={{ marginTop: "30px" }}>
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
                  src={chevrons.chevronWhite}
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
                    margin: "16% 0px 0px 88%",
                    padding: "0px",
                  }}
                  src={chevrons.chevronWhite}
                  alt="chevron-img"
                />
              </div>
            </div>
            <img className={styles.gaps} src={icons.gaps} alt="gaps-img"></img>
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
                  {[...apartments].filter((el) => el.city === "Гомель").length}
                </span>
              </p>
              <p onClick={() => navigate("/apartments/Grodno")}>
                Квартиры в Гродно
                <span>
                  {[...apartments].filter((el) => el.city === "Гродно").length}
                </span>
              </p>
              <p onClick={() => navigate("/apartments/Mogilev")}>
                Квартиры в Могилеве{" "}
                <span>
                  {[...apartments].filter((el) => el.city === "Могилев").length}
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
                  {[...apartments].filter((el) => el.city === "Город 6").length}
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
            <div style={{ marginBottom: "0px" }}>
              <h2>Популярные направления</h2>
              <p>Коттеджи и усадьбы на о.Брасласких </p>
              <p>Коттеджи и усадьбы (жилье) на Нарочи</p>
              <p>Коттеджи и усадьбы (жилье) у воды, на берегу, на озере</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainChoice;
