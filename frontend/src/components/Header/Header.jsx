import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logos/logo.svg";
import "./Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const burgerHandler = () => {
    setIsOpen(!isOpen);
  };

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
      <div>
        <label htmlFor="burger" className="burger">
          <input
            id="burger"
            type="checkbox"
            onChange={burgerHandler}
            checked={isOpen ? true : ""}
          />
          <span />
          <span />
          <span />
        </label>
      </div>
      <nav className={isOpen ? "showNav" : "hideNav"}>
        <ul>
          <Link to="/about">
            <li>About Us</li>
          </Link>
          <Link to="/recipes">
            <li>Recipes</li>
          </Link>
          <Link to="/menu">
            <li>Your Menu</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
