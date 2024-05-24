import { useEffect, useState } from "react";
import MainCard from "../../reusable/mainCard";
import ProductType from "../../../types/general/productCard";
import Button from "../../reusable/button";
import getProductsByTagAndText from "../../../services/product/getProductsByTagAndText";
import useContextStore from "../../context/cartContext";

type ProductsProps = {
  searchvalue: string;
  filters: string[];
  mode: "user" | "admin";
};

const Products = ({ searchvalue, filters, mode = "user" }: ProductsProps) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [productLimit, setProductLimit] = useState(8);
  const [dataNeedToUpdate, setDataNeedToUpdate] = useState(true);
  const contextStore = useContextStore();
  useEffect(() => {
    makeDataRequest();

    // setProducts([sampleItem, sampleItem, sampleItem, sampleItem, sampleItem]);
  }, [filters, searchvalue, productLimit, dataNeedToUpdate]);

  const makeDataRequest = async () => {
    const responseData = await getProductsByTagAndText({
      category: filters,
      searchText: searchvalue,
      limit: productLimit,
    });
    if (responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failure" },
      ]);
      return;
    }
    setProducts(responseData.message);
  };

  const handleLoadMore = () => {
    setProductLimit((prev) => prev + prev);
  };

  const handleDataNeedToUpdate = () => {
    setDataNeedToUpdate(!dataNeedToUpdate);
  };

  return (
    <section className="flex flex-col items-center py-4 lg:pb-8">
      <div className="flex flex-wrap w-full justify-evenly gap-y-4 py-4">
        {products !== null &&
          products.map((product, index) => (
            <MainCard
              productId={product.productId}
              brandName={product.brandName}
              productName={product.productName}
              productImage={product.productImage}
              productLink={product.productLink}
              productPrice={product.productPrice}
              customerReviwsCount={product.customerReviwsCount}
              rating={product.rating}
              productDicount={product.productDicount}
              tags={product.tags}
              key={index}
              cardType={mode == "admin" ? "admin" : "main"}
              handleDataNeedToUpdate={handleDataNeedToUpdate}
            />
          ))}
      </div>
      {products?.length == productLimit ? (
        <Button content="Load more" type="button" onClick={handleLoadMore} />
      ) : (
        <p>No more products</p>
      )}
    </section>
  );
};

export default Products;
