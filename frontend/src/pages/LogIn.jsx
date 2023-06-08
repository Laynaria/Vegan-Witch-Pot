// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import instance from "@services/instance";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import icon from "@assets/icons/login.svg";

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
            placeholder="email"
            value={loginInfo.email}
            onChange={handleChangeLogin}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={loginInfo.password}
            onChange={handleChangeLogin}
          />
        </label>
      </form>
      <ButtonRecipe
        icon={icon}
        text="Log In"
        // handleClick={handleSubmit}
      />
    </section>
  );
}
