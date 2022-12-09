import React from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return <div>Это детальная страница под id: {id}</div>;
};

export default DetailPage;
