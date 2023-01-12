import { NavLink } from "react-router-dom";
import { INews } from "types/INews";

import hotel from "../../assets/images/hotel.png";

import styles from "./newsCard.module.scss";

const NewsCard = ({ item }: {item: INews}) => {
  return (
    <div className={styles.card}>
      <img src={hotel} alt="hotel-img" />
      <div className={styles.card__desc}>
        <h4>{item.title}</h4>
        <p className={styles["card__desc-p"]}>
          Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на
          улице хорошая погода, хочется уехать из города, чтобы сменить
          обстановку. Например, снять коттедж на сутки для семьи или большой
          компании друзей. А...
        </p>
      </div>{" "}
      <div className={styles.buttons}>
        <p className={styles["card_date"]}>
          {item.date} {item.year}
        </p>
        <NavLink to={`/newsList/detail/${item.id}`}>
          <p className={styles["card_read"]}>Читать</p>
        </NavLink>
      </div>
    </div>
  );
};

export default NewsCard;
