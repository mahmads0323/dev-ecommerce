import { useEffect, useRef, useState } from "react";
import ProductType from "../../types/general/product";
import availableFilter from "./availableFilters";
import Button from "./button";
import postImage from "../../services/image/postImage";
import useContextStore from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const GET_IMAGE_API =
  import.meta.env.IMAGE_API || "http://localhost:8000/image";

type PromisResponse = {
  message?: string;
  produt?: ProductType;
};

type AddOrEditProductProps = {
  initialProductDetails: ProductType;
  postOrPatchProduct: (
    productDetails: ProductType,
    productId?: string
  ) => Promise<PromisResponse>;
  productId: string;
  purpose: "Add" | "Edit";
};

const initialErrorDetails = {
  productImage: "",
  productName: "",
  brandName: "",
  productDescription: "",
  productPrice: "",
  productDicount: "",
  category: "",
};

const AddOrEditProduct = ({
  initialProductDetails,
  postOrPatchProduct,
  productId,
  purpose,
}: AddOrEditProductProps) => {
  const [productDetails, setProductDetails] = useState<ProductType>(
    initialProductDetails
  );
  const [imageSource, setImageSource] = useState("");
  const productImageRef = useRef<HTMLInputElement | null>(null);
  const [errorDetails, setErrorDetails] = useState(initialErrorDetails);
  const contextStore = useContextStore();
  const [buttonText, setButtonText] = useState("Add Product");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (purpose == "Edit") {
      setImageSource(`${GET_IMAGE_API}/${productDetails.productImage}`);
    }
  } ,[]);
  const handleChangeProductImage = () => {
    if (errorDetails.productImage != "") {
      setErrorDetails({ ...errorDetails, productImage: "" });
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setImageSource(e.target.result.toString());
      }
    };
    if (
      productImageRef &&
      productImageRef.current &&
      productImageRef.current?.files
    ) {
      reader.readAsDataURL(productImageRef.current?.files[0]);
      setProductDetails({
        ...productDetails,
        productImage: productImageRef.current?.files[0].toString(),
      });
    }
    // reader.readAsDataURL(e.target.files[0]);
  };

  const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorDetails.productName !== "") {
      setErrorDetails({ ...errorDetails, productName: "" });
    }
    setProductDetails({ ...productDetails, productName: e.target.value });
  };

  const handleChangeBrandName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorDetails.brandName !== "") {
      setErrorDetails({ ...errorDetails, brandName: "" });
    }
    setProductDetails({ ...productDetails, brandName: e.target.value });
  };

  const handleChangeProductDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (errorDetails.productDescription !== "") {
      setErrorDetails({ ...errorDetails, productDescription: "" });
    }
    setProductDetails({
      ...productDetails,
      productDescription: e.target.value,
    });
  };

  const handleChangeProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorDetails.productPrice !== "") {
      setErrorDetails({ ...errorDetails, productPrice: "" });
    }
    setProductDetails({
      ...productDetails,
      productPrice: Number(e.target.value),
    });
  };

  const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorDetails.productDicount !== "") {
      setErrorDetails({ ...errorDetails, productDicount: "" });
    }
    setProductDetails({
      ...productDetails,
      productDicount: Number(e.target.value),
    });
  };

  const handleChangeProductCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (errorDetails.category != "") {
      setErrorDetails({ ...errorDetails, category: "" });
    }
    if (e.target.value == "none") {
      setProductDetails({ ...productDetails, category: [""] });
      return;
    }
    setProductDetails({ ...productDetails, category: [e.target.value] });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(productDetails)
    // product image validation
    if (productDetails.productImage.toString() == "") {
      setErrorDetails({
        ...errorDetails,
        productImage: "please choose an image",
      });
      return;
    }
    // product name validation
    if (productDetails.productName.length < 5) {
      setErrorDetails({
        ...errorDetails,
        productName: "please provide a valid dress name",
      });
      return;
    }
    if (productDetails.productName.length > 30) {
      setErrorDetails({
        ...errorDetails,
        productName: "name too long ( >30 )",
      });
      return;
    }
    // brand name validation
    if (productDetails.brandName == "") {
      setErrorDetails({
        ...errorDetails,
        brandName: "please provide a valid brand name",
      });
      return;
    }
    if (productDetails.brandName.length > 30) {
      setErrorDetails({ ...errorDetails, brandName: "name too long ( >30 )" });
      return;
    }
    // product description validation
    if (
      productDetails.productDescription &&
      productDetails.productDescription?.length < 50
    ) {
      setErrorDetails({
        ...errorDetails,
        productDescription: "details too short ( <50 )",
      });
      return;
    }
    if (
      productDetails.productDescription &&
      productDetails.productDescription.length > 1000
    ) {
      setErrorDetails({
        ...errorDetails,
        productDescription: "details too long ( >1000 )",
      });
      return;
    }
    // price validation
    if (productDetails.productPrice < 0) {
      setErrorDetails({ ...errorDetails, productPrice: "price not valid" });
      return;
    }
    // discount validation
    if (
      productDetails.productDicount &&
      (productDetails.productDicount < 0 ||
        productDetails.productDicount > productDetails.productPrice)
    ) {
      setErrorDetails({ ...errorDetails, productDicount: "dicount not valid" });
      return;
    }
    // tag validation
    if (productDetails.category && productDetails.category[0] == "") {
      setErrorDetails({ ...errorDetails, category: "please choose a tag" });
      return;
    }
    // changing button
    setButtonText("Adding...");
    setButtonDisabled(true);
    // post image
    if (productDetails.productImage != initialProductDetails.productImage) {
      const imageResponseData = await postImage(productImageRef);
      if (imageResponseData?.message?.includes("error")) {
        contextStore.setAlertMessages((prev) => [
          ...prev,
          { message: imageResponseData.message, boxType: "failue" },
        ]);
        setButtonText("Add prodcut");
        setButtonDisabled(false);
        return;
      }
      productDetails.productImage = imageResponseData.message;
    }
    // post product
    const responseData = await postOrPatchProduct(productDetails, productId);
    if (responseData.message && responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failue" },
      ]);
      setButtonText("Add prodcut");
      setButtonDisabled(false);
      return;
    }
    console.log("responseData: ", responseData);
    setButtonText("Add prodcut");
    setButtonDisabled(false);
    navigate(`/product/${responseData.message}`);
  };

  return (
    <section className="flex justify-center py-4" onSubmit={handleSubmit}>
      <div className="w-[90vw] flex flex-col items-center space-y-4 sm:w-[80vw] md:w-[65vw] lg:w-[50vw]">
        <p className="font-semibold text-customBlue sm:text-xl md:text-2xl md:font-bold lg:text-3xl">
          Add Product
        </p>

        <form
          action=""
          className="w-full flex flex-col items-center text-bunker"
        >
          <label className="w-full">
            <p className="font-medium">Product Image</p>
            <div className="w-full p-4 border border-lightBunker flex flex-col items-center">
              {imageSource !== "" && (
                <img src={imageSource} alt="" className="h-min w-min py-4" />
              )}
              <input
                type="file"
                accept="images/*"
                onChange={handleChangeProductImage}
                ref={productImageRef}
              />
              <p className="text-xs text-red-500">
                {errorDetails?.productImage != "" && errorDetails?.productImage}
              </p>
            </div>
          </label>

          <label className="w-full flex flex-col py-4">
            <p>Product Name</p>
            <input
              type="text"
              value={productDetails.productName}
              onChange={handleChangeProductName}
              className="bg-white border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter product name"
            />
            <p className="text-xs text-red-500">
              {errorDetails?.productName != "" && errorDetails?.productName}
            </p>
          </label>

          <label className="w-full flex flex-col py-4">
            <p>Brand Name</p>
            <input
              type="text"
              value={productDetails.brandName}
              onChange={handleChangeBrandName}
              className="bg-white border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter brand name"
            />
            <p className="text-xs text-red-500">
              {errorDetails?.brandName != "" && errorDetails?.brandName}
            </p>
          </label>

          <label className="w-full flex flex-col py-4">
            <p>Product Description</p>
            <input
              type="text"
              value={productDetails.productDescription}
              onChange={handleChangeProductDescription}
              className="bg-white border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter product details"
            />
            <p className="text-xs text-red-500">
              {errorDetails?.productDescription != "" &&
                errorDetails?.productDescription}
            </p>
          </label>

          <label className="w-full flex flex-col py-4">
            <p>Product Price</p>
            <input
              type="number"
              value={
                productDetails.productPrice !== 0
                  ? productDetails.productPrice
                  : ""
              }
              onChange={handleChangeProductPrice}
              className="bg-white border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter product price"
            />
            <p className="text-xs text-red-500">
              {errorDetails?.productPrice != "" && errorDetails?.productPrice}
            </p>
          </label>

          <label className="w-full flex flex-col py-4">
            <p>
              Product Discount{" "}
              <span className="text-xs md:text-sm">(optional)</span>
            </p>
            <input
              type="number"
              value={
                productDetails.productDicount !== 0
                  ? productDetails.productDicount
                  : ""
              }
              onChange={handleChangeDiscount}
              className="bg-white border-b border-bunker focus:outline-none focus:border-b-2"
              placeholder="Enter product discount"
            />
            <p className="text-xs text-red-500">
              {errorDetails?.productDicount != "" &&
                errorDetails?.productDicount}
            </p>
          </label>

          <label className="w-full flex flex-col items-start py-4 overflow-hidden">
            <p>Product Tag</p>
            <select
              className="border border-lightBunker px-2 py-1 rounded-md"
              onChange={handleChangeProductCategory}
              defaultValue={
                productDetails.category && productDetails.category[0] === ""
                  ? "none"
                  : productDetails.category && productDetails.category[0]
              }
            >
              <option value={"none"}>-- none --</option>
              {availableFilter.map((filter, index) => (
                <option key={index} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
            <p className="text-xs text-red-500">
              {errorDetails?.category != "" && errorDetails?.category}
            </p>
          </label>
          <Button
            type="submit"
            content={buttonText}
            classNames="!mt-2"
            disabled={buttonDisabled}
          />
        </form>
      </div>
    </section>
  );
};

export default AddOrEditProduct;
