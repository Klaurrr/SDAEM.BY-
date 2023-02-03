import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ApartmentsDesc from "./ApartmentsDesc";
import ApartmentsSearchEngine from "./ApartmentsSearchEngine";
import ApartmentsMore from "./ApartmentsMore";

import Card from "components/Card";
import CardList from "components/CardList";
import Pagination from "components/Pagination";

import chevrons from "assets/chevrons";
import socials from "assets/socials";
import icons from "assets/icons";

import { useSelector } from "react-redux";

import { IState } from "types/IState";
import { IApartments } from "types/IApartments";

import { motion } from "framer-motion";
import styles from "./apartments.module.scss";

type ApartmentsInfo = {
  city: string;
  rooms?: string;
  costMin?: string;
  costMax?: string;
};

const Apartments = () => {
  const location = useLocation();

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

  const [apartmentsInfo, setApartmentsInfo] = useState<ApartmentsInfo>({
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
      <ApartmentsSearchEngine
        filterData={filterData}
        setFilterData={setFilterData}
        setApartmentsInfo={setApartmentsInfo}
        setData={setData}
        data={data}
        apartmentsInfo={apartmentsInfo}
        currentCity={currentCity}
      />
      <ApartmentsMore filterData={filterData} />
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
