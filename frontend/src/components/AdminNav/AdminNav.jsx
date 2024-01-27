import { Link } from "react-router-dom";
import recipesIcon from "@assets/logos/logo_mini.svg";
import ingredientsIcon from "@assets/icons/spoon.svg";
import userIcon from "@assets/icons/potion.svg";
import contactsIcon from "@assets/icons/scroll.svg";
import "./AdminNav.scss";

export default function AdminNav() {
  return (
    <nav className="AdminNav">
      <ul>
        <Link to="/admin-dashboard/recipes">
          <li>
            <img src={recipesIcon} alt="Recipes Dashboard" />
            <span>Recipes</span>
          </li>
        </Link>
        <Link to="/admin-dashboard/ingredients">
          <li>
            <img src={ingredientsIcon} alt="Ingredients Dashboard" />
            <span>Ingredients</span>
          </li>
        </Link>
        <Link to="/admin-dashboard/users">
          <li>
            <img src={userIcon} alt="Users Dashboard" />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/admin-dashboard/contacts">
          <li>
            <img src={contactsIcon} alt="Contacts Dashboard" />
            <span>Contacts</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
