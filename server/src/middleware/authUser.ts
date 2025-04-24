import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  // Add any other fields your JWT contains
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;
