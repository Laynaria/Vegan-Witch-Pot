import { Link } from "react-router-dom";
import "./AdminNav.scss";

import buttonIcon from "@assets/logos/logo_mini.svg";

export default function AdminNav() {
  return (
    <nav className="AdminNav">
      <ul>
        <Link to="/Admin-Dashboard/Recipes">
          <li>
            <img src={buttonIcon} alt="" />
            <span>Recipes</span>
          </li>
        </Link>
        <Link to="/Admin-Dashboard/Ingredients">
          <li>
            <img src={buttonIcon} alt="" />
            <span>Ingredients</span>
          </li>
        </Link>
        <Link to="/Admin-Dashboard/Users">
          <li>
            <img src={buttonIcon} alt="" />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/Admin-Dashboard/Contacts">
          <li>
            <img src={buttonIcon} alt="" />
            <span>Contacts</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
