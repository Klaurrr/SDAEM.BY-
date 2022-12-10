import styles from "./crumbs.module.scss";
import House from "../../assets/images/House.png";
import breadCrumbsDot from "../../assets/images/BreadCrumbDot.png";
import { useNavigate } from "react-router-dom";

const BreadCrumbs = ({ crumbTitle, crumbSubTitle }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className={styles.wrapper}>
        <img src={House} alt="house-img" onClick={() => navigate('/main')}/>
        <span>
          <p onClick={() => navigate(crumbTitle === "Новости" && "/newsList")}>
            {crumbTitle}
          </p>
        </span>
        <img src={breadCrumbsDot} alt="breadCrumbsDot-img" />
        <p>{crumbSubTitle}</p>
      </div>
    </section>
  );
};

export default BreadCrumbs;
