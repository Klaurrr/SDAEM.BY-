import { useEffect, useRef } from "react";

import DropDownButton from "components/DropDownButton";

import chevrons from "assets/chevrons";
import icons from "assets/icons";

import clsx from "clsx";

import { setApartments } from "store/slices/searchApartmentsSlice";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "types/IState";
import { ApartmentsProps } from "types/TApartmentsProps";

import styles from "./apartments.module.scss";

const ApartmentsSearchEngine: React.FC<ApartmentsProps> = ({
  filterData,
  setFilterData,
  setApartmentsInfo,
  setData,
  data,
  apartmentsInfo,
}) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const dispatch = useDispatch();
  const apartments = useSelector((state: IState) => state.data.apartments);

  const selectValue = (e: string) => {
    setFilterData((prev) => ({
      ...prev,
      selectActive: !filterData.selectActive,
      nameSelect: e,
    }));
    setApartmentsInfo!((prev) => ({
      ...prev,
      rooms: e.slice(0, 1),
    }));
  };

  const foundApartments = () => {
    const filteredData = JSON.parse(JSON.stringify(apartmentsInfo));
    setData(
      apartments.filter((entry) => {
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

  return (
    <div className={styles.search}>
      <div>
        <div className={clsx(styles.select_item, styles.rooms)}>
          <p className={styles["select_item-title"]}>Комнаты</p>
          <div style={{ position: "relative" }}>
            <div
              className={
                filterData.selectActive
                  ? `${styles.select_active}`
                  : `${styles.city}`
              }
              onClick={() =>
                setFilterData((prev) => ({
                  ...prev,
                  selectActive: !filterData.selectActive,
                }))
              }
            >
              <div className={styles.city_wrapper}>
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
                  setState={(e: { target: { outerText: string } }) =>
                    selectValue(e.target.outerText)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "431px", display: "flex" }}>
        <div
          className={clsx(styles.select_item, styles.select_item_cost)}
          style={{ width: "100%" }}
        >
          <p className={styles["select_item-title"]}>Цена за сутки (BYN)</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="От"
              onChange={(e) => {
                setApartmentsInfo!((prev) => ({
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
              onChange={(e) => {
                setApartmentsInfo!((prev) => ({
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
          className={styles.select_item}
          onClick={() =>
            setFilterData((prev) => ({
              ...prev,
              showOptions: !filterData.showOptions,
            }))
          }
          style={{
            borderBottom: filterData.showOptions ? "2px solid #4E64F9" : "none",
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
            setApartmentsInfo!((prev) => ({
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
  );
};

export default ApartmentsSearchEngine;
