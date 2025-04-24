import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  email: string;
}

const authSeller = async (req: Request, res: Response, next: NextFunction) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
