import Logo2 from "/logo2.png";
import Facebook_Icon from "/facebook.svg";
import Twitter_Icon from "/square-x-twitter.svg";
import Linkedin_Icon from "/linkedin.svg";
import Youtube_Icon from "/square-youtube.svg";
import Instagram_Icon from "/square-instagram.svg";
import { Link } from "react-router-dom";

const FooterBranding = () => {
  return (
    <div className="flex flex-col text-nowrap space-y-1 p-2 py-4 border-b border-lightWhite sm:items-center lg:border-none lg:p-0">
      <img
        src={Logo2}
        alt="Logo2"
        className="h-8 w-24 md:h-10 md:w-32 lg:h-12 lg:w-36"
      />
      <address>Address: Street 1, city ABC, state XYZ, Pakistan</address>

      <div>
        <p>Email: sample@example.com</p>
        <p>Phone: +92 123456789</p>
      </div>

      <div className="flex w-full space-x-1 sm:justify-center">
        <Link to={"/"}>
          <img src={Facebook_Icon} alt="Facebook_Icon" className="h-4 w-4 hover:scale-105 md:h-6 md:w-6" />
        </Link>
        <Link to={"/"}>
          <img src={Twitter_Icon} alt="Twitter_Icon" className="h-4 w-4 hover:scale-105 md:h-6 md:w-6"/>
        </Link>
        <Link to={"/"}>
          <img src={Linkedin_Icon} alt="Linkedin_Icon" className="h-4 w-4 hover:scale-105 md:h-6 md:w-6"/>
        </Link>
        <Link to={"/"}>
          <img src={Youtube_Icon} alt="Youtube_Icon" className="h-4 w-4 hover:scale-105 md:h-6 md:w-6"/>
        </Link>
        <Link to={"/"}>
          <img src={Instagram_Icon} alt="Instagram_Icon" className="h-4 w-4 hover:scale-105 md:h-6 md:w-6"/>
        </Link>
      </div>
    </div>
  );
};

export default FooterBranding;
