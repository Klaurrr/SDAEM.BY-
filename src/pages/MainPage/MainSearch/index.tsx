import { useNavigate } from "react-router-dom";

import chevrons from "assets/chevrons";
import icons from "assets/icons";

import clsx from "clsx";

import styles from "./main.module.scss";

const MainSearch = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.container_4}>
      <img
        style={{ position: "absolute", right: "140px", top: "46px" }}
        src={icons.gapsWhite}
        alt="gaps_white-img"
      />
      <div className={styles.wrapper_4}>
        <div>
          <div className={styles.search_desc}>
            <h3>Поиск квартир на карте</h3>
            <p>
              Ищите квартиры на сутки в центре города,
              <br /> возле парка или в живописном районе
            </p>
            <button>
              <div>
                <img src={icons.geoYellow} alt="geoYellow-img" />
                <p>Открыть карту</p>
              </div>
            </button>
          </div>
        </div>
        <div className={styles.search_wrap}>
          <div className={styles.search_cards}>
            <div
              style={{
                padding: "27px 39px 0px 37px",
              }}
            >
              <div className={styles["search_cards-title"]}>
                <div className={styles.circle}>
                  <img src={icons.AdFree} alt="ad_free-img" />
                </div>
                <p>
                  Начните привлекать <br /> клиентов бесплатно!
                </p>
              </div>
              <div className={styles["search_cards-desc"]}>
                <p>
                  Пройдя простую регистрацию на сайте у Вас появится личный
                  кабинет, в котором возможно{" "}
                  <span>бесплатно создавать и публиковать </span>
                  объявления на сайте.
                </p>
              </div>
              <button onClick={() => navigate("/rates")}>
                + Разместить объявление
              </button>
            </div>
          </div>
          <div className={styles.search_cards}>
            <div
              style={{
                padding: "27px 39px 0px 37px",
              }}
            >
              <div className={styles["search_cards-title"]}>
                <div className={styles.circle}>
                  <img src={icons.AdUp} alt="AD_UP-img" />
                </div>
                <p>
                  Поднимайте <br /> объявления
                </p>
              </div>
              <div className={styles["search_cards-desc"]}>
                <p>
                  Вы в любое время можете <span>поднимать</span> объявления{" "}
                  <span>вверх первой страницы</span> каталога, они разместятся
                  сразу после платных объявлений до тех пор, пока другой
                  пользователь не повторит процедуру.
                </p>
              </div>
              <button onClick={() => navigate("/rates")}>
                <p>Узнать стоимость услуги</p>
                <img
                  style={{ filter: "invert(1)" }}
                  src={chevrons.checkMarkWhite}
                  alt="checkMarkRight-img"
                />
              </button>
            </div>
          </div>
          <div className={clsx(styles.search_cards, styles.gold)}>
            <img src={icons.glare} className={styles.glare} alt="glare-img" />
            <h2>Приоритет Gold</h2>
            <div
              style={{
                padding: "0px 39px 0px 37px",
              }}
            >
              <div className={styles.gold_desc}>
                <p>
                  Приоритетное размещение <span>Gold</span> позволяет{" "}
                  <span>закрепить ваше объявление</span> в верхней части
                  каталога!
                </p>
                <p>
                  Gold объявления <span>перемещаются каждые 5 мин</span> на 1
                  позицию, что делает размещение одинаковым для всех.
                </p>
              </div>
              <button
                id={styles["btn-purple"]}
                onClick={() => navigate("/rates")}
              >
                <p>Еще о тарифе Gold</p>
                <img src={chevrons.checkMarkWhite} alt="checkMarkRight-img" />
              </button>
            </div>
          </div>
        </div>
        <img
          style={{
            position: "absolute",
            right: "165px",
            top: "705px",
          }}
          src={icons.gaps}
          alt="gaps-img"
        />
      </div>
    </section>
  );
};

export default MainSearch;
