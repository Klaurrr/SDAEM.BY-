import React, {
  useEffect,
  useState,
  Children,
  cloneElement,
  ReactElement,
  PropsWithChildren,
} from "react";

import carouselChevron from "../../assets/images/carouselChevron.png";

import styles from "./carousel.module.scss";

const Carousel = ({
  children,
  view,
}: {
  view: string;
  children: JSX.Element[];
}) => {
  const [pages, setPages] = useState<any>([]);
  const [offset, setOffset] = useState(0);

  const page_width = view === "card" ? 406 : 537;

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: "100%",
            minWidth: `${page_width}px`,
            maxWidth: `${page_width}px`,
          },
        });
      })
    );
  }, []);

  const handleClickLeft = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + page_width;

      return Math.min(newOffset, 0);
    });
  };
  const handleClickRight = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - page_width;

      const maxOffset = -(pages.length - 1) * page_width;

      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <div
      className={styles.container}
      id={view === "card" ? styles.card : styles.card_list}
    >
      <div className={styles.chevrons}>
        <div onClick={handleClickLeft}>
          <img src={carouselChevron} alt="carouselChevron-img" />
        </div>
        <div onClick={handleClickRight}>
          <img src={carouselChevron} alt="carouselChevron-img" />
        </div>
      </div>
      <div className={styles.window}>
        <div
          className={styles.pages_container}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {pages}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
