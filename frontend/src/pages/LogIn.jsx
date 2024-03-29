import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import icon from "@assets/icons/login.svg";

import "@components/Authentification/LogIn.scss";

export default function LogIn() {
  const { handleAuth, user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user.id !== undefined) {
        navigate("/");
      }
      setIsLoading(false);
    }, 100);
  }, []);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (email === "" || password === "") {
      return;
    }

    instance
      .post("/login", loginInfo)
      .then((res) => localStorage.setItem("token", res.data.token))
      .then(() => handleAuth())
      .then(() => navigate("/recipes"))
      .catch((err) => console.error(err));
  };

  return (
    <section className={isLoading ? "hide" : "LogIn"}>
      <h1>Log In</h1>
      <form>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={loginInfo.email}
            onChange={handleChangeLogin}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={loginInfo.password}
            onChange={handleChangeLogin}
          />
        </label>
        <p>Forgotten Password?</p>
      </form>
      <ButtonRecipe icon={icon} text="Log In" handleClick={handleLogin} />
      <p>
        No Account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}
