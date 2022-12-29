import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import vk from "../../assets/images/vk.png";
import whatsApp from "../../assets/images/whatsApp.png";
import viber from "../../assets/images/Viber.png";
import faceBook from "../../assets/images/Facebook.png";
import telegram from "../../assets/images/telegram.png";
import hotel from "../../assets/images/hotel.png";
import styles from "./detail.module.scss";
import gaps from "../../assets/images/gaps.png";
import { motion } from "framer-motion";
import NewsCard from "../../components/NewsCard";

const DetailPage = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.data.news);

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
              src={gaps}
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
                      <img src={vk} alt="vk-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={faceBook} alt="facebook-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={viber} alt="viber-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={telegram} alt="telegram-img" />
                    </div>
                    <div className={styles.img_wrapper}>
                      {" "}
                      <img src={whatsApp} alt="whatsApp-img" />
                    </div>
                  </div>
                </div>
                <img src={hotel} className={styles.hotel}></img>
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
