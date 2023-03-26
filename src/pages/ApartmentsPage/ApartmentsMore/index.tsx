import { useEffect, useRef, useState } from "react";

import CustomCheckbox from "components/CustomCheckbox";
import DropDownButton from "components/DropDownButton";

import chevrons from "assets/chevrons";

import styles from "./apartments.module.scss";

type Props = {
  filterData: {
    selectActive: boolean;
    showOptions: boolean;
    nameSelect: string;
    costMinValue: string;
    costMaxValue: string;
    selected: string;
  };
};

type MoreInfo = {
  selectSleeping: string;
  selectDistrict: string;
  selectMetro: string;
  selectSleepActive: boolean;
  selectDistrictActive: boolean;
  selectMetroActive: boolean;
};

const ApartmentsMore: React.FC<Props> = ({ filterData }) => {
  const sleepRef = useRef<null | HTMLDivElement>(null);
  const districtRef = useRef<null | HTMLDivElement>(null);
  const metroRef = useRef<null | HTMLDivElement>(null);

  const [moreDetailInfo, setMoreDetailInfo] = useState<MoreInfo>({
    selectSleeping: "Выберите",
    selectDistrict: "Выберите",
    selectMetro: "Выберите",
    selectSleepActive: false,
    selectDistrictActive: false,
    selectMetroActive: false,
  });

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

  const checkboxMocks = () => {
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

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (!sleepRef.current) return;
      if (!sleepRef.current.contains(e.target as Node)) {
        setMoreDetailInfo((prev) => ({
          ...prev,
          selectSleepActive: false,
        }));
      }
      if (!districtRef.current) return;
      if (!districtRef.current.contains(e.target as Node)) {
        setMoreDetailInfo((prev) => ({
          ...prev,
          selectDistrictActive: false,
        }));
      }
      if (!metroRef.current) return;
      if (!metroRef.current.contains(e.target as Node)) {
        setMoreDetailInfo((prev) => ({
          ...prev,
          selectMetroActive: false,
        }));
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [
    moreDetailInfo.selectSleepActive,
    moreDetailInfo.selectMetroActive,
    moreDetailInfo.selectDistrictActive,
  ]);

  return (
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
            ref={sleepRef}
          >
            {["1", "2", "3", "4", "5"].map((item, key) => (
              <DropDownButton
                key={key}
                text={item}
                setState={(e: { target: { outerText: string } }) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectSleepActive: false,
                    selectSleeping: e.target.outerText,
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
            ref={districtRef}
          >
            {districts.map((district, key) => (
              <DropDownButton
                key={key}
                text={district}
                setState={(e: { target: { outerText: string } }) =>
                  setMoreDetailInfo((prev) => ({
                    ...prev,
                    selectDistrictActive: false,
                    selectDistrict: e.target.outerText,
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
            ref={metroRef}
          >
            {["Есть", "Нет"].map((text, key) => (
              <DropDownButton
                key={key}
                text={text}
                setState={(e: { target: { outerText: string } }) =>
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
          {checkboxMocks().map((item, index) => (
            <CustomCheckbox id={index.toString()} text={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApartmentsMore;
