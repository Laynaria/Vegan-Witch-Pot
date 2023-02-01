import Footer from "@components/Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
