import { useEffect, useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import Header from "@components/Header/Header";
import AsideAdminNav from "@components/AdminNav/AdminNav";
import CookiesPopUp from "@components/CookiesPopUp/CookiesPopUp";
import Footer from "@components/Footer/Footer";

export default function Layout({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const [IsCookiesPopUpShown, setIsCookiesPopUpShown] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    // if there is no token, it will remove cookie from backend if it still exists
    if (getToken === null) {
      instance
        .post("/logout")
        .then(localStorage.removeItem("token"))
        .then(() => setUser({}))
        .catch(() => console.warn("Une erreur est survenue!"));
    }
  }, [location]);

  return (
    <>
      <Header />
      {user.role_id === 3 ? <AsideAdminNav /> : ""}
      <main>
        {children}
        <Outlet />
        {IsCookiesPopUpShown ? (
          <CookiesPopUp setIsCookiesPopUpShown={setIsCookiesPopUpShown} />
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}
