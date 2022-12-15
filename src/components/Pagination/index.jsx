import clsx from "clsx";
import React from "react";
import styles from "./pagination.module.scss";

const Pagination = ({ newsPerPage, totalNews, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.ul}>
        <>
          {pageNumbers.length > 7 ? (
            <>
              {pageNumbers.slice(0, 7).map((number) => (
                <li
                  key={number}
                  className={clsx(
                    styles.li,
                    currentPage === number && styles.li_active
                  )}
                >
                  <p onClick={() => paginate(number)}>{number}</p>
                </li>
              ))}
              <p style={{ margin: "0px 8px" }}>...</p>
              {pageNumbers
                .slice(pageNumbers.length - 1, pageNumbers.length)
                .map((number) => (
                  <li
                    key={number}
                    style={{ marginLeft: "0px" }}
                    className={clsx(
                      styles.li,
                      currentPage === number && styles.li_active
                    )}
                  >
                    <p onClick={() => paginate(number)}>{number}</p>
                  </li>
                ))}
            </>
          ) : (
            <>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={clsx(
                    styles.li,
                    currentPage === number && styles.li_active
                  )}
                >
                  <p onClick={() => paginate(number)}>{number}</p>
                </li>
              ))}
            </>
          )}
        </>
      </ul>
    </div>
  );
};

export default Pagination;
