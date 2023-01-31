import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Carousel from "components/Carousel/Carousel";

import userIcon from "../../assets/images/userIcon.png";
import geoGray from "../../assets/images/geoGray2.png";
import metro from "../../assets/images/metro.png";
import phone from "../../assets/images/phone.png";
import whatsAppWhite from "../../assets/images/whatsAppWhite.png";
import viberWhite from "../../assets/images/ViberWhite.png";
import heartRed from "../../assets/images/HeartRed.png";
import heartFilled from "../../assets/images/HeartFilled.png";
import mail from "../../assets/images/mail.png";

import { useDispatch, useSelector } from "react-redux";
import { setBookMarks } from "../../store/slices/bookMarksSlice";

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

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        setContact(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [contact]);

  const location = useLocation();

  const dispatch = useDispatch();

  const flats = useSelector(
    (state: { bookMarks: IBookMarks }) => state.bookMarks.bookMarks
  );

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
                    src={userIcon}
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
                  src={geoGray}
                  alt="geoGray-img"
                  style={{ paddingRight: "11px" }}
                />
                {flat.city}, б-р Мулявина, д. 10
              </p>
              <p>
                <img
                  src={metro}
                  alt="metro-img"
                  style={{ paddingRight: "6px" }}
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
                  src={flats.indexOf(flat) != -1 ? heartFilled : heartRed}
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
                <img src={phone} alt="phone-img" />
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
                    <img src={viberWhite} alt="viber-img" />
                  </div>
                  <div style={{ background: "#0DBB41" }}>
                    <img src={whatsAppWhite} alt="whatsApp-img" />
                  </div>
                  <div style={{ background: "#664EF9" }}>
                    <img src={mail} alt="email-img" />
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
