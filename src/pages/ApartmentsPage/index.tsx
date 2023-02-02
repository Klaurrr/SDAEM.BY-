import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "components/Card";
import CardList from "components/CardList";
import Pagination from "components/Pagination";
import DropDownButton from "components/DropDownButton";
import CustomCheckbox from "components/CustomCheckbox";

import chevrons from "assets/chevrons";
import socials from "assets/socials";
import icons from "assets/icons";

import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "store/slices/searchApartmentsSlice";

import { IState } from "types/IState";
import { IApartments } from "types/IApartments";

import clsx from "clsx";

import { motion } from "framer-motion";
import styles from "./apartments.module.scss";
import ApartmentsDesc from "./ApartmentsDesc";

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
    const handler = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (!ref.current) return;
      if (!ref.current.contains(target)) {
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const outputApartments = (
    arr: IApartments[],
    sort: boolean = false,
    filter: boolean = false
  ) => {
    if (sort && filter) {
      return arr
        .filter((item) => item.city === apartmentsInfo.city)
        .sort((a, b) => a.costMin - b.costMin)
        .slice(firstApartmentsIndex, lastApartmentsIndex);
    } else if (sort && filter === false) {
      return arr
        .sort((a, b) => a.costMin - b.costMin)
        .slice(firstApartmentsIndex, lastApartmentsIndex);
    } else if (filter && sort === false) {
      return arr
        .filter((item) => item.city === apartmentsInfo.city)
        .slice(firstApartmentsIndex, lastApartmentsIndex);
    } else return arr.slice(firstApartmentsIndex, lastApartmentsIndex);
  };

  const customCheckboxArray = () => {
    let checkboxArray: string[] = [];
    for (let i = 0; i < 5; i++) {
      checkboxArray = checkboxArray.concat([
        "Газовая плита",
        "Духовка",
        "Микроволновая печь",
        "Посуда",
        "Посудомоечная машина",
      ]);
    }
    return checkboxArray;
  };

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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ApartmentsDesc
        currentCity={currentCity}
        setData={setData}
        apartmentsInfo={apartmentsInfo}
        setFilterData={setFilterData}
        filterData={filterData}
      />
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
                  <img src={chevrons.checkMarkPurple} alt="checkMark-img" />
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
              <img src={icons.more} alt="more-img" />
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
            <img src={chevrons.checkMarkWhite} alt="checkMarkRight-img" />
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
              <img src={chevrons.checkMarkPurple} alt="checkMark-img" />
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
              <img src={chevrons.checkMarkPurple} alt="checkMark-img" />
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
              <img src={chevrons.checkMarkPurple} alt="checkMark-img" />
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
          <div className={styles.checkboxes_wrapper}>
            {customCheckboxArray().map((item, index) => (
              <CustomCheckbox id={String(index)} text={item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttons_2}>
        <div className={styles.button_byDefault} onClick={() => setSort(!sort)}>
          <img
            src={icons.byDefault}
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
          <img src={chevrons.checkMarkPurple} alt="checkmark-img" />
        </div>
        <div
          className={styles.button_list}
          id={showApartments === "list" && styles.button_active}
          onClick={() => setShowApartments("list")}
        >
          <img
            src={showApartments === "list" ? icons.list : icons.listGray}
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
            src={showApartments === "tiles" ? icons.tiles : icons.tilesGray}
            alt="tiles-img"
          />
          <p>Плитки</p>
        </div>
        <div className={styles.button_map}>
          <img src={icons.geoPurple} alt="geoPurple-img" />
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
                    ? outputApartments([...data], true)
                    : outputApartments([...data])
                }
              />
            ) : (
              <CardList
                data={
                  sort
                    ? outputApartments([...data], true)
                    : outputApartments([...data])
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
                    ? outputApartments(
                        [...searchedApartments.searchedApartments],
                        true,
                        true
                      )
                    : outputApartments([
                        ...searchedApartments.searchedApartments,
                      ])
                }
              />
            ) : (
              <CardList
                data={
                  sort
                    ? outputApartments(
                        [...searchedApartments.searchedApartments],
                        true,
                        true
                      )
                    : outputApartments([
                        ...searchedApartments.searchedApartments,
                      ])
                }
              />
            )
          ) : showApartments === "tiles" ? (
            <Card
              data={
                sort
                  ? outputApartments([...apartments], true, true)
                  : outputApartments([...apartments], false, true)
              }
            />
          ) : (
            <CardList
              data={
                sort
                  ? outputApartments([...apartments], true, true)
                  : outputApartments([...apartments], false, true)
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
            <img src={socials.vk} alt="vk-img" />
          </div>
          <div>
            <img src={socials.faceBook} alt="facebook-img" />
          </div>
          <div>
            <img src={socials.viber} alt="viber-img" />
          </div>
          <div>
            <img src={socials.telegram} alt="telegram-img" />
          </div>
          <div>
            <img src={socials.whatsApp} alt="whatsApp-img" />
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
                <img src={icons.geoYellow} alt="geoYellow-img" />
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
