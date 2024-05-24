import Button from "../../reusable/button";
import WeeklyDealCard from "../../reusable/weeklyDealCard";
import Dress1_Image from "/dress1.jpg";

const sampleItem = {
  dressImage: Dress1_Image,
  dressLink: "",
  discount: 60,
};

const WeeklyDeals = () => {
  const handleClick = () => {
    // later
  };
  return (
    <section className="p-4 py-10 w-full bg-lightBlue flex flex-col items-center md:flex-row">
      <div className="flex flex-col w-full items-center space-y-3 pb-4 md:flex-[100%]">
        <h3 className="font-semibold text-bunker text-lg sm:text-xl md:text-2xl md:font-bold lg:text-3xl">
          Deals of the week
        </h3>
        <p className="text-lightBunker text-xs font-bold w-[80%] text-center sm:text-sm md:text-base">
          Stock up on your wardrobe essentials with our weekly deals! This week,
          enjoy up to special discount on select jeans, dresses, and tops. Find
          trendy styles for every occasion at incredible prices. Don't miss out
          – these deals are valid for a limited time only! Head over to our
          website and refresh your look for less.{" "}
        </p>
        <Button content="Buy now >" onClick={handleClick} type="button" />
      </div>
      <div className="flex gap-4 md:h-full">
        <WeeklyDealCard
          dressImage={sampleItem.dressImage}
          dressLink={sampleItem.dressLink}
          discount={sampleItem.discount}
        />
        <WeeklyDealCard
          dressImage={sampleItem.dressImage}
          dressLink={sampleItem.dressLink}
          discount={sampleItem.discount}
        />
      </div>
    </section>
  );
};

export default WeeklyDeals;
