import { Link, NavLink } from "react-router-dom";
import Button from "../reusable/button";
import useUserAuthContext from "../context/userContext";

const BigMenu = () => {
  const userContext = useUserAuthContext();
  const handleLogout = ()=>{
    userContext.logout()
  } 
  return (
    <menu className="flex justify-between w-full pb-2 px-4 text-base">
      <div className="w-[50%] flex space-x-2 md:space-x-4 lg:px-8 lg:space-x-6">
        <NavLink
          to="/"
          className="font-semibold  cursor-pointer hover:scale-105 hover:text-bunker hover:underline hover:underline-offset-1 hover:underline-bunker"
        >
          Home
        </NavLink>
        <NavLink
          to="products"
          className="font-semibold  cursor-pointer hover:scale-105 hover:text-bunker hover:underline hover:underline-offset-1 hover:underline-bunker"
        >
          Products
        </NavLink>
        <NavLink
          to="/"
          className="font-semibold  cursor-pointer hover:scale-105 hover:text-bunker hover:underline hover:underline-offset-1 hover:underline-bunker"
        >
          About
        </NavLink>
        <NavLink
          to="/"
          className="font-semibold  cursor-pointer hover:scale-105 hover:text-bunker hover:underline hover:underline-offset-1 hover:underline-bunker"
        >
          Contact
        </NavLink>
        {userContext.isAdmin && (
          <NavLink
            to="/admin/products"
            className="font-semibold  cursor-pointer hover:scale-105 hover:text-bunker hover:underline hover:underline-offset-1 hover:underline-bunker"
          >
            Products
          </NavLink>
        )}
      </div>

      {userContext.loggedIn ? (
        <Button content="Logout" type="button" onClick={handleLogout}/>
      ) : (
        <Link to="/login">
          {" "}
          <Button content="Login/Signup" type="button" />
        </Link>
      )}
    </menu>
  );
};

export default BigMenu;
