import express from "express";
import authUser from "../middleware/authUser";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateOrderStatus,
  markOrderPaid,
} from "../controllers/orderController";
import authSeller from "../middleware/authSeller";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.put("/status", authSeller, updateOrderStatus);
orderRouter.put("/mark-paid", authSeller, markOrderPaid);

export default orderRouter;
