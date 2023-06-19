import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const handleAuth = () => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      const decodeToken = jwtDecode(getToken);
      setUser(decodeToken);
    }

    if (user.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      setUser({});
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

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
