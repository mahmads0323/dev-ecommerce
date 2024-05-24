import { useEffect, useState } from "react";
import ProductType from "../../../types/general/productCard";
import Dress1_Image from "/dress1.jpg";
import MainCard from "../../reusable/mainCard";
import ProceedPaymentButton from "./proceedPaymentButton";
import getCartProductsByIds from "../../../services/product/getCartProductsByIds";
import useContextStore from "../../context/cartContext";
import Total from "./total";

const CartProducts = () => {
  const [cartProducts, setCartProducts] = useState<ProductType[] | null>(null);
  const [productTotal, setProductTotal] = useState({
    total: 0,
    produtCount: 0,
  });
  const contextStore = useContextStore();

  const makeDataRequest = async () => {
    const productIds = contextStore.cartItems.map(
      (product) => product.productId
    );
    console.log("productIds: ", productIds);
    const responseData = await getCartProductsByIds(productIds);
    if (responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failure" },
      ]);
      return;
    }
    setCartProducts(responseData.message);
    const tempTotal = responseData.message.reduce(
      (a, b) => a + b.productPrice - b.productDicount,
      0
    );
    const tempProductCount = responseData.message.length;
    setProductTotal({ total: tempTotal, produtCount: tempProductCount });
  };
  useEffect(() => {
    makeDataRequest();
  }, []);
  return (
    <>
      <Total total={productTotal.total} produtCount={productTotal.produtCount}/>
      <section className="flex flex-col w-full items-center py-4">
        <p className="text-lg sm:font-semibold md:text-xl font-bold lg:text-2xl">
          Your Cart
        </p>
        {cartProducts === null ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-center md:py-4">
            {cartProducts.map((productItem, index) => (
              <MainCard
                productId={productItem.productId}
                cardType="cart"
                brandName={productItem.brandName}
                productName={productItem.productName}
                productImage={productItem.productImage}
                productLink={productItem.productLink}
                tags={productItem.tags}
                productPrice={productItem.productPrice}
                customerReviwsCount={productItem.customerReviwsCount}
                rating={productItem.rating}
                productDicount={productItem.productDicount}
                key={index}
              />
            ))}
          </div>
        )}
        <ProceedPaymentButton />
      </section>
    </>
  );
};

export default CartProducts;
