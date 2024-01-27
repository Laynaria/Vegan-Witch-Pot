import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";

function AdminUsers() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role_id !== 3) {
      navigate("/");
    } else {
      document.title = "Users - Admin - Vegan Witch Pot";

      // /users
    }
  }, []);

  return (
    <section className="AdminUsers">
      <h1>AdminUsers</h1>

      <p>AdminUsers Component</p>
    </section>
  );
}

export default AdminUsers;
