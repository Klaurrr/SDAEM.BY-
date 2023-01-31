import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import BreadCrumbs from "../../components/BreadCrumbs";

import more from "../../assets/images/more.png";
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

import clsx from "clsx";

import { motion } from "framer-motion";
import styles from "./apartments.module.scss";
import DropDownButton from "components/DropDownButton";
import Checkbox from "components/Checkbox";
import CustomCheckbox from "components/CustomCheckbox";

const Apartments = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const ref = useRef<null | HTMLDivElement>(null);

  const apartments = useSelector((state: IState) => state.data.apartments);
  const searchedApartments = useSelector((state: IState) => state.search);

  const currentCity = (declination?: string) => {
    if (!declination) {
      return location.pathname === "/apartments/Minsk"
        ? "Минск"
        : location.pathname === "/apartments/Gomel"
        ? "Гомель"
        : location.pathname === "/apartments/Brest"
        ? "Брест"
        : location.pathname === "/apartments/Vitebsk"
        ? "Витебск"
        : location.pathname === "/apartments/Grodno"
        ? "Гродно"
        : "Могилев";
    }
    return location.pathname === "/apartments/Minsk"
      ? "Минске"
      : location.pathname === "/apartments/Gomel"
      ? "Гомеле"
      : location.pathname === "/apartments/Brest"
      ? "Бресте"
      : location.pathname === "/apartments/Vitebsk"
      ? "Витебске"
      : location.pathname === "/apartments/Grodno"
      ? "Гродно"
      : "Могилеве";
  };

  const [data, setData] = useState<IApartments[] | undefined>(undefined);

  const [apartmentsInfo, setApartmentsInfo] = useState({
    city: currentCity(),
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
    const handler = (e: any) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        setFilterData((prev) => ({
          ...prev,
          selectActive: false,
        }));
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [filterData.selectActive]);

  useEffect(() => {
    showApartments === "list"
      ? setApartmentsPerPage(4)
      : setApartmentsPerPage(9);
  }, [showApartments]);

  useEffect(() => {
    setApartmentsInfo((prev) => ({
      ...prev,
      city: currentCity(),
    }));
    setFilterData((prev) => ({
      ...prev,
      selected: "",
      selectActive: false,
      nameSelect: "Выберите",
    }));
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
    const filteredData = JSON.parse(JSON.stringify(apartmentsInfo));
    setData(
      apartments.filter((entry: any) => {
        return (Object.keys(filteredData) as Array<keyof typeof data>).every(
          (key) => {
            if (key === "costMin" || key === "costMax") {
              if (key === "costMax") {
                return entry["costMin"] <= apartmentsInfo[key]!;
              } else if (key === "costMin") {
                return entry[key] >= apartmentsInfo[key]!;
              } else if (key === "costMin" && key === "costMax") {
                return (
                  entry[key] >= apartmentsInfo[key] &&
                  entry["costMin"] <= apartmentsInfo[key]
                );
              }
            } else return entry[key] == apartmentsInfo[key];
          }
        );
      })
    );
  };

  const checkbox = (el: string) => {
    setFilterData((prev) => ({
      ...prev,
      selected: el,
      nameSelect: "Выберите",
    }));
    setData(
      apartments.filter((item) =>
        el === "Недорогие"
          ? item.costMin < 30 && item.city === apartmentsInfo.city
          : el === "1-комнатные"
          ? item.rooms === 1 && item.city === apartmentsInfo.city
          : el === "2-комнатные"
          ? item.rooms === 2 && item.city === apartmentsInfo.city
          : el === "3-комнатные"
          ? item.rooms === 3 && item.city === apartmentsInfo.city
          : el === "4-комнатные"
          ? item.rooms === 4 && item.city === apartmentsInfo.city
          : el === "5-комнатные"
          ? item.rooms === 5 && item.city === apartmentsInfo.city
          : ""
      )
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const chunk = 5;
  // let oneChunk: any[] | null = null;
  // const customCheckbox = () => {
  //   let checkboxes: string[] = [];
  //   for (let i = 0; i < 6; i++) {
  //     checkboxes = checkboxes.concat([
  //       "Газовая плита",
  //       "Духовка",
  //       "Микроволновая печь",
  //       "Посуда",
  //       "Посудомоечная машина",
  //     ]);
  //   }
  //   for (let i = 0; i < checkboxes.length; i += chunk) {
  //     oneChunk = checkboxes.slice(i, i + chunk);
  //   }

  //   return oneChunk?.map((item, index) => (
  //     <CustomCheckbox id={String(index)} text={item} />
  //   ));

  //   // return checkboxes.map((item, index) => (
  //   //   <CustomCheckbox id={String(index)} text={item} />
  //   // ));
  // };

  const districts = [
    "Заводской",
    "Ленинский",
    "Московский",
    "Октябрьский",
    "Партизанский",
    "Первомайский",
    "Советский",
    "Фрунзенский",
    "Центральный",
  ];

  const checkboxes = [
    "Недорогие",
    "1-комнатные",
    "2-комнатные",
    "3-комнатные",
    "4-комнатные",
    "5-комнатные",
    "Заводской р.",
    "Ленинский р.",
    "Московский р.",
    "Октябрьский р.",
    "Партизанский р.",
    "Советский р.",
    "Фрунзенский р.",
    "Центральный р.",
  ];

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
            crumbSubTitle={`Квартиры в ${currentCity("Склоняется")}`}
          />
          <h1
            style={{
              margin:
                filterData.selected === "" ? "30px 0px 40px" : "30px 0px 15px",
            }}
          >
            Аренда квартир на сутки в {currentCity("Склоняется")}
          </h1>
          {filterData.selected === "" ? (
            <div>
              <p className={styles.subtitle}>Рекомендуем посмотреть</p>
              <div>
                {checkboxes.map((text) => (
                  <Checkbox
                    text={text}
                    setState={(e: any) => checkbox(e.target.outerText)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Checkbox
              active={true}
              text={filterData.selected}
              setState={() => {
                setFilterData((prev) => ({ ...prev, selected: "" }));
                setData(undefined);
              }}
            />
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
                ref={ref}
                className={
                  filterData.selectActive
                    ? `${styles["drop-down-active"]}`
                    : `${styles["drop-down-unactive"]}`
                }
              >
                {["1 комн.", "2 комн.", "3 комн.", "4 комн."].map((room) => (
                  <DropDownButton
                    text={room}
                    setState={(e: any) => selectValue(e)}
                  />
                ))}
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
                onChange={(e: any) => {
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
                onChange={(e: any) => {
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
        <div style={{ width: "187px", cursor: "pointer" }}>
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
              {["1", "2", "3", "4", "5"].map((item) => (
                <DropDownButton
                  text={item}
                  setState={(event: any) =>
                    setMoreDetailInfo((prev) => ({
                      ...prev,
                      selectSleepActive: false,
                      selectSleeping: event.target.outerText,
                    }))
                  }
                />
              ))}
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
              {districts.map((district) => (
                <DropDownButton
                  text={district}
                  setState={(event: any) =>
                    setMoreDetailInfo((prev) => ({
                      ...prev,
                      selectDistrictActive: false,
                      selectDistrict: event.target.outerText,
                    }))
                  }
                />
              ))}
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
              {["Есть", "Нет"].map((text) => (
                <DropDownButton
                  text={text}
                  setState={(e: any) =>
                    setMoreDetailInfo((prev) => ({
                      ...prev,
                      selectMetroActive: false,
                      selectMetro: e.target.outerText,
                    }))
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles["more_detail-wrapper-2"]}>
          <div>
            {[
              "Газовая плита",
              "Духовка",
              "Микроволновая печь",
              "Посуда",
              "Посудомоечная машина",
            ].map((item, index) => (
              <CustomCheckbox id={String(index)} text={item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttons_2}>
        <div className={styles.button_byDefault} onClick={() => setSort(!sort)}>
          <img
            src={byDefault}
            alt="byDefault-img"
            style={
              {
                filter:
                  sort &&
                  "invert(57%) sepia(85%) saturate(3360%) hue-rotate(225deg) brightness(91%) contrast(160%)",
              } as React.CSSProperties
            }
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
            : searchedApartments.searchedApartments.filter(
                (item) => item.city === apartmentsInfo.city
              ).length > 0
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
          ) : searchedApartments.searchedApartments.filter(
              (item) => item.city === apartmentsInfo.city
            ).length ? (
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
