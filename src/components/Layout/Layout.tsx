import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  const unhide =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/";

  return (
    <div>
      {unhide && <Header />}
      {children}
      {unhide && <Footer />}
    </div>
  );
};
