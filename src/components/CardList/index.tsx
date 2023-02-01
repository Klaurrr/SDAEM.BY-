import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Carousel from "components/Carousel/Carousel";

import socials from "assets/socials";
import icons from "assets/icons";

import { useDispatch, useSelector } from "react-redux";
import { setBookMarks } from "store/slices/bookMarksSlice";

import { IApartments } from "types/IApartments";
import { IBookMarks } from "types/IBookMarks";

import styles from "./cardList.module.scss";

type Props = {
  data: IApartments[];
};

const CardList: React.FC<Props> = ({ data }) => {
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
        <div className={styles.container} key={flat.id}>
          <div className={styles.wrapper_inner}>
            <Carousel view="cardList">
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
            <p className={styles.gold}>Gold</p>
          </div>
          <div style={{ marginLeft: "25px" }}>
            <h4>{flat.rooms} комн. апартаменты на Грушевке</h4>
            <div className={styles.geo}>
              <img src={icons.geoPurple} alt="geoPurple-img" />
              <p>{flat.city}, б-р Мулявина, д. 10</p>
            </div>
            <div className={styles.desc_1}>
              <p>
                <img src={icons.userIcon} alt="userIcon-img" />4 (2 + 2)
              </p>
              <p>{flat.rooms} комн. </p>
              <p>
                <img src={icons.metroPurple} alt="metroPurple-img" />
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
                <img src={icons.phone} alt="phone-img" />
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
                  src={
                    flats.indexOf(flat) != -1
                      ? icons.heartFilled
                      : icons.heartRed
                  }
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

export default CardList;
