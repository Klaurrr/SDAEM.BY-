import React, { useEffect, useState } from "react";
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
import clsx from "clsx";

const DetailPage = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.data.news);

  const news = data && data.filter((item) => item.id === Number(id));

  return (
    <section style={{ position: "relative" }}>
      {news.length > 0 &&
        news.map((item) => (
          <>
            <div className={styles.background}></div>
            <div className={styles.wrapper}>
              <BreadCrumbs crumbTitle={"Новости"} crumbSubTitle={item.title} />
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
                      <img src={vk} alt="" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={faceBook} alt="" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={viber} alt="" />
                    </div>
                    <div className={styles.img_wrapper}>
                      <img src={telegram} alt="" />
                    </div>
                    <div className={styles.img_wrapper}>
                      {" "}
                      <img src={whatsApp} alt="" />
                    </div>
                  </div>
                </div>
                <img src={hotel} className={styles.hotel}></img>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>
          </>
        ))}
    </section>
  );
};

export default DetailPage;
