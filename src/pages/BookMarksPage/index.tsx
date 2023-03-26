import { useState } from "react";

import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import Pagination from "components/Pagination";

import { useSelector } from "react-redux";

import { IBookMarks } from "types/IBookMarks";

import { motion } from "framer-motion";
import styles from "./bookMarks.module.scss";

const BookMarks = () => {
  const [liActive, setLiActive] = useState("Квартиры");

  const [currentPage, setCurrentPage] = useState(1);
  const [apartmentsPerPage] = useState(6);

  const lastApartmentsIndex = currentPage * apartmentsPerPage;
  const firstApartmentsIndex = lastApartmentsIndex - apartmentsPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const bookMarks = useSelector(
    (state: { bookMarks: IBookMarks }) => state.bookMarks.bookMarks
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
            {["Квартиры", "Коттеджи/Усадьбы", "Бани", "Авто напрокат"].map(
              (name) => (
                <li
                  className={liActive === name && styles.active}
                  onClick={() => setLiActive(name)}
                >
                  {name}
                </li>
              )
            )}
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
    </motion.section>
  );
};

export default BookMarks;
