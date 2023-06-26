// import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import icon from "@assets/icons/login.svg";

import "@components/Authentification/LogIn.scss";
import { AuthContext } from "../contexts/AuthContext";

export default function LogIn() {
  const { handleAuth } = useContext(AuthContext);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    instance
      .post("/login", loginInfo)
      .then((res) => localStorage.setItem("token", res.data.token))
      .then(() => handleAuth())
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
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
      <ButtonRecipe icon={icon} text="Log In" handleClick={handleLogin} />
      <p>
        No Account? <span>Register</span>
        {/* span should be change to a link later */}
      </p>
    </section>
  );
}
