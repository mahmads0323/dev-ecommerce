import { useEffect, useState } from "react";
import ProductType from "../../../types/general/productCard";
import Star from "../../reusable/star";
import Button from "../../reusable/button";
import Comments from "./comment";
import SimilarProducts from "./similarProducts";
import useContextStore from "../../context/cartContext";
import { useNavigate, useParams } from "react-router-dom";
import getProductById from "../../../services/product/getProductById";

const PRODUCTID_LENGTH = 24;
const GET_IMAGE_API = import.meta.env.IMAGE_API || "http://localhost:8000/image"

const Product = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [filledStars, setFilledStars] = useState<number | null>(null);
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const contextStore = useContextStore();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    fetchProduct();
    // setProduct(sampleItem);
  }, []);

  useEffect(() => {
    if (product != null) {
      if (product.rating == 0) {
        setFilledStars(0);
        return;
      }
      product.rating && setFilledStars(Math.floor(product.rating));
    }
  }, [product]);

  const fetchProduct = async () => {
    if (!productId || productId.length !== PRODUCTID_LENGTH) {
      return;
    }
    const responseData = await getProductById(productId);
    if (responseData.product) {
      setProduct(responseData.product);
    } else if (responseData.message && responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failure" },
      ]);
      setProduct(null);
    }
    // console.log("responseData: ", responseData);
  };

  const handleAddToCartProduct = () => {
    contextStore.setCartItems(prev => [...prev, {productId: productId}]);
    setIsProductAddedToCart(true);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (!productId) {
    return (
      <div className="flex h-[50vh] w-full justify-center items-center">
        <p>no product id</p>
      </div>
    );
  }

  if (productId.length !== PRODUCTID_LENGTH) {
    return (
      <div className="flex h-[50vh] w-full justify-center items-center">
        <p>invalid product id</p>
      </div>
    );
  }

  return (
    <>
      <section className="flex justify-center items-center py-10 md:py-20">
        {product !== null && (
          <div className="w-full py-4 flex flex-col items-center md:flex-row md:p-4 md:space-x-2 md:items-end md:[w-90%] lg:w-[70%]">
            <div className="w-[90%] p-2 border border-lightBlue rounded-md sm:w-[70vw] md:h-full md:w-[40%] lg:w-[25vw]">
              <img
                src={`${GET_IMAGE_API}/${product.productImage}`}
                alt="dressImage"
                className="h-40 w-full object-fill md:h-52"
              />
            </div>
            <div className="flex flex-col items-start w-full p-6 sm:w-[70vw] sm:p-2">
              <h3 className="text-base font-medium">
                Product:{" "}
                <span className="text-lg font-semibold">
                  {product.productName}
                </span>
              </h3>
              <h2 className="text-base font-medium">
                Brand: <span className="font-normal">{product.brandName}</span>
              </h2>
              <p className="text-base font-medium w-full break-words">
                Description:{" "}
                <span className="font-normal">
                  {product.productDescription}
                </span>
              </p>
              <div className="flex">
                <span className="text-base font-medium">Rating</span>:&nbsp;
                {filledStars !== null && (
                  <>
                    {[...Array(filledStars)].map((_, index) => (
                      <Star key={index} filled={true} />
                    ))}
                    {[...Array(5 - filledStars)].map((_, index) => (
                      <Star key={filledStars + index} filled={false} />
                    ))}
                    &nbsp;({filledStars}
                    {filledStars > 0 && "+"})
                  </>
                )}
              </div>
              <p>
                <span className="text-base font-medium">Price: </span>
                {product.productDicount &&
                product.productDicount > 0 &&
                product.productDicount < 100 ? (
                  <>
                    <span className="text-lightBunker line-through">
                      &#36;{product.productPrice}
                    </span>
                    <span>
                      &nbsp;&nbsp;&#36;
                      {product.productPrice -
                        (product.productDicount / 100) * product.productPrice}
                      &nbsp;({product.productDicount}% discount)
                    </span>
                  </>
                ) : (
                  <span>{product.productPrice}</span>
                )}
              </p>
              <div className="w-full flex justify-center py-2 md:justify-start">
                {isProductAddedToCart ? (
                  <Button
                    content="Go to cart"
                    onClick={handleGoToCart}
                    type="button"
                    usage="secondry"
                    classNames="border border-lightBunker"
                  />
                ) : (
                  <Button
                    content="Add to cart"
                    onClick={handleAddToCartProduct}
                    type="button"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      {product !== null && product.category && <SimilarProducts productCategory={product.category}/>}
      {/* comments added here to get product Id fro comment */}
      {product !== null && <Comments productIdForComments={productId} />}
    </>
  );
};

export default Product;
