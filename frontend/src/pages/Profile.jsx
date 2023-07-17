import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import instance from "@services/instance";

import avatar from "@assets/icons/avatar.svg";
import hide from "@assets/icons/hide.svg";
import show from "@assets/icons/show.svg";
import editIcon from "@assets/icons/wand.svg";
import changeIcon from "@assets/icons/register.svg";
import disconnectIcon from "@assets/icons/login.svg";
import deleteIcon from "@assets/icons/broom.svg";

import "@components/Profile/Profile.scss";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  console.warn(setUser);

  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [editInfo, setEditInfo] = useState({
    email: user.email,
    username: user.username,
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user.id === undefined) {
        navigate("/login");
      }
      setIsLoading(false);
    }, 100);
  }, []);

  const handleEditInfo = (e) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();

    const { email, username } = editInfo;

    if (email === "" || username === "") {
      return;
    }

    instance
      .put(`/users/${user.id}`, editInfo)
      .then(() =>
        setUser(...user, { username: editInfo.username, email: editInfo.email })
      )
      .then(() =>
        setEditInfo({
          email: user.email,
          username: user.username,
          password: "",
          confirmPassword: "",
        })
      )
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = editInfo;

    if (password !== confirmPassword) {
      return;
    }

    if (password === "" || confirmPassword === "") {
      return;
    }

    instance
      .put(`/users/edit-password/${user.id}`, editInfo)
      .then(() =>
        setEditInfo({
          email: user.email,
          username: user.username,
          password: "",
          confirmPassword: "",
        })
      )
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleDisconnect = (e) => {
    e.preventDefault();
    instance
      .post("/logout")
      .then(localStorage.removeItem("token"))
      .then(() => setUser({}))
      .then(() => navigate("/"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
  };

  return (
    <section className={isLoading ? "hide" : "Profile"}>
      <h1>Profile</h1>

      <form className="AvatarForm">
        <img className="Avatar" src={avatar} alt="avatar" />
      </form>

      <form>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editInfo.email}
            onChange={handleEditInfo}
          />
        </label>

        <label>
          <input
            type="name"
            name="username"
            placeholder="Username"
            value={editInfo.username}
            onChange={handleEditInfo}
          />
        </label>
      </form>

      <ButtonRecipe
        icon={editIcon}
        text="Edit"
        handleClick={handleSubmitInfo}
      />

      <form>
        <label>
          <input
            type={isShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={editInfo.password}
            onChange={handleEditInfo}
          />
        </label>

        <label>
          <input
            type={isShown ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={editInfo.confirmPassword}
            onChange={handleEditInfo}
          />
        </label>

        <p>
          <span onClick={() => setIsShown(!isShown)} aria-hidden="true">
            <img
              src={isShown ? hide : show}
              alt={isShown ? "hide password" : "show password"}
            />
            {isShown ? "Hide Password" : "Show Password"}
          </span>
        </p>
      </form>

      <ButtonRecipe
        icon={changeIcon}
        text="Change Password"
        handleClick={handleSubmitPassword}
      />

      <ButtonRecipe
        icon={disconnectIcon}
        text="Disconnect"
        handleClick={handleDisconnect}
      />

      <ButtonRecipe
        icon={deleteIcon}
        text="Delete Account"
        handleClick={handleDeleteUser}
      />
    </section>
  );
}
