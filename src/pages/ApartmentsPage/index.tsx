import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import clsx from "clsx";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import BreadCrumbs from "../../components/BreadCrumbs";

import more from "../../assets/images/more.png";
import cross from "../../assets/images/cross.png";
import checkMark from "../../assets/images/checkMark.png";
import checkMarkRight from "../../assets/images/checkMark_right.png";
import byDefault from "../../assets/images/byDefault.png";
import list from "../../assets/images/list.png";
import listGray from "../../assets/images/listGray.png";
import tiles from "../../assets/images/tiles.png";
import tilesGray from "../../assets/images/tilesGray.png";
import geoPurple from "../../assets/images/geoPurple.png";
import vk from "../../assets/images/vk.png";
import whatsApp from "../../assets/images/whatsApp.png";
import viber from "../../assets/images/Viber.png";
import faceBook from "../../assets/images/Facebook.png";
import telegram from "../../assets/images/telegram.png";
import geoYellow from "../../assets/images/geoYellow.png";

import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../../store/slices/searchApartmentsSlice";

import { IState } from "types/IState";
import { IApartments } from "types/IApartments";

import { motion } from "framer-motion";
import styles from "./apartments.module.scss";

const Apartments = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const apartments = useSelector((state: IState) => state.data.apartments);
  const searchedApartments = useSelector((state: IState) => state.search);

  const [data, setData] = useState<IApartments[] | undefined>(undefined);

  const [apartmentsInfo, setApartmentsInfo] = useState({
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
    rooms: undefined,
    costMin: undefined,
    costMax: undefined,
  });

  const [filterData, setFilterData] = useState({
    selectActive: false,
    showOptions: false,
    nameSelect: "Выберите",
    costMinValue: "",
    costMaxValue: "",
    selected: "",
  });

  const [moreDetailInfo, setMoreDetailInfo] = useState({
    selectSleeping: "Выберите",
    selectDistrict: "Выберите",
    selectMetro: "Выберите",
    selectSleepActive: false,
    selectDistrictActive: false,
    selectMetroActive: false,
  });

  const [showApartments, setShowApartments] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);
  const [apartmentsPerPage, setApartmentsPerPage] = useState(4);

  const [sort, setSort] = useState(false);

  useEffect(() => {
    showApartments === "list"
      ? setApartmentsPerPage(4)
      : setApartmentsPerPage(9);
  }, [showApartments]);

  useEffect(() => {
    setApartmentsInfo((prev) => ({
      ...prev,
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
    }));
    setFilterData((prev) => ({ ...prev, selected: "", selectActive: false, nameSelect: 'Выберите' }))
    setData(undefined);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const lastApartmentsIndex = currentPage * apartmentsPerPage;
  const firstApartmentsIndex = lastApartmentsIndex - apartmentsPerPage;

  const selectValue = (e: any) => {
    setFilterData((prev) => ({
      ...prev,
      selectActive: !filterData.selectActive,
      nameSelect: e.target.outerText,
    }));
    setApartmentsInfo((prev) => ({
      ...prev,
      rooms: e.target.outerText.slice(0, 1),
    }));
  };

  const foundApartments = () => {
    setData(
      apartments.filter((el) => {
        {
          if (apartmentsInfo.rooms && apartmentsInfo.rooms !== "Выберите") {
            if (apartmentsInfo.costMin && apartmentsInfo.costMax) {
              return (
                apartmentsInfo.city == el.city &&
                apartmentsInfo.rooms == el.rooms &&
                apartmentsInfo.costMin <= el.costMin &&
                apartmentsInfo.costMax >= el.costMin
              );
            } else if (apartmentsInfo.costMin) {
              return (
                apartmentsInfo.rooms == el.rooms &&
                apartmentsInfo.costMin <= el.costMin &&
                apartmentsInfo.city == el.city
              );
            } else if (apartmentsInfo.costMax) {
              return (
                apartmentsInfo.rooms == el.rooms &&
                apartmentsInfo.city == el.city &&
                apartmentsInfo.costMax > el.costMin
              );
            } else
              return (
                apartmentsInfo.rooms == el.rooms &&
                apartmentsInfo.city == el.city
              );
          } else {
            if (apartmentsInfo.costMin && apartmentsInfo.costMax) {
              return (
                apartmentsInfo.city == el.city &&
                apartmentsInfo.costMin <= el.costMin &&
                apartmentsInfo.costMax >= el.costMin
              );
            } else if (apartmentsInfo.costMin) {
              return (
                apartmentsInfo.city == el.city &&
                apartmentsInfo.costMin <= el.costMin
              );
            } else if (apartmentsInfo.costMax) {
              return (
                apartmentsInfo.city == el.city &&
                apartmentsInfo.costMax > el.costMin
              );
            } else return undefined;
          }
        }
      })
    );
  };

  const checkbox = (el: string) => {
    setFilterData((prev) => ({ ...prev, selected: el, nameSelect: 'Выберите' }));
    setData(
      apartments.filter((item) =>
        el === "Недорогие"
          ? item.costMin < 30 && item.city == apartmentsInfo.city
          : el === "1-комнатные"
          ? item.rooms === 1 && item.city == apartmentsInfo.city
          : el === "2-комнатные"
          ? item.rooms === 2 && item.city == apartmentsInfo.city
          : el === "3-комнатные"
          ? item.rooms === 3 && item.city == apartmentsInfo.city
          : el === "4-комнатные"
          ? item.rooms === 4 && item.city == apartmentsInfo.city
          : el === "5-комнатные"
          ? item.rooms === 5 && item.city == apartmentsInfo.city
          : ""
      )
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ height: "319px", position: "relative" }}>
        <div className={styles.background}></div>
        <div className={styles.container}>
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
              margin:
                filterData.selected === "" ? "30px 0px 40px" : "30px 0px 15px",
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
          {filterData.selected === "" ? (
            <div>
              <p className={styles.subtitle}>Рекомендуем посмотреть</p>
              <div>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Недорогие
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  1-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  2-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  3-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  4-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  5-комнатные
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Заводской р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Ленинский р.{" "}
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Московский р.{" "}
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Октябрьский р.{" "}
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Партизанский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Первомайский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Советский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Фрунзенский р.
                </button>
                <button
                  className={styles.checkbox}
                  onClick={(e: any) => checkbox(e.target.outerText)}
                >
                  Центральный р.
                </button>
              </div>
            </div>
          ) : (
            <button
              className={clsx(styles.checkbox, styles.checkbox_active)}
              onClick={() => {
                setFilterData((prev) => ({ ...prev, selected: "" }));
                setData(undefined);
              }}
            >
              {filterData.selected}
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
                  filterData.selectActive
                    ? `${styles["select-active"]}`
                    : `${styles.city}`
                }
                onClick={() =>
                  setFilterData((prev) => ({
                    ...prev,
                    selectActive: !filterData.selectActive,
                  }))
                }
              >
                <div className={styles["city-wrapper"]}>
                  {filterData.nameSelect}
                  <img src={checkMark} alt="checkMark-img" />
                </div>
              </div>
              <div
                className={
                  filterData.selectActive
                    ? `${styles["drop-down-active"]}`
                    : `${styles["drop-down-unactive"]}`
                }
              >
                <div>
                  <p
                    className={styles["city-p"]}
                    onClick={(e) => selectValue(e)}
                  >
                    1 комн.
                  </p>
                </div>
                <div>
                  <p
                    className={styles["city-p"]}
                    onClick={(e) => selectValue(e)}
                  >
                    2 комн.
                  </p>
                </div>
                <div>
                  {" "}
                  <p
                    className={styles["city-p"]}
                    onClick={(e) => selectValue(e)}
                  >
                    3 комн.
                  </p>
                </div>
                <div>
                  <p
                    className={styles["city-p"]}
                    onClick={(e) => selectValue(e)}
                  >
                    4 комн.
                  </p>
                </div>
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
                onChange={(e:any) => {
                  setApartmentsInfo((prev) => ({
                    ...prev,
                    costMin: e.target.value,
                  }));
                  setFilterData((prev) => ({
                    ...prev,
                    costMinValue: e.target.value,
                  }));
                }}
                value={filterData.costMinValue}
              />
              -
              <input
                type="text"
                placeholder="До"
                onChange={(e:any) => {
                  setApartmentsInfo((prev) => ({
                    ...prev,
                    costMax: e.target.value,
                  }));
                  setFilterData((prev) => ({
                    ...prev,
                    costMaxValue: e.target.value,
                  }));
                }}
                value={filterData.costMaxValue}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "187px", cursor: 'pointer' }}>
          <div
            className={styles["select_item"]}
            onClick={() =>
              setFilterData((prev) => ({
                ...prev,
                showOptions: !filterData.showOptions,
              }))
            }
            style={{
              borderBottom: filterData.showOptions
                ? "2px solid #4E64F9"
                : "none",
            }}
          >
            <div className={styles.more}>
              Больше опций
              <img src={more} alt="more-img" />
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              setData(undefined);
              setApartmentsInfo((prev) => ({
                ...prev,
                rooms: undefined,
                costMax: undefined,
                costMin: undefined,
              }));
              setFilterData((prev) => ({
                ...prev,
                selected: "",
                nameSelect: "Выберите",
                costMinValue: "",
                costMaxValue: "",
              }));
              dispatch(
                setApartments({
                  searchedApartments: [],
                })
              );
            }}
          >
            Очистить
          </button>
          <button onClick={() => foundApartments()}>
            Показать объекты
            <img src={checkMarkRight} alt="checkMarkRight-img" />
          </button>
        </div>
      </div>
      <div
        className={styles.more_detail}
        style={{
          display: filterData.showOptions ? "block" : "none",
        }}
      >
        <div className={styles["more_detail-wrapper"]}>
          <div style={{ position: "relative", marginRight: "50px" }}>
            <p>Спальные места</p>
            <div
              className={
                moreDetailInfo.selectSleepActive
                  ? styles["detail_select-active"]
                  : styles.detail_select
              }
              onClick={() =>
                setMoreDetailInfo((prev) => ({
                  ...prev,
                  selectSleepActive: !moreDetailInfo.selectSleepActive,
                }))
              }
            >
              <p>{moreDetailInfo.selectSleeping}</p>
              <img src={checkMark} alt="checkMark-img" />
            </div>
            <div
              className={styles["detail_select_modal-window"]}
              style={{
                display: moreDetailInfo.selectSleepActive ? "block" : "none",
              }}
            >
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectSleepActive: false,
                    selectSleeping: e.target.outerText,
                  }))
                }
              >
                <p>1</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectSleepActive: false,
                    selectSleeping: e.target.outerText,
                  }))
                }
              >
                <p>2</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectSleepActive: false,
                    selectSleeping: e.target.outerText,
                  }))
                }
              >
                <p>3</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectSleepActive: false,
                    selectSleeping: e.target.outerText,
                  }))
                }
              >
                <p>4</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectSleepActive: false,
                    selectSleeping: e.target.outerText,
                  }))
                }
              >
                <p>5</p>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", marginRight: "50px" }}>
            <p>Район</p>
            <div
              className={
                moreDetailInfo.selectDistrictActive
                  ? styles["detail_select-active"]
                  : styles.detail_select
              }
              onClick={() =>
                setMoreDetailInfo((prev) => ({
                  ...prev,
                  selectDistrictActive: !moreDetailInfo.selectDistrictActive,
                }))
              }
            >
              <p>{moreDetailInfo.selectDistrict}</p>
              <img src={checkMark} alt="checkMark-img" />
            </div>
            <div
              className={styles["detail_select_modal-window"]}
              style={{
                display: moreDetailInfo.selectDistrictActive ? "block" : "none",
              }}
            >
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Заводской</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Ленинский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Московский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Октябрьский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Партизанский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Первомайский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Советский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Фрунзенский</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
                  }))
                }
              >
                <p>Центральный</p>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <p>Метро</p>
            <div
              className={
                moreDetailInfo.selectMetroActive
                  ? styles["detail_select-active"]
                  : styles.detail_select
              }
              onClick={() =>
                setMoreDetailInfo((prev) => ({
                  ...prev,
                  selectMetroActive: !moreDetailInfo.selectMetroActive,
                }))
              }
            >
              <p>{moreDetailInfo.selectMetro}</p>
              <img src={checkMark} alt="checkMark-img" />
            </div>
            <div
              className={styles["detail_select_modal-window"]}
              style={{
                display: moreDetailInfo.selectMetroActive ? "block" : "none",
              }}
            >
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectMetroActive: false,
                    selectMetro: e.target.outerText,
                  }))
                }
              >
                <p>Есть</p>
              </div>
              <div
                onClick={(e: any) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectMetroActive: false,
                    selectMetro: e.target.outerText,
                  }))
                }
              >
                <p>Нет</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["more_detail-wrapper-2"]}>
          <div>
            <div>
              <input
                type="checkbox"
                id="1"
                className={styles.custom_checkbox}
              />
              <label htmlFor="1">Газовая плита</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="2"
                className={styles.custom_checkbox}
              />
              <label htmlFor="2">Духовка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="3"
                className={styles.custom_checkbox}
              />
              <label htmlFor="3">Кофеварка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="4"
                className={styles.custom_checkbox}
              />
              <label htmlFor="4">Микроволновая печь</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="5"
                className={styles.custom_checkbox}
              />
              <label htmlFor="5">Посуда</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="6"
                className={styles.custom_checkbox}
              />
              <label htmlFor="6">Посудомоечная машина</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                id="7"
                className={styles.custom_checkbox}
              />
              <label htmlFor="7">Газовая плита</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="8"
                className={styles.custom_checkbox}
              />
              <label htmlFor="8">Духовка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="9"
                className={styles.custom_checkbox}
              />
              <label htmlFor="9">Кофеварка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="10"
                className={styles.custom_checkbox}
              />
              <label htmlFor="10">Микроволновая печь</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="11"
                className={styles.custom_checkbox}
              />
              <label htmlFor="11">Посуда</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="12"
                className={styles.custom_checkbox}
              />
              <label htmlFor="12">Посудомоечная машина</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                id="13"
                className={styles.custom_checkbox}
              />
              <label htmlFor="13">Газовая плита</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="14"
                className={styles.custom_checkbox}
              />
              <label htmlFor="14">Духовка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="15"
                className={styles.custom_checkbox}
              />
              <label htmlFor="15">Кофеварка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="16"
                className={styles.custom_checkbox}
              />
              <label htmlFor="16">Микроволновая печь</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="17"
                className={styles.custom_checkbox}
              />
              <label htmlFor="17">Посуда</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="18"
                className={styles.custom_checkbox}
              />
              <label htmlFor="18">Посудомоечная машина</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                id="19"
                className={styles.custom_checkbox}
              />
              <label htmlFor="19">Газовая плита</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="20"
                className={styles.custom_checkbox}
              />
              <label htmlFor="20">Духовка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="21"
                className={styles.custom_checkbox}
              />
              <label htmlFor="21">Кофеварка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="22"
                className={styles.custom_checkbox}
              />
              <label htmlFor="22">Микроволновая печь</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="23"
                className={styles.custom_checkbox}
              />
              <label htmlFor="23">Посуда</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="24"
                className={styles.custom_checkbox}
              />
              <label htmlFor="24">Посудомоечная машина</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                id="25"
                className={styles.custom_checkbox}
              />
              <label htmlFor="25">Газовая плита</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="26"
                className={styles.custom_checkbox}
              />
              <label htmlFor="26">Духовка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="27"
                className={styles.custom_checkbox}
              />
              <label htmlFor="27">Кофеварка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="28"
                className={styles.custom_checkbox}
              />
              <label htmlFor="28">Микроволновая печь</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="29"
                className={styles.custom_checkbox}
              />
              <label htmlFor="29">Посуда</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="30"
                className={styles.custom_checkbox}
              />
              <label htmlFor="30">Посудомоечная машина</label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons_2}>
        <div className={styles.button_byDefault} onClick={() => setSort(!sort)}>
          <img
            src={byDefault}
            alt="byDefault-img"
            style={{
              filter:
                sort &&
                "invert(57%) sepia(85%) saturate(3360%) hue-rotate(225deg) brightness(91%) contrast(160%)",
            } as React.CSSProperties}
          />
          <p>По умолчанию</p>
          <img src={checkMark} alt="checkmark-img" />
        </div>
        <div
          className={styles.button_list}
          id={showApartments === "list" && styles.button_active}
          onClick={() => setShowApartments("list")}
        >
          <img
            src={showApartments === "list" ? list : listGray}
            alt="list-img"
          />
          <p>Список</p>
        </div>
        <div
          className={styles.button_tiles}
          id={showApartments === "tiles" && styles.button_active}
          onClick={() => setShowApartments("tiles")}
        >
          <img
            src={showApartments === "tiles" ? tiles : tilesGray}
            alt="tiles-img"
          />
          <p>Плитки</p>
        </div>
        <div className={styles.button_map}>
          <img src={geoPurple} alt="geoPurple-img" />
          <p>Показать на карте</p>
        </div>
      </div>
      <div style={{ padding: "0px 80px" }}>
        <h1 className={styles.title}>
          Найдено{" "}
          {data
            ? data.length
            : searchedApartments.searchedApartments.filter(item => item.city === apartmentsInfo.city).length > 0
            ? searchedApartments.searchedApartments.length
            : apartments.filter((item) => item.city === apartmentsInfo.city)
                .length}{" "}
          результатов
        </h1>
        <div className={showApartments === "tiles" && styles.wrapper}>
          {data ? (
            showApartments === "tiles" ? (
              <Card
                data={
                  sort
                    ? [...data]
                        .sort((a, b) => a.costMin - b.costMin)
                        .slice(firstApartmentsIndex, lastApartmentsIndex)
                    : [...data].slice(firstApartmentsIndex, lastApartmentsIndex)
                }
              />
            ) : (
              <CardList
                data={
                  sort
                    ? [...data]
                        .sort((a, b) => a.costMin - b.costMin)
                        .slice(firstApartmentsIndex, lastApartmentsIndex)
                    : [...data].slice(firstApartmentsIndex, lastApartmentsIndex)
                }
              />
            )
          ) : searchedApartments.searchedApartments.filter(item => item.city === apartmentsInfo.city).length ? (
            showApartments === "tiles" ? (
              <Card
                data={
                  sort
                    ? [...searchedApartments.searchedApartments]
                        .filter((item) => item.city === apartmentsInfo.city)
                        .sort((a, b) => a.costMin - b.costMin)
                        .slice(firstApartmentsIndex, lastApartmentsIndex)
                    : [...searchedApartments.searchedApartments].slice(
                        firstApartmentsIndex,
                        lastApartmentsIndex
                      )
                }
              />
            ) : (
              <CardList
                data={
                  sort
                    ? [...searchedApartments.searchedApartments]
                        .filter((item) => item.city === apartmentsInfo.city)
                        .sort((a, b) => a.costMin - b.costMin)
                        .slice(firstApartmentsIndex, lastApartmentsIndex)
                    : [...searchedApartments.searchedApartments].slice(
                        firstApartmentsIndex,
                        lastApartmentsIndex
                      )
                }
              />
            )
          ) : showApartments === "tiles" ? (
            <Card
              data={
                sort
                  ? [...apartments]
                      .filter((item) => item.city === apartmentsInfo.city)
                      .sort((a, b) => a.costMin - b.costMin)
                      .slice(firstApartmentsIndex, lastApartmentsIndex)
                  : [...apartments]
                      .filter((item) => item.city === apartmentsInfo.city)
                      .slice(firstApartmentsIndex, lastApartmentsIndex)
              }
            />
          ) : (
            <CardList
              data={
                sort
                  ? [...apartments]
                      .filter((item) => item.city === apartmentsInfo.city)
                      .sort((a, b) => a.costMin - b.costMin)
                      .slice(firstApartmentsIndex, lastApartmentsIndex)
                  : [...apartments]
                      .filter((item) => item.city === apartmentsInfo.city)
                      .slice(firstApartmentsIndex, lastApartmentsIndex)
              }
            />
          )}
        </div>
      </div>
      <div className={styles.wrapper_2}>
        <Pagination
          dataPerPage={apartmentsPerPage}
          totalData={
            data
              ? data.length
              : searchedApartments.searchedApartments.length > 0
              ? searchedApartments.searchedApartments.length
              : apartments.filter((item) => item.city === apartmentsInfo.city)
                  .length
          }
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className={styles.share}>
          <p>Поделиться</p>
          <div>
            <img src={vk} alt="vk-img" />
          </div>
          <div>
            <img src={faceBook} alt="facebook-img" />
          </div>
          <div>
            <img src={viber} alt="viber-img" />
          </div>
          <div>
            <img src={telegram} alt="telegram-img" />
          </div>
          <div>
            <img src={whatsApp} alt="whatsApp-img" />
          </div>
        </div>
      </div>
      <div className={styles.wrapper_3}>
        <div className={styles.background_2}>
          <div className={styles.desc}>
            <h1>Показать найденные квартиры на карте</h1>
            <p className={styles.subtitle}>
              Ищите новостройки рядом с работой,
              <br /> парком или родственниками
            </p>
            <button>
              <div>
                <img src={geoYellow} alt="geoYellow-img" />
                <p>Открыть карту</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Apartments;
