import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import icon from "@assets/icons/login.svg";

import "@components/Authentification/Register.scss";

export default function Register() {
  const { user } = useContext(AuthContext);

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id !== undefined) {
      navigate("/");
    }
  }, []);

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = registerInfo;

    if (password !== confirmPassword) {
      return;
    }

    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return;
    }

    instance
      .post("/register", registerInfo)
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <section className="Register">
      <h1>Register</h1>
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
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerInfo.password}
            onChange={handleChangeRegister}
          />
        </label>
        <label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerInfo.confirmPassword}
            onChange={handleChangeRegister}
          />
        </label>
        <p>
          <span>See Password</span>
        </p>
      </form>
      <ButtonRecipe icon={icon} text="Log In" handleClick={handleRegister} />
    </section>
  );
}
