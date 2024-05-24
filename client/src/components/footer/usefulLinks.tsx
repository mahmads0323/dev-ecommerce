import CustomFooterLink from "./customFooterLink";

const UsefulLinks = () => {
  return (
    <div className="flex justify-around border-b border-lightWhite text-xs text-nowrap md:text-sm lg:text-base lg:border-none lg:p-0">
      <div className="flex flex-col space-y-2 items-start p-4">
        <h5 className="font-bold sm:text-sm md:text-base lg:text-xl">Support</h5>
        <ul className="list-none">
          <li>
            <CustomFooterLink content="Contact us" contentLink="/" />
          </li>
          <li>
            <CustomFooterLink content="About us" contentLink="/" />
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2 items-start p-4">
        <h5 className="font-bold sm:text-sm md:text-base lg:text-xl">Shop</h5>
        <ul>
          <li>
            <CustomFooterLink content="Men's cloth" contentLink="/" />
          </li>
          <li>
            <CustomFooterLink content="Women's cloth" contentLink="/" />
          </li>
          <li>
            <CustomFooterLink content="Men's Accesories" contentLink="/" />
          </li>
          <li>
            <CustomFooterLink content="Women's Accesories" contentLink="/" />
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2 items-start p-4">
        <h5 className="font-bold sm:text-sm md:text-base lg:text-xl">Company</h5>
        <ul>
          <li>
          <CustomFooterLink content="About us" contentLink="/"/>
          </li>
          <li>
          <CustomFooterLink content="Login/Signup" contentLink="/"/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UsefulLinks;
