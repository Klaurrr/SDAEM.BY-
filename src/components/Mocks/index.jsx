import { useDispatch } from "react-redux";
import { setNews } from "../../store/slices/newsSlice";

const Mocks = () => {
  const dispatch = useDispatch();

  console.log("куку");

  const news = [
    {
      news: "Линия Сталина: суровый отдых в усадьбах на сутки",
      date: "14 Января",
      id: 1,
    },
    {
      news: "Дворцово-парковый комплекс Чапских",
      date: "15 Декабря",
      id: 2,
    },
    {
      news: "Дворцово-парковый комплекс Чапских",
      date: "14 Января",
      id: 3,
    },
    {
      news: "Аренда квартиры посуточно",
      date: "5 Августа",
      id: 4,
    },
    {
      news: "Линия Сталина: суровый отдых в усадьбах на сутки",
      date: "23 Июня",
      id: 5,
    },
  ];

  news.map((item) => {
    dispatch(setNews({ news: item }));
  });
};

export default Mocks;
