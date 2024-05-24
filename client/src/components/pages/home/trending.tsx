import Person_Dress_Image from "/person-solid.svg";
import Women_Dress_Image from "/women-solid.svg";
import Shirt_Image from "/shirt-solid.svg";
import Shoe_Image from "/shoe-prints-solid.svg";

type TrendingCardProps = {
  path: string;
  contentImage: string;
  content: string;
};

const TrendingCard = ({ path, contentImage, content }: TrendingCardProps) => {
  return (
    <a
      href={path}
      className="bg-lightWhite p-2 flex flex-col items-center justify-between hover:scale-105"
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={contentImage}
          alt="contentImage"
          className="w-[30%] md:w-[25%] lg:w-[20%]"
        />
      </div>
      <p>{content}</p>
    </a>
  );
};

const TrendingCategory = () => {
  return (
    <section className="w-full flex flex-col items-center space-y-4 py-4">
      <p className="font-semibold text-customBlue sm:text-xl md:text-2xl md:font-bold lg:text-3xl">
        Trending categories
      </p>

      <div className="flex w-full gap-x-2 justify-around overflow-y-hidden overflow-x-auto p-4 md:px-10 ">
        <TrendingCard
          path="/"
          contentImage={Person_Dress_Image}
          content="Men"
        />
        <TrendingCard path="/" contentImage={Shoe_Image} content="Shoes" />
        <TrendingCard
          path="/"
          contentImage={Women_Dress_Image}
          content="Women"
        />
        <TrendingCard path="/" contentImage={Shirt_Image} content="Shirts" />
        <TrendingCard
          path="/"
          contentImage={Person_Dress_Image}
          content="Men"
        />
      </div>
    </section>
  );
};

export default TrendingCategory;
