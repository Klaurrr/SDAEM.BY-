import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Carousel from "components/Carousel/Carousel";

import socials from "assets/socials";
import icons from "assets/icons";

import { useDispatch, useSelector } from "react-redux";
import { setBookMarks } from "store/slices/bookMarksSlice";

import { IBookMarks } from "types/IBookMarks";
import { IApartments } from "types/IApartments";

import styles from "./card.module.scss";

type Props = {
  data: IApartments[];
};

const Card: React.FC<Props> = ({ data }) => {
  const [contact, setContact] = useState(false);
  const [cardId, setCardId] = useState(0);

  const ref = useRef<null | HTMLDivElement>(null);

  const location = useLocation();

  const dispatch = useDispatch();

  const flats = useSelector(
    (state: { bookMarks: IBookMarks }) => state.bookMarks.bookMarks
  );

  useEffect(() => {
    const handler = (e: TouchEvent | MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setContact(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [contact]);

  return (
    <>
      {data.map((flat) => (
        <div
          className={styles.container}
          key={flat.id}
          style={
            {
              marginBottom:
                (location.pathname.slice(0, 11) === "/apartments" && "30px") ||
                (location.pathname === "/bookMarks" && "30px"),
            } as React.CSSProperties
          }
        >
          <div className={styles.wrapper_inner}>
            <div className={styles.img}>
              <Carousel view="card">
                <img
                  src={require(`../../assets/images/${flat.flatView_1}`)}
                  alt="flatView-img"
                />
                <img
                  src={require(`../../assets/images/${flat.flatView_2}`)}
                  alt="flatView-img"
                />
                <img
                  src={require(`../../assets/images/${flat.flatView_3}`)}
                  alt="flatView-img"
                />
              </Carousel>
            </div>
            <p className={styles.gold}>Gold</p>
          </div>

          <div className={styles.desc_container}>
            <div className={styles.wrapper_1}>
              <div className={styles.price}>
                <p>{flat.costMin}.00 BYN</p>
                <span>за сутки</span>
              </div>
              <div className={styles.desc_container_2}>
                <p className={styles.desc}>
                  <img
                    src={icons.userIcon}
                    alt="userIcon"
                    style={{ marginRight: "6px" }}
                  />{" "}
                  4 (2+2)
                </p>
                <p className={styles.desc}>{flat.rooms} комн.</p>
                <p className={styles.desc}>179 м²</p>
              </div>
            </div>
            <div className={styles.wrapper_2}>
              <p>
                <img
                  src={icons.geoGray_2}
                  alt="geoGray-img"
                  style={{ paddingRight: "11px" }}
                />
                {flat.city}, б-р Мулявина, д. 10
              </p>
              <p>
                <img
                  src={icons.metro}
                  alt="metro-img"
                  style={{ paddingRight: "5px" }}
                />
                Грушевка <span>•</span>Шабаны
              </p>
            </div>
            <div className={styles.desc_2}>
              <p>
                Какое-то описание квартиры, описание квартиры, описание
                квартиры, описание квартиры, описание квартиры, описание
                квартиры, описание квартиры, описание квартиры, описание
                квартиры, описание...
              </p>
              <p></p>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() =>
                  dispatch(
                    setBookMarks({
                      bookMarks: flat,
                    })
                  )
                }
                id={styles.heart}
                style={{
                  display:
                    location.pathname.slice(0, 11) === "/apartments"
                      ? "block"
                      : "none",
                }}
              >
                <img
                  src={
                    flats.indexOf(flat) != -1
                      ? icons.heartFilled
                      : icons.heartRed
                  }
                  alt="heartRed-img"
                />
              </button>
              <button
                className={styles.button_purple}
                onClick={() => {
                  setContact(!contact);
                  setCardId(flat.id!);
                }}
              >
                <img src={icons.phone} alt="phone-img" />
                Контакты
              </button>
              <button className={styles.button_yellow}>Подробнее</button>
            </div>
          </div>
          {cardId === flat.id && contact && (
            <div
              ref={ref}
              className={styles.modal}
              style={{
                right:
                  location.pathname.slice(0, 11) === "/apartments"
                    ? "95px"
                    : "184px",
              }}
            >
              <div className={styles.modal__img}>
                <img
                  src={require(`../../assets/images/${flat.img}`)}
                  alt="boy-img"
                />
              </div>
              <div className={styles.modal__desc}>
                <p className={styles.owner__title}>Владелец</p>
                <p className={styles.owner__info}>{flat.owner}</p>
                <p
                  className={styles.owner__info}
                  style={{ marginBottom: "15px" }}
                >
                  <a href={`tel: +${flat.phone}`}>+{flat.phone}</a>
                </p>
                <a
                  className={styles.owner__email}
                  href={`mailto: ${flat.email}`}
                >
                  {flat.email}
                </a>
                <div className={styles.socials}>
                  <div style={{ background: "#7B519D" }}>
                    <img src={socials.viberWhite} alt="viber-img" />
                  </div>
                  <div style={{ background: "#0DBB41" }}>
                    <img src={socials.whatsAppWhite} alt="whatsApp-img" />
                  </div>
                  <div style={{ background: "#664EF9" }}>
                    <img src={socials.mail} alt="email-img" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Card;
