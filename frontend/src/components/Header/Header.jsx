import { Link } from "react-router-dom";
import logo from "@assets/logos/logo.svg";
import "./Header.scss";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>About Us</li>
          <li>Recipes</li>
          <li>Your Menu</li>
          <li>Contact</li>
          <li>Profile</li>
        </ul>
      </nav>
    </header>
  );
}
