import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
// import RecipeCheckbox from "@components/Recipes/RecipeCheckbox";

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

  return (
    <section
      className="AdminContacts"
      style={{
        maxWidth: "80%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        margin: "5rem",
      }}
    >
      <h1 style={{ marginBottom: "5rem" }}>AdminContacts</h1>
      {contactsMails?.map((contactMail) => (
        <p
          key={contactMail.id}
          style={{ display: "flex", gap: "4rem", textAlign: "left" }}
        >
          <span>email: {contactMail.email},</span>
          <input type="checkbox" checked={contactMail.is_read} />
          <span>message: {contactMail.message},</span>
          <span>object: {contactMail.object}</span>
          {/* RecipeChecbox component */}
          {/* <RecipeCheckbox value={contactMail.is_read} /> */}
        </p>
      ))}
    </section>
  );
}

export default AdminContacts;
