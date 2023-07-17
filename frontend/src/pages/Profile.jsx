import { useState, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import avatar from "@assets/icons/avatar.svg";
import hide from "@assets/icons/hide.svg";
import show from "@assets/icons/show.svg";
import icon from "@assets/icons/login.svg";

import "@components/Profile/Profile.scss";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  console.warn(setUser);

  const [isShown, setIsShown] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: user.email,
    username: user.username,
    password: "",
    confirmPassword: "",
  });

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  return (
    <section className="Profile">
      <h1>Profile</h1>
      <img className="Avatar" src={avatar} alt="avatar" />
      <form>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerInfo.email}
            onChange={handleChangeRegister}
          />
        </label>
        <label>
          <input
            type="name"
            name="username"
            placeholder="Username"
            value={registerInfo.username}
            onChange={handleChangeRegister}
          />
        </label>
      </form>
      <ButtonRecipe
        icon={icon}
        text="Register"
        handleClick={(e) => console.warn(e)}
      />

      <form>
        <label>
          <input
            type={isShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={registerInfo.password}
            onChange={handleChangeRegister}
          />
        </label>
        <label>
          <input
            type={isShown ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerInfo.confirmPassword}
            onChange={handleChangeRegister}
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
        icon={icon}
        text="Register"
        handleClick={(e) => console.warn(e)}
      />

      <ButtonRecipe
        icon={icon}
        text="Register"
        handleClick={(e) => console.warn(e)}
      />
    </section>
  );
}
