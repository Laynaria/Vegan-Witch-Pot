// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import instance from "@services/instance";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import icon from "@assets/icons/login.svg";

import "@components/Authentification/LogIn.scss";

export default function LogIn() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <section className="Authentification">
      <h1>Log In</h1>
      <form>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleChangeLogin}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChangeLogin}
          />
        </label>
        <p>Forgotten Password?</p>
      </form>
      <ButtonRecipe
        icon={icon}
        text="Log In"
        // handleClick={handleSubmit}
      />
      <p>
        No Account? <span>Register</span>
        {/* span should be change to a link later */}
      </p>
    </section>
  );
}
