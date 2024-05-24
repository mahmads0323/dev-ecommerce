import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
      index: true,
      text: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDicount: {
      type: Number,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    reviews: {
      type: Number,
    },
  },
  { timestamps: true, autoIndex: true }
);

const PRODUCT = mongoose.model("product", productSchema);

export default PRODUCT;
