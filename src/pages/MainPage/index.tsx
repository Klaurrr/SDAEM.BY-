import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import MainRent from "pages/MainPage/MainRent";
import MainChoice from "pages/MainPage/MainChoice";
import MainSearch from "pages/MainPage/MainSearch";
import MainDesc from "pages/MainPage/MainDesc";

import { useDispatch } from "react-redux";
import { setApartments } from "store/slices/searchApartmentsSlice";

import { motion } from "framer-motion";

const Main = () => {
  const [selectIsOpen, setSelectIsOpen] = useState({
    selectCity: false,
    selectRooms: false,
    selectMetro: false,
    selectDistrict: false,
  });

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/main" &&
      dispatch(setApartments({ searchedApartments: [] }));
  }, [location.pathname]);

  useLayoutEffect(() => {
    window.addEventListener("keyup", (e: any): void => {
      if (e.key === "Escape") {
        selectIsOpen.selectCity &&
          setSelectIsOpen((prev) => ({ ...prev, selectCity: false }));
        selectIsOpen.selectRooms &&
          setSelectIsOpen((prev) => ({ ...prev, selectRooms: false }));
        selectIsOpen.selectMetro &&
          setSelectIsOpen((prev) => ({ ...prev, selectMetro: false }));
        selectIsOpen.selectDistrict &&
          setSelectIsOpen((prev) => ({ ...prev, selectDistrict: false }));
        window.removeEventListener("keyup", e);
      }
    });
  }, [selectIsOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainChoice
        selectIsOpen={selectIsOpen}
        setSelectIsOpen={setSelectIsOpen}
      />
      <MainRent selectIsOpen={selectIsOpen} setSelectIsOpen={setSelectIsOpen} />
      <MainSearch />
      <MainDesc />
    </motion.div>
  );
};

export default Main;
