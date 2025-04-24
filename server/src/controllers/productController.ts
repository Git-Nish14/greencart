import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product";

// ------------------ Add Product ------------------
// POST /api/product/add
export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = Array.isArray(req.files) ? req.files : [];

    const imagesURL = await Promise.all(
      images.map(async (item: any) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesURL });

    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error: any) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Get All Products ------------------
// GET /api/product/list
export const productList = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error: any) {
    console.error("Product List Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Get Single Product by ID ------------------
// GET /api/product/:id
export const productById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error: any) {
    console.error("Get Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Change Product Stock ------------------
// PUT /api/product/stock
export const changeStock = async (req: Request, res: Response) => {
  try {
    const { id, inStock } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    await Product.findByIdAndUpdate(id, { inStock });

    res.status(200).json({ success: true, message: "Stock Updated" });
  } catch (error: any) {
    console.error("Change Stock Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
