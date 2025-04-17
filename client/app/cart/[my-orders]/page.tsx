"use client";

import { dummyOrders } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Package,
  Clock,
  CreditCard,
  ShoppingBag,
  Calendar,
  Tag,
} from "lucide-react";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([] as typeof dummyOrders);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-16 pb-16 max-w-6xl mx-auto px-4">
      {/* Header with decorative elements */}
      <div className="flex flex-col items-start mb-12 relative">
        <h1 className="text-2xl md:text-3xl font-medium uppercase text-gray-800 tracking-wide">
          My Orders
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full mt-2"></div>
        <div className="hidden md:block absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full z-[-1]"></div>
        <div className="hidden md:block absolute -right-8 -top-8 w-40 h-40 bg-primary/5 rounded-full z-[-1]"></div>
      </div>

      {/* Orders list */}
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
          {myOrders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Order header */}
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

              {/* Order items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Product image */}
                      <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
                        <Image
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>

                      {/* Product details */}
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
                                {item.quantity || "1"}
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

export default MyOrders;
