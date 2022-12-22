import flatOne from "../../assets/images/flat_one.png";
import { useState } from "react";
import userIcon from "../../assets/images/userIcon.png";
import geoGray from "../../assets/images/geoGray2.png";
import metro from "../../assets/images/metro.png";
import phone from "../../assets/images/phone.png";
import styles from "./card.module.scss";
import boy from "../../assets/images/boy.png";
import whatsAppWhite from "../../assets/images/whatsAppWhite.png";
import viberWhite from "../../assets/images/ViberWhite.png";
import heartRed from "../../assets/images/HeartRed.png";
import heartFill from "../../assets/images/HeartFill.png";
import mail from "../../assets/images/mail.png";
import { useEffect } from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";

const Card = ({ data }) => {
  const [contact, setContact] = useState(false);
  const [cardId, setCardId] = useState(0);

  const location = useLocation();

  return (
    <>
      {data.map((flat, index) => (
        <div className={styles.container} key={flat.id}>
          <div className={styles.img}>
            <img src={flatOne} alt="flatOne" />
            <p>Gold</p>
          </div>
          <div className="card_desc__container">
            <div className="card_wrapper">
              <div className="card_price">
                <p>{flat.costMin}.00 BY</p>

                <span>за сутки</span>
              </div>
              <div className="card_desc__container-2">
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
            <div className="card_wrapper-2">
              <p>
                <img
                  src={geoGray}
                  alt="geoGray"
                  style={{ paddingRight: "11px" }}
                />
                {flat.city}, б-р Мулявина, д. 10
              </p>
              <p>
                <img src={metro} alt="metro" style={{ paddingRight: "6px" }} />
                Грушевка <span>•</span>Шабаны
              </p>
            </div>
            <div className="card_desc">
              <p>
                Какое-то описание квартиры, описание квартиры, описание
                квартиры, описание квартиры, описание квартиры, описание
                квартиры, описание квартиры, описание квартиры, описание
                квартиры, описание...
              </p>
              <p></p>
            </div>
            <div className="card_buttons">
              <button
                className={styles.heart}
                style={{
                  display:
                    location.pathname.slice(0, 11) === "/apartments"
                      ? "block"
                      : "none",
                }}
              >
                <img src={heartRed} alt="heartRed-img" />
              </button>
              <button
                className="card_button-purple"
                onClick={() => {
                  setContact(!contact);
                  setCardId(flat.id);
                }}
              >
                <img src={phone} alt="phone" />
                Контакты
              </button>
              <button className="card_button-yellow">Подробнее</button>
            </div>
          </div>
          <div
            className={styles.modal}
            style={{
              display: cardId === flat.id && contact ? "block" : "none",
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
              <a className={styles.owner__email} href={`mailto: ${flat.email}`}>
                {flat.email}
              </a>
              <div className={styles.socials}>
                <div style={{ background: "#7B519D" }}>
                  <img src={viberWhite} alt="viber-png" />
                </div>
                <div style={{ background: "#0DBB41" }}>
                  <img src={whatsAppWhite} alt="whatsApp-png" />
                </div>
                <div style={{ background: "#664EF9" }}>
                  <img src={mail} alt="email-png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
