"use client";

import { assets, dummyOrders } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Package,
  Search,
  Calendar,
  CreditCard,
  Check,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
} from "lucide-react";

// Define status colors
const statusColors = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

// Enum for status filtering
enum OrderStatus {
  ALL = "all",
  PAID = "paid",
  PENDING = "pending",
}

function Orders() {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState<typeof dummyOrders>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>(
    OrderStatus.ALL
  );

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.items.some((item) =>
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      `${order.address.firstName} ${order.address.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === OrderStatus.ALL ||
      (statusFilter === OrderStatus.PAID && order.isPaid) ||
      (statusFilter === OrderStatus.PENDING && !order.isPaid);

    return searchMatch && statusMatch;
  });

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-col space-y-6">
          {/* Header and Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Filter dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as OrderStatus)
                  }
                  className="pl-10 pr-4 py-2 w-full sm:w-48 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                  <option value={OrderStatus.ALL}>All Orders</option>
                  <option value={OrderStatus.PAID}>Paid Only</option>
                  <option value={OrderStatus.PENDING}>Pending Only</option>
                </select>
                <Filter
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Export button */}
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Orders list */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Order header - always visible */}
                  <div
                    className="flex flex-col md:flex-row md:items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(order._id)}
                  >
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="bg-emerald-100 rounded-lg p-2">
                        <Package size={24} className="text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center">
                          Order #{order._id.substring(0, 8)}
                          {expandedOrder === order._id ? (
                            <ChevronUp size={16} className="ml-2" />
                          ) : (
                            <ChevronDown size={16} className="ml-2" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-1/3 mt-3 md:mt-0 md:text-center">
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="font-medium text-gray-900">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                    </div>

                    <div className="flex justify-between md:justify-end md:w-1/3 mt-3 md:mt-0">
                      <div className="md:mr-8">
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium text-gray-900">
                          {currency}
                          {order.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.isPaid
                              ? statusColors.paid
                              : statusColors.pending
                          }`}
                        >
                          {order.isPaid ? (
                            <Check size={12} className="mr-1" />
                          ) : (
                            <Clock size={12} className="mr-1" />
                          )}
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded order details */}
                  {expandedOrder === order._id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Order items */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center p-3 bg-white rounded-lg border border-gray-200"
                              >
                                <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
                                  {item.product.image ? (
                                    <Image
                                      src={assets.box_icon}
                                      alt={item.product.name}
                                      width={48}
                                      height={48}
                                      className="object-cover"
                                    />
                                  ) : (
                                    <Package
                                      size={20}
                                      className="text-gray-400"
                                    />
                                  )}
                                </div>
                                <div className="ml-4 flex-1">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {item.product.name}
                                  </h5>
                                  <div className="flex justify-between mt-1">
                                    <p className="text-xs text-gray-500">
                                      {currency}
                                      {item.product.price} × {item.quantity}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                      {currency}
                                      {(
                                        item.product.price * item.quantity
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order info */}
                        <div className="space-y-4">
                          {/* Shipping address */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Shipping Address
                            </h4>
                            <p className="text-sm text-gray-700">
                              {order.address.firstName} {order.address.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.address.street}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.address.city}, {order.address.state}{" "}
                              {order.address.zipcode}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.address.country}
                            </p>
                          </div>

                          {/* Payment info */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Payment Information
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                              <CreditCard size={16} />
                              <span>Method: {order.paymentType}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                              <Calendar size={16} />
                              <span>
                                Date:{" "}
                                {new Date(order.createdAt).toLocaleDateString()}{" "}
                              </span>
                            </div>
                          </div>

                          {/* Order summary */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Order Summary
                            </h4>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-500">Subtotal:</span>
                              <span className="text-gray-900">
                                {currency}
                                {order.amount}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-500">Shipping:</span>
                              <span className="text-gray-900">
                                {currency}0.00
                              </span>
                            </div>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between">
                              <span className="font-medium">Total:</span>
                              <span className="font-medium">
                                {currency}
                                {order.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-4 flex gap-3 justify-end">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                          Print Invoice
                        </button>
                        {!order.isPaid && (
                          <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                            Mark as Paid
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No orders found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search or filters"
                    : "Orders will appear here when customers place them"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
