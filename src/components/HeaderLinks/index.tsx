import icons from "assets/icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IBookMarks } from "types/IBookMarks";
import styles from "./navLinks.module.scss";

type Props = {
  path: string;
  style: React.CSSProperties;
};

const HeaderLink: React.FC<Props> = ({ path, style }) => {
  const flats = useSelector(
    (state: { bookMarks: IBookMarks }) => state.bookMarks.bookMarks
  );

  return (
    <div
      style={
        path === "bookMarks"
          ? { position: "relative", marginLeft: "230px" }
          : {}
      }
    >
      <NavLink
        to={`/${path}`}
        style={({ isActive }) =>
          isActive
            ? style
            : path === "bookMarks"
            ? {
                marginRight: "0px",
                position: "absolute",
                top: "2px",
                display: "flex",
                alignItems: "center",
              }
            : {}
        }
      >
        {path === "ADS" && (
          <img
            src={icons.geoGray}
            alt="geo-gray-img"
            style={{ paddingRight: "5px" }}
          />
        )}
        {path === "main"
          ? "Главная"
          : path === "newsList"
          ? "Новости"
          : path === "rates"
          ? "Размещение и тарифы"
          : path === "ADS"
          ? "Объявления на карте"
          : path === "contacts"
          ? "Контакты"
          : path === "bookMarks"
          ? "Закладки"
          : path === "cottagesList"
          ? "Коттеджи и усадьбы"
          : path === "bathHousesList"
          ? "Бани и сауны"
          : path === "carsList"
          ? "Авто напрокат"
          : ""}
        {path === "bookMarks" && (
          <img
            src={flats.length > 0 ? icons.heartFilled : icons.heart}
            alt="heart-img"
            className={styles.heart}
          />
        )}
      </NavLink>
    </div>
  );
};

export default HeaderLink;
