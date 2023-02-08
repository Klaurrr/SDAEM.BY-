import { ReactNode } from "react";
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
    <div style={unhide ? { width: "1440px", margin: "0 auto" } : {}}>
      {unhide && <Header />}
      {children}
      {unhide && <Footer />}
    </div>
  );
};
