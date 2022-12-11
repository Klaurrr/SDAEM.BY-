import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
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
  window.scrollTo(0, 0);

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
              </div>
              <div>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.wrapper_2}>
                  <div className={styles.background_2}></div>
                  <h3>Читайте также</h3>
                  <div className={styles.card_wrapper}>
                    {data &&
                      data.slice(0, 3).map((item) => (
                        <div className={styles.card}>
                          <img src={hotel} alt="hotel_img" />
                          <div className={styles.card__desc}>
                            <h4>{item.title}</h4>
                            <p className={styles["card__desc-p"]}>
                              Чем заняться в выходные? Когда нет
                              безотлагательных домашних дел, а на улице хорошая
                              погода, хочется уехать из города, чтобы сменить
                              обстановку. Например, снять коттедж на сутки для
                              семьи или большой компании друзей. А...
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
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </section>
  );
};

export default DetailPage;
