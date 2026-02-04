import express from "express";
import { upload } from "../config/multer";
import authSeller from "../middleware/authSeller";
import {
  addProduct,
  changeStock,
  productById,
  productList,
  editProduct,
  deleteProduct,
} from "../controllers/productController";

const productRouter = express.Router();

// Seller Protected: Add product with image uploads
productRouter.post("/add", authSeller, upload.array("images"), addProduct);

// Public: Product listing and individual product
productRouter.get("/list", productList);
productRouter.get("/:id", productById);

// Seller Protected: Update stock
productRouter.put("/stock", authSeller, changeStock);

// Seller Protected: Edit product
productRouter.put("/edit/:id", authSeller, upload.array("images"), editProduct);

// Seller Protected: Delete product
productRouter.delete("/delete/:id", authSeller, deleteProduct);

export default productRouter;
