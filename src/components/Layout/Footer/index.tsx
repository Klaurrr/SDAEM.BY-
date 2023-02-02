import { useNavigate } from "react-router";

import logo from "assets/images/logo.png";
import socials from "assets/socials";
import payments from "assets/payments";

import styles from "./footer.module.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <img src={logo} alt="logo-img" />
          <p className={styles.title}>Сдаём бай</p>
          <p className={styles.owner}>
            ИП Шушкевич Андрей Викторович УНП 192602485 Минским горисполкомом
            10.02.2016 220068, РБ, г. Минск, ул. Осипенко, 21, кв.23 +375 29 621
            48 33, sdaem@sdaem.by Режим работы: 08:00-22:00
          </p>
        </div>
        <div>
          <div className={styles.col_1}>
            <div style={{ marginRight: "69px" }}>
              <p className={styles.services}>Коттеджи и усадьбы</p>
              <p className={styles.services}>Бани и сауны</p>
              <p className={styles.services}>Авто на прокат</p>
            </div>
            <div>
              <p className={styles.services} style={{ marginBottom: "12px" }}>
                Квартиры
              </p>
              <p
                className={styles.services_2}
                onClick={() => navigate("/apartments/Minsk")}
              >
                Квартиры в Минске
              </p>
              <p
                className={styles.services_2}
                onClick={() => navigate("/apartments/Gomel")}
              >
                Квартиры в Гомеле
              </p>
              <p
                className={styles.services_2}
                onClick={() => navigate("/apartments/Brest")}
              >
                Квартиры в Бресте
              </p>
            </div>
            <div style={{ margin: "29px 102px 0px 53px" }}>
              <p
                className={styles.services_2}
                onClick={() => navigate("/apartments/Vitebsk")}
              >
                Квартиры в Витебске
              </p>
              <p
                className={styles.services_2}
                onClick={() => navigate("/apartments/Grodno")}
              >
                Квартиры в Гродно
              </p>
              <p
                className={styles.services_2}
                onClick={() => navigate("/apartments/Mogilev")}
              >
                Квартиры в Могилеве
              </p>
            </div>
            <div style={{ marginTop: "4px" }}>
              <p
                className={styles.services_2}
                onClick={() => navigate("/newsList")}
              >
                Новости
              </p>
              <p className={styles.services_2} onClick={() => navigate("*")}>
                Размещение и тарифы{" "}
              </p>
              <p className={styles.services_2} onClick={() => navigate("*")}>
                Объявления на карте
              </p>
              <p
                className={styles.services_2}
                onClick={() => navigate("/contacts")}
              >
                Контакты
              </p>
            </div>
          </div>
          <div className={styles.col_2}>
            <div className={styles.socials}>
              <p>Мы в соцсетях</p>
              <img src={socials.inst} alt="instagram-img" />
              <img src={socials.vkBlack} alt="vk-img" />
              <img src={socials.faceBookBlack} alt="facebook-img" />
            </div>
            <div className={styles.payment}>
              <img src={payments.visa} alt="visa-img" />
              <img src={payments.webpay} alt="webpay-img" />
              <img src={payments.verifiedByVisa} alt="verifiedByVisa-img" />
              <img src={payments.masterCard} alt="masterCard-img" />
              <img src={payments.masterCardSecure} alt="masterCardSecure-img" />
              <img src={payments.belkart} alt="belkart-img" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
