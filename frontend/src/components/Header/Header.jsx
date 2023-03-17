import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logos/logo.svg";
import "./Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  window.addEventListener("scroll", () => {
    // if (window.scrollY > 100) {
    setIsOpen(false);
    // }
  });

  window.addEventListener("resize", () => {
    setIsOpen(false);
  });

  return (
    <header>
      <Link to="/" id="logoMenu">
        <img src={logo} alt="logo" />
      </Link>
      <nav className={isOpen ? "showNav" : "hideNav"}>
        <ul>
          <li>About Us</li>
          <Link to="/recipes">
            <li>Recipes</li>
          </Link>
          <li>Your Menu</li>
          <li>Contact</li>
          <li>Profile</li>
        </ul>
      </nav>
    </header>
  );
}
