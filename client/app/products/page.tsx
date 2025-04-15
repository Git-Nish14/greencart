"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";

function AllProducts() {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <>
      <Navbar />
      <div className="mt-16 flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 mb-5">
        <div className="flex flex-col items-end w-full mb-6">
          <p className="text-2xl sm:text-3xl font-semibold uppercase">
            All products
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>

        {filteredProducts.filter((product) => product.inStock).length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            No products found.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AllProducts;
