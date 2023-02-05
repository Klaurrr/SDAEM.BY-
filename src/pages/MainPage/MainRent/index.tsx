import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "components/Card";
import DropDownButton from "components/DropDownButton";

import { IState } from "types/IState";
import { MainProps } from "types/TMainProps";

import chevrons from "assets/chevrons";
import icons from "assets/icons";

import styles from "./main.module.scss";

const MainRent: React.FC<MainProps> = ({ selectIsOpen, setSelectIsOpen }) => {
  const [nameSelect, setNameSelect] = useState({
    metro: "Метро",
    district: "Район",
  });

  const metroRef = useRef<null | HTMLDivElement>(null);
  const districtRef = useRef<null | HTMLDivElement>(null);

  const navigate = useNavigate();

  const apartments = useSelector((state: IState) => state.data.apartments);

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (!metroRef.current) return;
      if (!metroRef.current.contains(target)) {
        selectIsOpen.selectMetro &&
          setSelectIsOpen((prev) => ({ ...prev, selectMetro: false }));
      }
      if (!districtRef.current) return;
      if (!districtRef.current.contains(target)) {
        selectIsOpen.selectDistrict &&
          setSelectIsOpen((prev) => ({ ...prev, selectDistrict: false }));
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [selectIsOpen]);

  const setDropDown = (e: string) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectMetro: !selectIsOpen.selectMetro,
    }));
    setNameSelect((prev) => ({ ...prev, metro: e }));
  };
  const setDropDownTwo = (e: string) => {
    setSelectIsOpen((prev) => ({
      ...prev,
      selectDistrict: !selectIsOpen.selectDistrict,
    }));
    setNameSelect((prev) => ({ ...prev, district: e }));
  };

  return (
    <section className={styles.container_3}>
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
              <img src={chevrons.checkMarkWhite} alt="checkMarkRight-img" />
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div className={styles.wrapper_3}></div>
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
                <img src={icons.metro} alt="metro-img" />
                <p style={{ marginLeft: "8px" }}>{nameSelect.metro}</p>
              </div>
              <img
                style={{ marginRight: "16px" }}
                src={chevrons.checkMarkPurple}
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
                src={chevrons.checkMarkPurple}
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
            {["Есть", "Нет"].map((metro) => (
              <DropDownButton
                text={metro}
                setState={(e: { target: { outerText: string } }) =>
                  setDropDown(e.target.outerText)
                }
              />
            ))}
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
            {["Район 1", "Район 2", "Район 3", "Район 4"].map((district) => (
              <DropDownButton
                text={district}
                setState={(e: { target: { outerText: string } }) =>
                  setDropDownTwo(e.target.outerText)
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.chevrons}>
          <div>
            <img src={chevrons.checkMarkPurple} alt="chevronNavigate-img" />
          </div>
          <div>
            <img src={chevrons.checkMarkPurple} alt="chevronNavigate-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainRent;
