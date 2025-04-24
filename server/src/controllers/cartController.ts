// update User CartData : /api/cart/update
import { Request, Response } from "express";
import User from "../models/User";

export const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error: any) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
