import Star from "./star";
import Button from "./button";
import ProductType from "../../types/general/productCard";
import { useNavigate } from "react-router-dom";
import useContextStore from "../context/cartContext";
import deleteProductById from "../../services/product/deleteProductById";

const GET_IMAGE_API =
  import.meta.env.IMAGE_API || "http://localhost:8000/image";

const CLIENT_SIDE_PRODUCT_PREFIX =
  import.meta.env.CLIENT_SIDE_PRODUCT_PREFIX || "/product";

interface MainCardProps extends ProductType {
  handleDataNeedToUpdate?: () => void;
}

const MainCard = ({
  productName,
  brandName,
  tags,
  productId,
  productImage,
  rating = 0,
  productPrice,
  customerReviwsCount,
  productDicount,
  cardType = "main",
  handleDataNeedToUpdate,
}: MainCardProps) => {
  const { setCartItems, cartItems } = useContextStore();
  const navigate = useNavigate();
  const filledStars = Math.floor(rating);
  const handleShopNow = () => {
    navigate(`${CLIENT_SIDE_PRODUCT_PREFIX}/${productId}`);
  };
  const handleRemoveItemFromCart = () => {
    const tempProducts = cartItems.filter((id: string) => productId == id);
    setCartItems((prev) => tempProducts);
  };
  const handleDeleteItem = async () => {
    const responseData = await deleteProductById(productId);
    if (handleDataNeedToUpdate) {
      handleDataNeedToUpdate();
    }
    console.log("delete response data: ", responseData);
  };
  return (
    <div className="flex justify-center">
      <div className="relative m-2 bg-lightWhite p-2 rounded-lg border border-lightBlue h-min w-[80vw] text-center sm:h-80 sm:w-[45vw] md:h-90 md:w-[30vw] lg:h-min lg:w-[23vw] ">
        <img
          src={`${GET_IMAGE_API}/${productImage}`}
          alt="dressImage"
          className=" w-full object-fill rounded-sm pb-2 min-h-[150px] "
        />

        <div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-full items-start text-bunker">
              <h4 className="font-semibold text-sm">{productName}</h4>
              <h3 className="text-xs">{brandName}</h3>
            </div>
            <div className="flex space-x-1">
              {[...Array(filledStars)].map((_, index) => (
                <Star key={index} filled={true} />
              ))}
              {[...Array(5 - filledStars)].map((_, index) => (
                <Star key={5 - filledStars + index} filled={false} />
              ))}
            </div>
          </div>
          <p className="w-full text-left py-2">
            {customerReviwsCount && customerReviwsCount > 1000
              ? (customerReviwsCount % 1000) + "k"
              : customerReviwsCount}
            reviews
          </p>
          <div className="flex w-full justify-between items-center">
            {productDicount && productDicount > 0 ? (
              <p>
                Price: &#36;
                <span className="font-semibold">
                  {productPrice - productDicount}
                </span>
                <span className="text-sm line-through">{productPrice}</span>
              </p>
            ) : (
              <p>Price: &#36;{productPrice}</p>
            )}
            {cardType == "main" ? (
              <Button
                content="Shop now &gt;"
                type="button"
                onClick={handleShopNow}
              />
            ) : cardType == "cart" ? (
              <Button
                content="remove"
                type="button"
                onClick={handleRemoveItemFromCart}
                usage="delete"
              />
            ) : (
              <Button
                content="Delete"
                type="button"
                onClick={handleDeleteItem}
                usage="delete"
              />
            )}
          </div>
        </div>

        {/* Tags */}
        {tags?.includes("new") && (
          <div className="absolute top-[5%] left-0 bg-green-500 px-2 rounded-r-lg">
            <p>new</p>
          </div>
        )}
        {tags?.includes("discount") &&
          productDicount != undefined &&
          productDicount > 0 &&
          productDicount < 100 && (
            <div className="absolute top-[5%] right-0 bg-lightBlue px-2 rounded-l-lg">
              <p>{productDicount}% off</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default MainCard;
