import { useState, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import icon from "@assets/icons/login.svg";

export default function Contact() {
  const { user } = useContext(AuthContext);

  const [contactMail, setContactMail] = useState({
    email: user.email ? user.email : "",
    object: "",
    message: "",
  });

  const handleChangeMail = (e) => {
    const { name, value } = e.target;
    setContactMail({ ...contactMail, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, object, message } = contactMail;

    if (email === "" || object === "" || message === "") {
      return;
    }

    instance
      .post("/contacts", contactMail)
      .then(() =>
        setContactMail({
          email: user.email ? user.email : "",
          object: "",
          message: "",
        })
      )
      .catch((err) => console.error(err));
  };

  return (
    <section>
      <h1>Contact</h1>
      <form>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contactMail.email}
            onChange={handleChangeMail}
          />
        </label>

        <label>
          <input
            type="text"
            name="object"
            placeholder="Object"
            value={contactMail.object}
            onChange={handleChangeMail}
          />
        </label>

        <label>
          <input
            type="text"
            name="message"
            placeholder="Message"
            value={contactMail.message}
            onChange={handleChangeMail}
          />
        </label>
      </form>
      <ButtonRecipe icon={icon} text="Log In" handleClick={handleSubmit} />
    </section>
  );
}
