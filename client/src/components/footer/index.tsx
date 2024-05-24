import FooterBranding from "./branding";
import Subscription from "./subscription";
import UsefulLinks from "./usefulLinks";

const Footer = () => {
  return (
    <footer className="bg-lightBunker text-lightWhite pt-4">
      <div className="lg:flex lg:flex-row-reverse lg:w-full lg:px-10 lg:py-4">
        <div className="lg:flex-[25%]">
          <Subscription />
        </div>
        <div className="lg:flex-[50%]">
          <UsefulLinks />
        </div>
        <div className="lg:flex-[25%]">
        <FooterBranding />
        </div>
      </div>
      <div className="py-2 lg:border-t lg:border-lightWhite">
        <p className="text-center">
          copyright &copy; 2024. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
