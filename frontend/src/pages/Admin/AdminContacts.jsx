import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";

function AdminContacts() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role_id !== 3) {
      navigate("/");
    } else {
      document.title = "Contacts - Admin - Vegan Witch Pot";
    }
  }, []);

  return (
    <section className="AdminContacts">
      <h1>AdminContacts</h1>

      <p>AdminContacts Component</p>
    </section>
  );
}

export default AdminContacts;
