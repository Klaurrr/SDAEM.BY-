import React, { useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";

import { useSelector } from "react-redux";

import Card from "../../components/Card";

import styles from "./bookMarks.module.scss";
import Pagination from "../../components/Pagination";

const BookMarks = () => {
  const [liActive, setLiActive] = useState("Квартиры");

  const [currentPage, setCurrentPage] = useState(1);
  const [apartmentsPerPage] = useState(6);

  const lastApartmentsIndex = currentPage * apartmentsPerPage;
  const firstApartmentsIndex = lastApartmentsIndex - apartmentsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const bookMarks = useSelector((state) => state.bookMarks.bookMarks);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className={styles.background}></div>
        <div className={styles.col_1}>
          <BreadCrumbs crumbSubTitle="Закладки" />
          <h2>Ваши закладки</h2>
        </div>
      </div>
      <div className={styles.col_2}>
        <div className={styles.menu}>
          <ul>
            <li
              className={liActive === "Квартиры" && styles.active}
              onClick={(e) => setLiActive(e.target.outerText)}
            >
              Квартиры
            </li>
            <li
              className={liActive === "Коттеджи/Усадьбы" && styles.active}
              onClick={(e) => setLiActive(e.target.outerText)}
            >
              Коттеджи/Усадьбы
            </li>
            <li
              className={liActive === "Бани" && styles.active}
              onClick={(e) => setLiActive(e.target.outerText)}
            >
              Бани
            </li>
            <li
              className={liActive === "Авто напрокат" && styles.active}
              onClick={(e) => setLiActive(e.target.outerText)}
            >
              Авто напрокат
            </li>
          </ul>
        </div>
        <div className={styles.wrapper}>
          {bookMarks.length > 0 ? (
            bookMarks
              .slice(firstApartmentsIndex, lastApartmentsIndex)
              .map((flat) => <Card data={[flat]} />)
          ) : (
            <h1>Закладки пусты...</h1>
          )}
        </div>
        <div
          style={{
            marginBottom: "100px",
            display: bookMarks.length > 0 ? "block" : "none",
          }}
        >
          <Pagination
            dataPerPage={apartmentsPerPage}
            totalData={bookMarks.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default BookMarks;
