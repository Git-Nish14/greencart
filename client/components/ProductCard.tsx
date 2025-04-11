"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  rating?: number;
  image: StaticImageData[]; // or string[] if you’re using image URLs
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
};

interface ProductCardProps {
  product?: Product; // optional to safely handle undefined
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();

  if (!product) return null;

  const handleDecrement = () => {
    removeFromCart(product._id);
  };

  const handleIncrement = () => {
    addToCart(product._id);
  };

  const quantity = cartItems[product._id] || 0;

  return (
    product && (
      <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <Image
            src={product.image[0]}
            alt={product.name}
            width={120}
            height={120}
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Image
                  key={i}
                  src={
                    i < (product.rating ?? 0) // fallback to 0 if rating is undefined
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt="star"
                  width={14}
                  height={13}
                  className="md:w-3.5 w-3"
                />
              ))}

            <p>({product.rating ?? 0})</p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </p>

            <div
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {quantity === 0 ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium"
                  onClick={() => {
                    addToCart(product._id);
                  }}
                >
                  <Image
                    src={assets.cart_icon}
                    alt="Cart_Icon"
                    width={16}
                    height={16}
                  />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{quantity}</span>
                  <button
                    onClick={() => {
                      addToCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
