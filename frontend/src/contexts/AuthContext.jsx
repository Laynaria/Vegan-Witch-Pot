import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";

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
      setUser({});
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  //   console.log(user.exp * 1000);
  //   console.log(Date.now());
  //   console.log(user);
  return (
    <AuthContext.Provider value={(user, setUser, handleAuth)}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthExport = { AuthContext, AuthContextProvider };

export default AuthExport;
