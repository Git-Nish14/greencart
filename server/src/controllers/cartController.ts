import { Request, Response } from "express";
import User from "../models/User";
import Product from "../models/Product";

export const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID missing" });
    }

    // Validate cart items - check if products exist and are in stock
    const productIds = Object.keys(cartItems);
    if (productIds.length > 0) {
      const products = await Product.find({ _id: { $in: productIds } });
      const invalidProducts = [];
      const outOfStockProducts = [];

      for (const productId of productIds) {
        const product = products.find((p) => p._id.toString() === productId);
        if (!product) {
          invalidProducts.push(productId);
        } else if (!product.inStock) {
          outOfStockProducts.push(product.name);
        }
      }

      if (invalidProducts.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Some products in cart no longer exist",
        });
      }

      if (outOfStockProducts.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Some products are out of stock: ${outOfStockProducts.join(", ")}`,
        });
      }
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
