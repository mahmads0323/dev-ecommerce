import { createContext, useContext, useState, useEffect } from "react";
import postVerifyToken from "../../services/user/postVerifyToken";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cookie, setCookie, deleteCookie] = useCookies(["token"]);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(()=>{
  //   validateToken();
  // }, [])

  const validateToken = async () => {
    const tokenToVerify = cookie.token;
    if (!tokenToVerify) {
      setLoggedIn(false);
      setIsAdmin(false);
      return;
    }
    const responseData = await postVerifyToken(tokenToVerify);
    if (!responseData.message.tokenVerified) {
      setLoggedIn(responseData.message.tokenVerified); // set user no logged in and return
      return;
    }
    setLoggedIn(responseData.message.tokenVerified);
    if (responseData.message.role.includes("admin")) {
      setIsAdmin(true);
      console.log("cookie: ", cookie);
    }
  };

  const logout = () => {
    deleteCookie("token")
    setLoggedIn(false);
    setIsAdmin(false);
  };

  const loginAndSignup = async (token: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    setCookie("token", token, {
      path: "/",
      expires: new Date(expirationDate),
    });
    const responseData = await postVerifyToken(token);
    if (!responseData.message.tokenVerified) {
      setLoggedIn(responseData.message.tokenVerified); // set user no logged in and return
      return;
    }
    setLoggedIn(responseData.message.tokenVerified);
    if (responseData.message.role.includes("admin")) {
      setIsAdmin(true);
      console.log("login cookie: ", cookie);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        cookie,
        setCookie,
        deleteCookie,
        loggedIn,
        validateToken,
        loginAndSignup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useUserAuthContext = () => useContext(AuthContext);

export default useUserAuthContext;
