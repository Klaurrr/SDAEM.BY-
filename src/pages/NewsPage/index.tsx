import { useState } from "react";

import NewsCard from "../../components/NewsCard";
import Pagination from "../../components/Pagination";
import BreadCrumbs from "../../components/BreadCrumbs";

import magnifier from "../../assets/images/magnifier.png";

import { useSelector } from "react-redux";

import { IState } from "types/IState";
import { INews } from "types/INews";

import { motion } from "framer-motion";
import styles from "./news.module.scss";

const NewsPage = () => {

  const [value, setValue] = useState("");
  const [news, setNews] = useState<INews[]>([]);

  const data = useSelector((state: IState) => state.data.news);
  window.scrollTo(0, 0);

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(9);

  const lastNewsIndex = currentPage * newsPerPage;
  const firstNewsIndex = lastNewsIndex - newsPerPage;
  const currentNews = data.slice(firstNewsIndex, lastNewsIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: any) => {
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
              ? news.slice(firstNewsIndex, lastNewsIndex).map((item) => (
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
              totalData={news.length > 0 ? news.length : data.length}
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
