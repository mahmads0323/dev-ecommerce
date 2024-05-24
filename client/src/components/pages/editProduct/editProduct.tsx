import { useParams } from "react-router-dom";
import AddOrEditProduct from "../../reusable/addOrEditProduct";
import ProductType from "../../../types/general/product";
import { useEffect, useState } from "react";
import getEditProductById from "../../../services/product/getEditProductById";
import patchProductById from "../../../services/product/patchProductById";
import useContextStore from "../../context/cartContext";

const PRODUCTID_LENGTH = 24;

const EditProduct = () => {
  const [initialProductDetails, setInitialProductDetails] =
    useState<ProductType | null>(null);
  const params = useParams();
  const productId = params.productId;
  const contextStore = useContextStore();
  const [message, setMessage] = useState("Loding...");

  const fetchData = async (productId: string) => {
    if (!productId || productId.length !== PRODUCTID_LENGTH) {
      return;
    }
    const responseData = await getEditProductById(productId);
    if (responseData.product) {
      //   console.log("respnse: ", responseData.product);
      setInitialProductDetails(responseData.product);
    }
    if (responseData.message && responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failure" },
      ]);
      setMessage("No product found!");
      setInitialProductDetails(null);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchData(productId);
    }
  }, [productId]);

  if (!initialProductDetails) {
    return (
      <div className="flex h-[50vh] w-full justify-center items-center">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <>
      {productId && initialProductDetails && (
        <AddOrEditProduct
          productId={productId}
          initialProductDetails={initialProductDetails}
          postOrPatchProduct={patchProductById}
          purpose="Edit"
        />
      )}
    </>
  );
};

export default EditProduct;
