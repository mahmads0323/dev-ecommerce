import { Link } from "react-router-dom";

type WeeklyDealCardProps = {
  dressImage: string;
  dressLink: string;
  discount: number;
};

const WeeklyDealCard = ({
  dressImage,
  dressLink,
  discount,
}: WeeklyDealCardProps) => {
  return (
    <div className="relative md:h-60">
      <Link to={dressLink}>
        <img src={dressImage} alt="dressImage" className="h-full w-full object-fill"/>
        <div className="absolute bottom-2 left-2 bg-lightWhite rounded-md text-xs sm:p-1 sm:text-sm md:text-base">
            <p>01 --- Summer sale</p>
          <p>{discount}% OFF</p>
        </div>
      </Link>
    </div>
  );
};

export default WeeklyDealCard;
