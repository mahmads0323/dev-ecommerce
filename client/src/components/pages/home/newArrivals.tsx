import { useEffect, useState } from "react";
import Carousel from "../../reusable/carousel";
import MainCard from "../../reusable/mainCard";
import NewArrivalFilters from "./newArrivalFilters";
import ProductType from "../../../types/general/productCard";
import getProductsByTagAndText from "../../../services/product/getProductsByTagAndText";
import useContextStore from "../../context/cartContext";

const NewArrivals = () => {
  const [productsOne, setProductsOne] = useState<ProductType[] | null>(null);
  const [productsTwo, setProductsTwo] = useState<ProductType[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([""]);
  const contextStore = useContextStore();
  useEffect(() => {
    makeDataRequest(setProductsOne);
    makeDataRequest(setProductsTwo, 5);
  }, [selectedCategory]);

  const makeDataRequest = async (
    updateProducts: (value: React.SetStateAction<ProductType[] | null>) => void,
    skip: number = 0
  ) => {
    const responseData = await getProductsByTagAndText({
      category: selectedCategory,
      limit: 5,
      skip: skip,
    });
    console.log("responseData: ", responseData);
    if (responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failure" },
      ]);
      return;
    }
    updateProducts(responseData.message);
  };

  const handleSelectCategory = (item: string) => {
    if (selectedCategory[0] === item) {
      setSelectedCategory([""]);
      return;
    }
    setSelectedCategory([item]);
  };
  return (
    <>
      <section className="flex flex-col items-center py-4 space-y-2">
        <h2 className="font-semibold text-customBlue sm:text-xl md:text-2xl md:font-bold lg:text-3xl">
          New arrivals
        </h2>
        <p className="text-bunker text-xs font-bold w-[80%] text-center sm:text-sm md:text-base">
          Sneak peek! Our newest arrivals are here.
        </p>
        <NewArrivalFilters
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
      </section>
      <div className="py-4">
        {productsOne !== null && (
          <Carousel>
            {productsOne.map((productItem, index) => (
              <MainCard
                productId={productItem.productId}
                brandName={productItem.brandName}
                productName={productItem.productName}
                productImage={productItem.productImage}
                productLink={productItem.productLink}
                productPrice={productItem.productPrice}
                customerReviwsCount={productItem.customerReviwsCount}
                rating={productItem.rating}
                tags={productItem.tags}
                productDicount={productItem.productDicount}
                key={index}
              />
            ))}
          </Carousel>
        )}
      </div>
      <div className="py-4">
        {productsTwo !== null && (
          <Carousel>
            {productsTwo.map((productItem, index) => (
              <MainCard
                productId={productItem.productId}
                brandName={productItem.brandName}
                productName={productItem.productName}
                productImage={productItem.productImage}
                productLink={productItem.productLink}
                productPrice={productItem.productPrice}
                customerReviwsCount={productItem.customerReviwsCount}
                rating={productItem.rating}
                tags={productItem.tags}
                productDicount={productItem.productDicount}
                key={index}
              />
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default NewArrivals;
