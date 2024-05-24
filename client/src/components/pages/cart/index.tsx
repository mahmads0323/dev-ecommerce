import { useNavigate } from "react-router-dom";
import useContextStore from "../../context/cartContext";
import Button from "../../reusable/button";
import Total from "./total";
import CartProducts from "./cartProducts";

const CartPage = () => {
  const contextStore = useContextStore();
  const navigate = useNavigate();

  const handleGoToShop = ()=>{
    navigate("/products")
  }
  return (
    <section>
      {contextStore.cartItems.length == 0 ? (
        <div className="h-[50vh] w-[100vw] flex flex-col gap-2 justify-center items-center">
          <p>Your cart is emty</p>
          <Button content="Go to shop" type="button" onClick={handleGoToShop}/>
        </div>
      ) : (
        <>
            {/* <Total /> */}
            <CartProducts />
        </>
      )}
    </section>
  );
};

export default CartPage;
