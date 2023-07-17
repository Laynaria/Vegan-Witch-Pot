import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import icon from "@assets/icons/register.svg";
import hide from "@assets/icons/hide.svg";
import show from "@assets/icons/show.svg";

import "@components/Authentification/Register.scss";

export default function Register() {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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

    // We check if email exist
    instance
      .get(`/verify-email/${registerInfo.email}`)
      .then((res) => {
        if (!res.data[0]) {
          // Then we check if username exist
          instance
            .get(`/verify-username/${registerInfo.username}`)
            .then((result) => {
              if (!result.data[0]) {
                // If none exist, then we create a new user
                instance
                  .post("/register", registerInfo)
                  .then(() => navigate("/login"))
                  .catch((err) => console.error(err));
              } else {
                console.error("Username already exist");
              }
            })
            .catch((err) => console.error(err));
        } else {
          console.error("Email already exist");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={isLoading ? "hide" : "Register"}>
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
      <ButtonRecipe icon={icon} text="Register" handleClick={handleRegister} />
    </section>
  );
}
