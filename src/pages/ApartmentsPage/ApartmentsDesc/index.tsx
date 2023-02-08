import { useSelector } from "react-redux";

import BreadCrumbs from "components/BreadCrumbs";
import Checkbox from "components/Checkbox";

import { IState } from "types/IState";
import { ApartmentsProps } from "types/TApartmentsProps";

import styles from "./apartments.module.scss";

const ApartmentsDesc: React.FC<ApartmentsProps> = ({
  currentCity,
  setData,
  apartmentsInfo,
  setFilterData,
  filterData,
}) => {
  const apartments = useSelector((state: IState) => state.data.apartments);

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

  const checkbox = (el: string) => {
    setFilterData((prev) => ({
      ...prev,
      selected: el,
      nameSelect: "Выберите",
    }));
    setData(
      apartments.filter((item) => {
        return el === "Недорогие"
          ? item.costMin < 30 && item.city === apartmentsInfo.city
          : +el[0] === item.rooms && apartmentsInfo.city === item.city;
      })
    );
  };

  return (
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
              {checkboxes.map((text, key) => (
                <Checkbox
                  text={text}
                  setState={() => checkbox(text)}
                  key={key}
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
  );
};

export default ApartmentsDesc;
