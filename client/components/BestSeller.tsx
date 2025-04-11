"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

function BestSeller() {
  const { products } = useAppContext();

  return (
    <section className="mt-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
        Best Sellers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
}

export default BestSeller;
