import { NavLink } from "react-router-dom";
import Voulme_Icon from "/volume-high-solid.svg";

const NotificationMessage = () => {
  return (
    <div className="flex items-center space-x-1 text-xs sm:text-sm md:text-base sm:bg-lightBlue sm:w-full sm:justify-center py-1">
      <img src={Voulme_Icon} alt="Voulme_Icon" className="h-4 w-4 -rotate-12" />
      <p >Get free delievery from &#36;500.</p>
      <NavLink to="/products" className="underline text-bunker font-semibold">shop now</NavLink>
    </div>
  );
};

export default NotificationMessage;
