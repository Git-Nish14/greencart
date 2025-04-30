"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import {
  Package,
  Clock,
  CreditCard,
  ShoppingBag,
  Calendar,
  Tag,
} from "lucide-react";

interface OrderProduct {
  name: string;
  category: string;
  image: string[];
  offerPrice: number;
}

interface OrderItem {
  product: OrderProduct;
  quantity: number;
}

interface Order {
  _id: string;
  paymentType: string;
  createdAt: string;
  status: string;
  amount: number;
  items: OrderItem[];
}

export default function MyOrders() {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const { currency, axios, user } = useAppContext();

  useEffect(() => {
    if (!user) return;
    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get("/api/order/user", {
          params: { userId: user._id }, // ← pass userId as query
        });
        if (data.success) {
          setMyOrders(data.orders);
        } else {
          console.error("Could not fetch orders:", data.message);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchMyOrders();
  }, [user, axios]);

  return (
    <div className="mt-16 pb-16 max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-start mb-12 relative">
        <h1 className="text-2xl md:text-3xl font-medium uppercase text-gray-800 tracking-wide">
          My Orders
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full mt-2" />
      </div>

      {myOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-500">No orders yet</h2>
          <p className="text-gray-400 mt-2">
            Your order history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm md:text-base font-medium text-gray-700">
                      Order ID:{" "}
                      <span className="font-normal text-gray-500 select-all">
                        {order._id}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {order.paymentType}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span
                      className="text-sm capitalize font-medium"
                      style={{
                        color:
                          order.status === "delivered"
                            ? "#10B981"
                            : order.status === "processing"
                            ? "#F59E0B"
                            : order.status === "shipped"
                            ? "#3B82F6"
                            : "#6B7280",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase">
                      Total Amount
                    </span>
                    <p className="text-lg font-semibold text-primary">
                      {currency} {order.amount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
                        <Image
                          src={item.product.image[0]}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h2 className="text-lg font-medium text-gray-800 mb-1">
                              {item.product.name}
                            </h2>
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-500">
                                {item.product.category}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 md:mt-0 text-right">
                            <div className="text-gray-500 text-sm mb-1">
                              Qty:{" "}
                              <span className="font-medium">
                                {item.quantity}
                              </span>
                            </div>
                            <p className="text-primary font-bold">
                              {currency}{" "}
                              {item.product.offerPrice * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
