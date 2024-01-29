import { useContext, useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";

import "@components/Admin/AdminContacts.scss";

function AdminContacts() {
  const { user } = useContext(AuthContext);
  const [contactsMails, setContactsMails] = useState([]);
  const navigate = useNavigate();

  const getContacts = async () => {
    const { data } = await instance.get("/contacts", {
      headers: {
        Authorization: user.role_id,
      },
    });
    setContactsMails(data);
  };

  useEffect(() => {
    if (user.role_id !== 3) {
      navigate("/");
    } else {
      document.title = "Contacts - Admin - Vegan Witch Pot";

      getContacts();
    }
  }, []);

  const handleCheckbox = (e) => {
    const newMailsArray = [];

    contactsMails.forEach((mail) => {
      if (mail.id === parseInt(e.target.value, 10)) {
        newMailsArray.push({ ...mail, is_read: !mail.is_read });

        instance.put(
          `/contacts/${parseInt(e.target.value, 10)}`,
          {
            is_read: !mail.is_read,
          },
          {
            headers: {
              Authorization: user.role_id,
            },
          }
        );
      } else {
        newMailsArray.push(mail);
      }
    });

    setContactsMails(newMailsArray);
  };

  return (
    <section className="AdminContacts">
      <h1>AdminContacts</h1>
      <p>Email</p>
      <p>Read</p>
      <p>Object</p>
      {contactsMails?.map((contactMail) => (
        <Fragment key={contactMail.id}>
          <p>
            <a href={`mailto:${contactMail.email}`}>{contactMail.email}</a>
          </p>
          <p>
            <input
              type="checkbox"
              checked={contactMail.is_read}
              value={contactMail.id}
              onChange={(e) => handleCheckbox(e)}
            />
          </p>
          <p>{contactMail.object}</p>
          <p className="messages">{contactMail.message}</p>
        </Fragment>
      ))}
    </section>
  );
}

export default AdminContacts;
