import { useNavigate } from "react-router-dom";

import House from "assets/images/House.png";
import breadCrumbsDot from "assets/images/BreadCrumbDot.png";

import styles from "./crumbs.module.scss";

type Props = {
  crumbTitle?: string;
  crumbSubTitle?: string;
};

const BreadCrumbs: React.FC<Props> = ({ crumbTitle, crumbSubTitle }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <img src={House} alt="house-img" onClick={() => navigate("/main")} />
      <span style={{ display: crumbTitle ? "block" : "none" }}>
        <p
          onClick={() => navigate(crumbTitle === "Новости" ? "/newsList" : "")}
        >
          {crumbTitle}
        </p>
      </span>
      <img
        src={breadCrumbsDot}
        alt="breadCrumbsDot-img"
        style={{ margin: "0px 7px" }}
      />
      <p>{crumbSubTitle}</p>
    </div>
  );
};

export default BreadCrumbs;
