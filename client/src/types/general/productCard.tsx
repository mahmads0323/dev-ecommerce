
type ProductCardType = {
  productName: string;
  brandName: string;
  productDescription?: string,
  productId: string,
  tags?: string[];
  productLink?: string;
  productImage: string;
  productPrice: number;
  rating?: number;
  customerReviwsCount?: number;
  productDicount?: number;
  cardType?: "main" | "cart" | "admin",
  category?: string
};

export default ProductCardType;
