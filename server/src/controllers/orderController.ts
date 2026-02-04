import { Request, Response } from "express";
import Product from "../models/Product";
import Order from "../models/Order";
import Stripe from "stripe";
import User from "../models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/** Load products and return a Map<productId, productDoc> */
async function loadProductMap(ids: string[]) {
  const products = await Product.find({ _id: { $in: ids } });
  return products.reduce((map, p) => {
    map.set(p._id.toString(), p);
    return map;
  }, new Map<string, any>());
}

/** Compute subtotal + 2% tax */
function computeTotalAmount(
  items: { product: string; quantity: number }[],
  productMap: Map<string, any>,
) {
  let subtotal = 0;
  for (const item of items) {
    const prod = productMap.get(item.product);
    if (!prod) throw new Error(`Product ${item.product} not found`);
    subtotal += prod.offerPrice * item.quantity;
  }
  const tax = Math.round(subtotal * 0.02);
  return subtotal + tax;
}

/** Stripe line_items builder */
function buildLineItems(
  items: { product: string; quantity: number }[],
  productMap: Map<string, any>,
) {
  return items.map((item) => {
    const prod = productMap.get(item.product);
    if (!prod) {
      throw new Error(`Product not found for item ${item.product}`);
    }
    return {
      price_data: {
        currency: "usd",
        product_data: { name: prod.name },
        unit_amount: Math.round(prod.offerPrice * 100), // Price in cents
      },
      quantity: item.quantity,
    };
  });
}

/** COD Order */
export const placeOrderCOD = async (req: Request, res: Response) => {
  try {
    const { userId, items, address } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0 || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId, items or address" });
    }

    const productIds = items.map((it: any) => it.product);
    const productMap = await loadProductMap(productIds);
    const amount = computeTotalAmount(items, productMap);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    return res.status(201).json({ success: true, order });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/** Stripe Order */
export const placeOrderStripe = async (req: Request, res: Response) => {
  try {
    const { userId, items, address } = req.body;
    const origin = req.headers.origin as string;

    if (!userId || !Array.isArray(items) || items.length === 0 || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId, items or address" });
    }
    if (!origin) {
      return res
        .status(400)
        .json({ success: false, message: "Missing origin header" });
    }

    const productIds = items.map((it: any) => it.product);
    const productMap = await loadProductMap(productIds);
    const amount = computeTotalAmount(items, productMap);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    const line_items = buildLineItems(items, productMap);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=cart/my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
        paymentType: "Online",
      },
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/** Stripe Webhook */
export const stripeWebhooks = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("⚠️  Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (
        !session.metadata ||
        !session.metadata.orderId ||
        !session.metadata.userId
      ) {
        console.warn("⚠️ Missing metadata in Stripe session");
        return res
          .status(400)
          .json({ success: false, message: "Missing metadata in session" });
      }

      const { orderId, userId } = session.metadata;

      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata || !session.metadata.orderId) {
        console.warn("⚠️ Missing orderId in expired session");
        return res
          .status(400)
          .json({ success: false, message: "Missing orderId in session" });
      }

      const { orderId } = session.metadata;

      await Order.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
};

/** Get orders by user */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId =
      (req as any).user?._id?.toString() || (req.query.userId as string);
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    const orders = await Order.find({ userId })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/** Get all orders (admin) */
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/** Update order status */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }

    const validStatuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, message: "Order status updated", order });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/** Mark COD order as paid */
export const markOrderPaid = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { isPaid: true },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, message: "Order marked as paid", order });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
