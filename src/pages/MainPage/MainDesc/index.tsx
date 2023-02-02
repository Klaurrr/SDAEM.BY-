import { useNavigate, NavLink } from "react-router-dom";

import chevrons from "assets/chevrons";
import flats from "assets/flats";
import icons from "assets/icons";

import { useSelector } from "react-redux";

import { IState } from "types/IState";

import styles from "./main.module.scss";

const MainDesc = () => {
  const navigate = useNavigate();

  const news = useSelector((state: IState) => state.data.news);
  return (
    <section className={styles.container_5}>
      <div style={{ display: "flex" }}>
        <div>
          <p className={styles["title-5"]}>Что такое SDAEM.BY</p>
          <h3 className={styles["subtitle-5"]}>Квартира на сутки в Минске</h3>
          <div style={{ width: "842px", marginTop: "30px" }}>
            <div style={{ display: "flex", position: "relative" }}>
              <img src={flats.flat_3} alt="flatView" id={styles.orchid} />
              <img
                style={{
                  position: "absolute",
                  margin: "181px 0px 0px 346px",
                }}
                src={icons.gaps}
                alt="gaps-img"
              />
              <div className={styles["desc-5"]}>
                <p>
                  <span>Нужна квартира на сутки в Минске?</span> На веб-сайте
                  sdaem.by вас ждет масса выгодных предложений. Каталог
                  насчитывает <span>более 500 квартир.</span> Благодаря удобной
                  навигации вы быстро найдете подходящий вариант.
                </p>
                <p>
                  В каталоге представлены комфортабельные однокомнатные квартиры
                  на сутки и квартиры с большим количеством комнат в разных
                  районах города, с различной степенью удобства от дешевых до
                  VIP с джакузи.
                </p>
              </div>
            </div>
            <p className={styles["desc-5-p"]}>
              Чтобы снять квартиру на сутки в Минске, вам достаточно
              определиться с выбором и связаться с владельцем для уточнения
              условий аренды и заключить договор. Заметим, на сайте представлены
              исключительно квартиры на сутки без посредников, что избавляет
              посетителей от необходимости взаимодействовать с агентствами,
              тратя свое время и деньги. Также пользователи сайта могут
              совершенно бесплатно размещать объявления о готовности сдать
              квартиру на сутки.
            </p>
          </div>
        </div>
        <div className={styles.news}>
          <div style={{ marginLeft: "23px" }}>
            <h2>Новости</h2>
            <div className={styles.news_desc}>
              {news &&
                news.slice(0, 5).map((item) => (
                  <NavLink to={`/newsList/detail/${item.id}`} key={item.id}>
                    <h5>{item.title}</h5>
                    <p>{item.date}</p>
                  </NavLink>
                ))}
            </div>
            <button onClick={() => navigate("/newsList")}>
              Посмотреть все
              <img src={chevrons.checkMarkPurple} alt="checkMarkRight-img" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainDesc;
