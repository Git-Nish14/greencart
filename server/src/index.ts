import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db";
import "dotenv/config";
import userRouter from "./routes/userRoute";
import sellerRouter from "./routes/sellerRoute";
import connectCloudinary from "./config/cloudinary";
import productRouter from "./routes/productRoute";
import cartRouter from "./routes/cartRoute";
import addressRouter from "./routes/addressRoute";
import orderRouter from "./routes/orderRoute";
import { stripeWebhooks } from "./controllers/orderController";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:3000"];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("API is Working");
});
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

async function startServer() {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
