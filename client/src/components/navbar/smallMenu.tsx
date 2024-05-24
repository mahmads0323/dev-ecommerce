import { NavLink } from "react-router-dom";
import Exit_ICON from "/circle-xmark-solid.svg";
import Bars_Icon from "/bars-solid.svg";
import { useState } from "react";

const SmallMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };
  const handleOpenMenu = () => {
    setMenuOpen(true);
  };
  return (
    <div className="flex text-lightBunker z-50">
      <button onClick={handleOpenMenu}>
        <img src={Bars_Icon} alt="Bars_Icon" className="h-5 w-5" />
      </button>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } h-screen w-full flex fixed top-0 right-0 animate-mobileMenuAnimation`}
      >
        {/* left side empty button to close menu on click */}
        <div className="flex-[30%] bg-lightWhite opacity-50">
          <button onClick={handleCloseMenu} className="h-full w-full"></button>
        </div>
        {/* right side visual menu */}
        <div className=" bg-lightWhite flex-[75%]">
          <button onClick={handleCloseMenu} className="absolute right-0 p-5">
            <img src={Exit_ICON} alt="Exit_ICON" className="h-5 w-5" />
          </button>
          <menu className="flex flex-col w-full items-center justify-center space-y-4 h-full p-1">
            <NavLink
              to="/"
              className="border-lightBunker border-b-2 font-semibold text-xl cursor-pointer hover:scale-105 hover:text-bunker hover:border-bunker"
            >
              Home
            </NavLink>
            <NavLink
              to="products"
              className="border-lightBunker border-b-2 font-semibold text-xl cursor-pointer hover:scale-105 hover:text-bunker hover:border-bunker"
            >
              Shop
            </NavLink>
            <NavLink
              to="/"
              className="border-lightBunker border-b-2 font-semibold text-xl cursor-pointer hover:scale-105 hover:text-bunker hover:border-bunker"
            >
              About
            </NavLink>
            <NavLink
              to="/"
              className="border-lightBunker border-b-2 font-semibold text-xl cursor-pointer hover:scale-105 hover:text-bunker hover:border-bunker"
            >
              Contact
            </NavLink>

            <a href="/" className="text-xs text-lightWhite ">
              <p className=" bg-lightBunker p-2 rounded-lg hover:scale-105">
                Login/Signup
              </p>
            </a>
          </menu>
        </div>
      </div>
    </div>
  );
};

export default SmallMenu;
