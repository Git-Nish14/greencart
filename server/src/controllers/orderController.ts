import { Request, Response } from "express";
import Product from "../models/Product";
import Order from "../models/Order";

export const placeOrderCOD = async (req: Request, res: Response) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Fetch all product details in parallel
    const productIds = items.map((item: any) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a map for easy access
    const productMap = new Map();
    products.forEach((product: any) =>
      productMap.set(product._id.toString(), product)
    );

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = productMap.get(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    // Create order
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get Orders by User Id : /api/order/user
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createAt: -1 });
    res.json({ success: true, orders });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get All orders ( for seller/ admin ): /api/order/seller
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createAt: -1 });
    res.json({ success: true, orders });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
