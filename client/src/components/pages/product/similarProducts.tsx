import { useEffect, useState } from "react";
import Carousel from "../../reusable/carousel";
import MainCard from "../../reusable/mainCard";
import ProductType from "../../../types/general/productCard";
import getProductsByTagAndText from "../../../services/product/getProductsByTagAndText";
import useContextStore from "../../context/cartContext";

type SimilarProductsProps = {
  productCategory: string;
};

const SimilarProducts = ({ productCategory }: SimilarProductsProps) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const contextStore = useContextStore();

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    const responseData = await getProductsByTagAndText({
      category: productCategory,
      searchText: "",
      limit: 5,
      skip: 0,
    });
    if(responseData.message.includes("error")){
      contextStore.setAlertMessages(responseData.message)
      return;
    }
    setProducts(responseData.message);
    console.log(responseData.message)
  };
  return (
    <section className="bg-lightBlue">
      <section className="flex flex-col items-center pt-8 space-y-2">
        <h2 className="font-semibold text-bunker sm:text-xl md:text-2xl md:font-bold lg:text-3xl">
          Similar Products
        </h2>
        <p className="text-lightBunker text-xs font-bold w-[80%] text-center sm:text-sm md:text-base">
          Best match from us
        </p>
      </section>
      <div className="pb-4">
        {products !== null && (
          <Carousel>
            {products.map((productItem, index) => (
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
    </section>
  );
};

export default SimilarProducts;
