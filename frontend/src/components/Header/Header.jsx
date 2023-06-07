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

  const linkOnClick = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <Link to="/" id="logoMenu" onClick={linkOnClick}>
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
          <Link to="/about" onClick={linkOnClick}>
            <li>About Us</li>
          </Link>
          <Link to="/recipes" onClick={linkOnClick}>
            <li>Recipes</li>
          </Link>
          <Link to="/menu" onClick={linkOnClick}>
            <li>Your Menu</li>
          </Link>
          <Link to="/contact" onClick={linkOnClick}>
            <li>Contact</li>
          </Link>
          <Link to="/profile" onClick={linkOnClick}>
            <li>Profile</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
