import { useParams } from "react-router-dom";

import BreadCrumbs from "components/BreadCrumbs";
import NewsCard from "components/NewsCard";

import { useSelector } from "react-redux";

import socials from "assets/socials";
import icons from "assets/icons";

import { IState } from "types/IState";

import { motion } from "framer-motion";
import styles from "./detail.module.scss";

const DetailPage = () => {
  const { id } = useParams<string>();
  const data = useSelector((state: IState) => state.data.news);

  const news = data && data.filter((item) => item.id === Number(id));
  window.scrollTo(0, 0);

  return (
    <motion.section
      style={{ position: "relative" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {news.length > 0 &&
        news.map((item) => (
          <div key={item.id}>
            <div className={styles.background}></div>
            <img
              src={icons.gaps}
              alt="gaps-img"
              style={{ position: "absolute", margin: "37px 0px 0px 189px" }}
            />
            <div className={styles.wrapper}>
              <div style={{ position: "absolute", top: "60px", left: "298px" }}>
                <BreadCrumbs
                  crumbTitle={"Новости"}
                  crumbSubTitle={item.title}
                />
              </div>

              <div className={styles.container__info}>
                <h1>{item.title}</h1>
                <div style={{ display: "flex", margin: "30px 0px" }}>
                  <p className={styles.date}>
                    {item.date} {item.year}
                  </p>
                  <div className={styles.share}>
                    <p>Поделиться</p>
                    <div
                      className={styles.img_wrapper}
                      style={{ marginLeft: "15px" }}
                    >
                      <img src={socials.vk} alt="vk-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={socials.faceBook} alt="facebook-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={socials.viber} alt="viber-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={socials.telegram} alt="telegram-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      {" "}
                      <img src={socials.whatsApp} alt="whatsApp-img" />
                    </div>
                  </div>
                </div>
                <img src={icons.hotel} className={styles.hotel}></img>
              </div>
              <div>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.wrapper_2}>
                  <div className={styles.background_2}></div>
                  <h3>Читайте также</h3>
                  <div className={styles.card_wrapper}>
                    {data &&
                      data
                        .slice(0, 3)
                        .map((item) => <NewsCard item={item} key={item.id} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </motion.section>
  );
};

export default DetailPage;
