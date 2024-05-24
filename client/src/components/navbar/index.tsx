import { useEffect, useState } from "react";
import NotificationMessage from "./notificationMessage";
import SmallMenu from "./smallMenu";
import BigMenu from "./bigMenu";

const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.outerWidth);
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setScreenWidth(e.target.outerWidth);
    });
  }, []);
  return (
    <nav className="flex justify-between p-2 items-center border-y bg-lightBlue sm:bg-transparent sm:flex-col-reverse sm:py-2 sm:px-0">
      <NotificationMessage />
      {screenWidth !== null && screenWidth >= 640 ? <BigMenu /> : <SmallMenu />}
    </nav>
  );
};

export default Navbar;
