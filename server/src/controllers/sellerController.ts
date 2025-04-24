import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const sellerLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({ success: true, message: "Logged In" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error: any) {
    console.error("Seller Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//seller is auth : /api/seller/is-auth
export const isSellerAuth = async (req: Request, res: Response) => {
  try {
    return res.json({ success: true });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Logout Seller : /api/seller/logout
export const sellerLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
