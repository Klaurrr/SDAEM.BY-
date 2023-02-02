import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Logged") === "true"
      ? localStorage.getItem("Logged") === "true"
      : sessionStorage.getItem("Logged")
  );

  const unhide =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/";

  return (
    <div>
      {unhide && (
        <Header isLoggedIn={!!isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      {children}
      {unhide && <Footer />}
    </div>
  );
};
