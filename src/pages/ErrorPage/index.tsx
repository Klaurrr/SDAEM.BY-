import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import icons from "assets/icons";

import { motion } from "framer-motion";
import styles from "./error.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img src={icons.gaps} alt="gaps-img" className={styles.gaps} />
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <h1>Ошибка 404</h1>
          <p>
            Возможно, у вас опечатка в адресе
            <br /> страницы, или её просто не существует
          </p>
          <button onClick={() => navigate("/main")}>
            <img src={icons.house} alt="house-img" />
            <p>Вернуться на главную</p>
          </button>
        </div>
        <p className={styles.number}>404</p>
      </div>
      <img
        src={icons.gapsWhite}
        alt="gapsWhite-img"
        className={styles.gaps_2}
      />
    </motion.div>
  );
};

export default ErrorPage;
