"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { assets, dummyAddress } from "@/assets/assets";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    products,
    cartItems,
    updateCartItemQuantity,
    removeFromCart,
    getCartAmount,
    getCartCount,
  } = useAppContext();

  const router = useRouter();

  const [cartArray, setCartArray] = useState<any[]>([]);
  const [address, setAddresses] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray: any[] = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  const placeOrder = async () => {
    // Order placement logic
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  if (products.length === 0 || !cartItems) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Products Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-medium">
              Shopping Cart{" "}
              <span className="text-sm text-primary">
                {getCartCount()} Items
              </span>
            </h1>
            <button
              onClick={() => {
                router.push("/products");
                window.scrollTo(0, 0);
              }}
              className="group flex items-center gap-2 text-primary font-medium text-sm"
            >
              <Image
                src={assets.arrow_right_icon_colored}
                alt="arrow"
                width={16}
                height={16}
                className="group-hover:-translate-x-1 transition"
              />
              Continue Shopping
            </button>
          </div>

          {/* Cart Header - visible on md and above */}
          <div className="hidden md:grid grid-cols-[3fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* Cart Items */}
          <div className="space-y-6 mt-4">
            {cartArray.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => router.push("/products")}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              cartArray.map((product) => {
                const quantity = cartItems[product._id];
                return (
                  <div
                    key={product._id}
                    className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr] items-center border-b pb-6"
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div
                        onClick={() => {
                          router.push(
                            `/products/${product.category.toLowerCase()}/${
                              product._id
                            }`
                          );
                          window.scrollTo(0, 0);
                        }}
                        className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gray-200 rounded bg-white p-2"
                      >
                        <Image
                          className="object-contain max-w-full max-h-full"
                          src={product.image[0] || product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-1">
                          {product.name}
                        </p>
                        <div className="text-sm text-gray-500">
                          <p className="mb-1">
                            Weight: <span>{product.weight || "N/A"}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <p>Qty:</p>
                            <select
                              className="border border-gray-300 rounded px-2 py-1 outline-none"
                              value={quantity}
                              onChange={(e) =>
                                updateCartItemQuantity(
                                  product._id,
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              {Array.from(
                                { length: Math.max(quantity, 9) },
                                (_, i) => i + 1
                              ).map((qty) => (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full md:w-auto mt-4 md:mt-0">
                      <p className="font-medium text-gray-800 md:hidden">
                        Subtotal:
                      </p>
                      <p className="text-right md:text-center font-medium">
                        {process.env.NEXT_PUBLIC_CURRENCY}
                        {(product.offerPrice * quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="w-full md:w-auto flex justify-end md:justify-center mt-4 md:mt-0">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
                      >
                        <Image
                          src={assets.remove_icon}
                          alt="remove"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-96 w-full bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          <hr className="border-gray-200 mb-4" />

          <div className="mb-6 space-y-4">
            <div>
              <p className="text-sm font-medium uppercase text-gray-600 mb-2">
                Delivery Address
              </p>
              <div className="relative">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-600">
                    {selectedAddress
                      ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                      : "No Address Found"}
                  </p>
                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-primary text-sm hover:underline cursor-pointer ml-2"
                  >
                    Change
                  </button>
                </div>
                {showAddress && (
                  <div className="absolute top-8 py-1 bg-white border border-gray-200 rounded shadow-md text-sm w-full z-10">
                    {address.map((addr, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setShowAddress(false);
                        }}
                        className="text-gray-600 p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        {addr.street}, {addr.city}, {addr.state}, {addr.country}
                      </p>
                    ))}
                    <p
                      onClick={() => {
                        router.push("/profile/add-address");
                        window.scrollTo(0, 0);
                      }}
                      className="text-primary text-center cursor-pointer p-3 hover:bg-indigo-50 font-medium"
                    >
                      + Add new address
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium uppercase text-gray-600 mb-2">
                Payment Method
              </p>
              <select
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-full border border-gray-200 rounded bg-white px-3 py-2 outline-none"
              >
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>
          </div>

          <hr className="border-gray-200 mb-4" />

          <div className="text-gray-600 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">
                {process.env.NEXT_PUBLIC_CURRENCY}
                {getCartAmount().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>
                Tax <span className="text-primary">(2%)</span>
              </span>
              <span>
                {process.env.NEXT_PUBLIC_CURRENCY}
                {(getCartAmount() * 0.02).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between pt-3 mt-2 border-t border-gray-200 text-lg font-medium text-gray-800">
              <span>Total:</span>
              <span>
                {process.env.NEXT_PUBLIC_CURRENCY}
                {(getCartAmount() * 0.98).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full py-3 mt-6 bg-primary text-white font-medium rounded hover:bg-primary/90 transition flex items-center justify-center"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
