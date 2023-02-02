import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
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
