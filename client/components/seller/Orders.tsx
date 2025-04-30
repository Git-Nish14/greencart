"use client";

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
import toast from "react-hot-toast";

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

interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  amount: number;
  isPaid: boolean;
  paymentType: string;
  createdAt: string;
  address: Address;
}

enum OrderStatus {
  ALL = "all",
  PAID = "paid",
  PENDING = "pending",
}

const statusColors = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

export default function Orders() {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>(
    OrderStatus.ALL
  );

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get<{
        success: boolean;
        orders: Order[];
        message?: string;
      }>("/api/order/seller");

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.items.some((it) =>
        it.product.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const toggleExpand = (id: string) =>
    setExpandedOrder((prev) => (prev === id ? null : id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Header & Controls */}
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

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
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

            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download size={18} /> <span>Export</span>
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filteredOrders.length ? (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Collapsed Header */}
                <div
                  className="flex flex-col md:flex-row md:items-center p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(order._id)}
                >
                  {/* ID & Count */}
                  <div className="flex items-center gap-4 md:w-1/3">
                    <div className="bg-emerald-100 rounded-lg p-2">
                      <Package size={24} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center">
                        Order #{order._id.slice(-8)}
                        {expandedOrder === order._id ? (
                          <ChevronUp size={16} className="ml-2" />
                        ) : (
                          <ChevronDown size={16} className="ml-2" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.items.length} item
                        {order.items.length > 1 && "s"}
                      </p>
                    </div>
                  </div>

                  {/* Customer, Address & Date */}
                  <div className="md:w-1/3 mt-3 md:mt-0 text-center">
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium text-gray-900">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.address.street}, {order.address.city}
                    </p>
                    <div className="flex items-center justify-center text-xs text-gray-500 mt-1">
                      <Calendar size={14} className="mr-1" />
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Amount & Status */}
                  <div className="flex justify-between md:justify-end md:w-1/3 mt-3 md:mt-0">
                    <div className="md:mr-8">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">
                        {currency}
                        {order.amount.toFixed(2)}
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

                {/* Expanded Details */}
                {expandedOrder === order._id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Items */}
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
                                {item.product.image[0] ? (
                                  <Image
                                    src={item.product.image[0]}
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
                                    {item.product.offerPrice.toFixed(2)} ×{" "}
                                    {item.quantity}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {currency}
                                    {(
                                      item.product.offerPrice * item.quantity
                                    ).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-4">
                        {/* Shipping Address */}
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

                        {/* Payment Info */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Payment Information
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <CreditCard size={16} />
                            <span>Method: {order.paymentType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={16} />
                            <span>
                              Date:{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Order Summary
                          </h4>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Subtotal:</span>
                            <span className="text-gray-900">
                              {currency}
                              {order.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Shipping:</span>
                            <span className="text-gray-900">
                              {currency}0.00
                            </span>
                          </div>
                          <div className="border-t border-gray-200 my-2" />
                          <div className="flex justify-between">
                            <span className="font-medium">Total:</span>
                            <span className="font-medium">
                              {currency}
                              {order.amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
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
              <Package size={32} className="text-gray-400 mx-auto mb-4" />
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
  );
}
