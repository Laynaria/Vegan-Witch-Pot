import { createContext, useState, useEffect, useMemo } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const handleAuth = () => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      const decodeToken = jwtDecode(getToken);
      setUser(decodeToken);
    }
  };

  const handleDelog = () => {
    const getToken = localStorage.getItem("token");

    if (getToken && user.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      setUser({});
      // reload the app, to remove next login issues
      window.location.reload();
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

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
