import { Request, Response } from "express";
import User from "../models/User";

export const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID missing" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
