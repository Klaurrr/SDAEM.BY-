import { useState } from "react";
import { useLocation } from "react-router-dom";

import userIcon from "../../assets/images/userIcon.png";
import geoPurple from "../../assets/images/geoPurple.png";
import metroPurple from "../../assets/images/metroPurple.png";
import viberWhite from "../../assets/images/ViberWhite.png";
import whatsAppWhite from "../../assets/images/whatsAppWhite.png";
import phone from "../../assets/images/phone.png";
import heartRed from "../../assets/images/HeartRed.png";
import heartFilled from "../../assets/images/HeartFilled.png";
import orchid from "../../assets/images/orchid.png";
import mail from "../../assets/images/mail.png";

import { useDispatch, useSelector } from "react-redux";
import { setBookMarks } from "../../store/slices/bookMarksSlice";

import { IApartments } from "types/IApartments";
import { IBookMarks } from "types/IBookMarks";

import styles from "./cardList.module.scss";

const CardList = ({ data }: {data: IApartments[]}) => {
  const [contact, setContact] = useState(false);
  const [cardId, setCardId] = useState(0);

  const location = useLocation();
  const dispatch = useDispatch();

  const flats = useSelector((state: {bookMarks: IBookMarks}) => state.bookMarks.bookMarks);

  return (
    <>
      {data.map((flat) => (
        <div className={styles.container} key={flat.id}>
          <div style={{ position: "relative", marginRight: "25px" }}>
            <img className={styles.orchid} src={orchid} alt="orchid-img" />
            <p className={styles.gold}>Gold</p>
          </div>
          <div>
            <h4>{flat.rooms} комн. апартаменты на Грушевке</h4>
            <div className={styles.geo}>
              <img src={geoPurple} alt="geoPurple-img" />
              <p>{flat.city}, б-р Мулявина, д. 10</p>
            </div>
            <div className={styles.desc_1}>
              <p>
                <img src={userIcon} alt="userIcon-img" />4 (2 + 2)
              </p>
              <p>{flat.rooms} комн. </p>
              <p>
                <img src={metroPurple} alt="metroPurple-img" />
                Грушевка
              </p>
              <p>
                <span>район: </span>
                Шабаны
              </p>
            </div>
            <div className={styles.desc_2}>
              <p>
                Большая четырехкомнатная студия! Большая джкакузи на двоих, на
                теливизоре есть приложение Megogo, YouTube, Smart TV, сможете
                выбрать фильм по вкусу!) Цена зависит от количества проживающих,
                уточняйте, пожалуйста, по телефону! В пяти минутах ходьбы
                Минск-Арена, ...
              </p>
            </div>
            <div className={styles.buttons}>
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
              <button
                className={styles.heart}
                onClick={() => {
                  dispatch(
                    setBookMarks({
                      bookMarks: flat,
                    })
                  );
                }}
                style={{
                  display:
                    location.pathname.slice(0, 11) === "/apartments"
                      ? "flex"
                      : "none",
                }}
              >
                <p>{flats.indexOf(flat) != -1 ? "Добавлено" : "В закладки"}</p>
                <img
                  src={flats.indexOf(flat) != -1 ? heartFilled : heartRed}
                  alt="heartRed-img"
                />
              </button>

              <button className={styles.button_yellow}>Подробнее</button>
            </div>
            <div className={styles.price}>
              <p>{flat.costMin}.00 BYN</p>
              <span>за сутки</span>
            </div>
          </div>
          <div
            className={styles.modal}
            style={{
              display: cardId === flat.id && contact ? "block" : "none",
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
              <a className={styles.owner__email} href={`mailto: ${flat.email}`}>
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
        </div>
      ))}
    </>
  );
};

export default CardList;
