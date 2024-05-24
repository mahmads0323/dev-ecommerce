type ProductType = {
  productName: string;
  brandName: string;
  productDescription?: string,
  category?: [string];
  productImage: string | FormData;
  productPrice: number;
  productDicount?: number;
  previousProductImage?: string;
  tags?: [string]
};

export default ProductType;
