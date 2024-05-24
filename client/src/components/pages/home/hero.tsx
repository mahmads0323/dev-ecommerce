import Button from "../../reusable/button";
import Hero_Image from "/hero.png";

const HeroSection = () => {
  const handleButtonClick = () => {};
  return (
    <section className="w-full py-4  bg-lightWhite flex flex-col items-center justify-center pl-4 md:flex-row-reverse md:p-0">
      <img src={Hero_Image} alt="Hero_Image" className="h-full w-[50%]" />
      <div className="flex flex-col items-center space-y-2 w-[50%]">
        <h2 className="text-xl text-bunker font-semibold sm:text-2xl text-nowrap">
          Elevate Your Style. Effortlessly.
        </h2>
        <h3 className="sm:w-[90%] text-center">
          Discover the latest trends in clothing for men and women.
        </h3>
   
          <Button
            content="Explore >>"
            type="button"
            onClick={handleButtonClick}
          />
        
      </div>
    </section>
  );
};

export default HeroSection;
