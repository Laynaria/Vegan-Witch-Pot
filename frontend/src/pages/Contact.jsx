import { useState, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import icon from "@assets/icons/scroll.svg";

import "@components/Contact/Contact.scss";

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
    <section className="Contact">
      <h1>Contact</h1>
      <form>
        <label>
          <input
            disabled={user.email ? "disabled" : ""}
            readOnly={user.email ? "readonly" : ""}
            type="email"
            name="email"
            placeholder="Email*"
            autoComplete="email"
            value={contactMail.email}
            onChange={handleChangeMail}
          />
        </label>

        <label>
          <input
            type="text"
            name="object"
            placeholder="Object*"
            autoComplete="off"
            value={contactMail.object}
            onChange={handleChangeMail}
          />
        </label>

        <label>
          <textarea
            type="text"
            name="message"
            placeholder="Message*"
            autoComplete="off"
            value={contactMail.message}
            onChange={handleChangeMail}
          />
        </label>
      </form>

      <ButtonRecipe icon={icon} text="Send" handleClick={handleSubmit} />
    </section>
  );
}
