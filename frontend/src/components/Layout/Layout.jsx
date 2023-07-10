import { useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

export default function Layout({ children }) {
  const { setUser } = useContext(AuthContext);
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
      <main>
        {children}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
