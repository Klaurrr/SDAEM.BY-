import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BreadCrumbs from "../../components/BreadCrumbs";
import magnifier from "../../assets/images/magnifier.png";
import styles from "./news.module.scss";
import { useSelector } from "react-redux";
import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";

const NewsPage = () => {
  const [value, setValue] = useState("");
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(9);

  const data = useSelector((state) => state.data.news);
  window.scrollTo(0, 0);

  const lastNewsIndex = currentPage * newsPerPage;
  const firstNewsIndex = lastNewsIndex - newsPerPage;
  const currentNews = data.slice(firstNewsIndex, lastNewsIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    setNews(
      value != ""
        ? data.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.container}>
        <div className={styles.contaiter__inner}>
          <div>
            <div style={{ marginTop: "10px" }}>
              <BreadCrumbs crumbSubTitle={"Новости"} />
            </div>
            <h1>Новости</h1>
          </div>
          <div style={{ position: "relative" }}>
            <div className={styles.background}></div>
            <form className={styles.form} onSubmit={(e) => handleSearch(e)}>
              <input
                type="text"
                placeholder="Поиск по статьям"
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" className={styles.button}>
                <img src={magnifier} alt="magnifier-img" />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.card_container}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {news.length > 0
              ? news.map((item) => (
                  <div className={styles.wrapper} key={item.id}>
                    <NewsCard item={item} />
                  </div>
                ))
              : currentNews.map((item) => (
                  <div className={styles.wrapper} key={item.id}>
                    <NewsCard item={item} />
                  </div>
                ))}
          </div>
          <div style={{ marginBottom: "100px", position: "relative" }}>
            <Pagination
              dataPerPage={newsPerPage}
              totalData={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsPage;
