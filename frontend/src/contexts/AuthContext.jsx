import { createContext, useState, useMemo } from "react";
import jwtDecode from "jwt-decode";
import instance from "@services/instance";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const handleAuth = () => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      const decodeToken = jwtDecode(getToken);

      instance
        .get(`/users/${decodeToken.id}`)
        .then((res) => setUser({ ...decodeToken, ...res.data }))
        .catch(() => console.warn("Une erreur est survenue!"));
    }
  };

  const handleDelog = () => {
    const getToken = localStorage.getItem("token");

    if (getToken && user.exp * 1000 < Date.now()) {
      instance
        .post("/logout")
        .then(localStorage.removeItem("token"))
        .then(() => setUser({}))
        // reload the app, to remove next login issues
        .then(() => window.location.reload())
        .catch(() => console.warn("Une erreur est survenue!"));
    }
  };

  // test setInterval to handleDelog every minute
  setInterval(handleDelog, 60000 * 1);

  const userMemo = useMemo(
    () => ({
      user,
      setUser,
      handleAuth,
    }),
    [user, setUser, handleAuth]
  );

  return (
    <AuthContext.Provider value={userMemo}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
