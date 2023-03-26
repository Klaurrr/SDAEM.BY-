import { useEffect, useState, Children, cloneElement } from "react";

import chevrons from "assets/chevrons";

import styles from "./carousel.module.scss";

type Props = {
    view: string;
    children: JSX.Element[];
};

const Carousel: React.FC<Props> = ({ children, view }) => {
    const [pages, setPages] = useState<any>([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const page_width = view === "card" ? 406 : 537;

    useEffect(() => {
        setCurrentPage(Math.abs(offset / page_width));
    }, [offset]);

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
            console.log(currentOffset);
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
                    <img
                        src={chevrons.carouselChevron}
                        alt="carouselChevron-img"
                    />
                </div>
                <div onClick={handleClickRight}>
                    <img
                        src={chevrons.carouselChevron}
                        alt="carouselChevron-img"
                    />
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
            <div className={styles.dots}>
                {pages.map((_item: undefined, index: string) => (
                    <button
                        key={index}
                        onClick={() => {
                            setOffset(-index * page_width);
                            setCurrentPage(Number(index));
                        }}
                        className={
                            index == String(currentPage)
                                ? styles.button_active
                                : styles.button
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
