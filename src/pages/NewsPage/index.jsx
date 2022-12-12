import { useState } from "react";
import { motion } from "framer-motion";
import BreadCrumbs from "../../components/BreadCrumbs";
import magnifier from "../../assets/images/magnifier.png";
import styles from "./news.module.scss";
import { useSelector } from "react-redux";
import NewsCard from "../../components/NewsCard";
import { useEffect } from "react";

const NewsPage = () => {
  const [value, setValue] = useState("");
  const [news, setNews] = useState([]);
  const data = useSelector((state) => state.data.news);
  window.scrollTo(0, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    setNews(data.filter((item) => item.title === value));
  };

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div>
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
      <div className={styles.card_container}>
        {news.length > 0
          ? news.map((item) => (
              <div className={styles.wrapper} key={item.id}>
                <NewsCard item={item} />
              </div>
            ))
          : data.map((item) => (
              <div className={styles.wrapper} key={item.id}>
                <NewsCard item={item} />
              </div>
            ))}
      </div>
    </motion.section>
  );
};

export default NewsPage;
