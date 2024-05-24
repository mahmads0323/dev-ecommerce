import { Navigate } from "react-router-dom";
import useUserAuthContext from "./context/userContext";
import { useEffect, useState } from "react";

const AdminProtectedRoute = ({ Component }) => {
  const { isAdmin, validateToken } = useUserAuthContext();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    handlePageLoaded();
  }, []);

  const handlePageLoaded = async () => {
    await validateToken();
    setPageLoaded(true);
  };

  if (isAdmin) {
    console.log("hello");
    return <Component />;
  } else if (pageLoaded) {
    return <Navigate to={"/"} />;
  }
  return <>Loading...</>;
};

export default AdminProtectedRoute;
