import ProductType from "../../../types/general/product";
import postProduct from "../../../services/product/postProduct";
import AddOrEditProduct from "../../reusable/addOrEditProduct";

const initialProduct: ProductType = {
  brandName: "",
  productName: "",
  productPrice: 0,
  productImage: "",
  productDicount: 0,
  productDescription: "",
  category: [""],
  previousProductImage: "",
};

const AddProduct = () => {
  return (
    <AddOrEditProduct
      productId=""
      initialProductDetails={initialProduct}
      postOrPatchProduct={postProduct}
      purpose="Add"
    />
  );
};

export default AddProduct;
