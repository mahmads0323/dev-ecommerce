import { useEffect, useState } from "react";
import Logo from "/logo.png";
import Search_Icon from "/magnifying-glass-solid.svg";
import Phone_Icaon from "/phone-solid.svg";
import Cart_Icon from "/cart-shopping-solid.svg";
import useContextStore from "./context/cartContext";
import { Link } from "react-router-dom";

const TopBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [productCount, setProductCount] = useState(0);
  const contextStore = useContextStore();

  useEffect(()=>{
    setProductCount(contextStore.cartItems.length)

  }, [contextStore.cartItems])

  const handleChangeSeachValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="flex items-center justify-between p-2 md:px-4 lg:px-8">
      <img
        src={Logo}
        alt="topbar_logo"
        className="h-8 w-24 md:h-10 md:w-32 lg:h-12 lg:w-36"
      />

      <div className="sm:flex sm:justify-between flex-grow px-4 lg:px-8">
        <label
          htmlFor="searchValue"
          className="flex space-x-2 bg-white items-center px-2 rounded-lg border-[1px] border-black focus-within:border-[2px]"
        >
          <input
            type="text"
            value={searchValue}
            id="searchValue"
            placeholder="Search products"
            onChange={handleChangeSeachValue}
            className="focus:outline-none w-[90%] md:py-1"
          />
          <img
            src={Search_Icon}
            alt="Search_Icon"
            className="h-4 w-4 md:h-5 md:w-5"
          />
        </label>
        <div className="hidden sm:flex sm:items-center">
          <img
            src={Phone_Icaon}
            alt="Phone_Icaon"
            className="h-4 w-4 md:w-5 md:5"
          />
          <a href="tel:+92 123456789" className="md:text-base">
            +92 123456789
          </a>
        </div>
      </div>

      <div className="relative">
        <Link to="/cart"><img src={Cart_Icon} alt="Cart_Icon" className="h-8 w-8" /></Link>
        {productCount > 0 && (
          <div className="bg-green-600 text-black flex items-center justify-center absolute top-0 right-0 h-4 w-4 rounded-full text-[10px] font-semibold md:h-5 md:w-5 ">
            <p>{productCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
