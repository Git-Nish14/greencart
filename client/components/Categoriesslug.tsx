"use client";

import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CategorySlugPage() {
  const { category } = useParams();
  const { products } = useAppContext();

  const categoryProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() === category?.toString().toLowerCase()
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 mb-5">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold capitalize text-gray-800">
            {category} Products
          </h1>
          <div className="w-16 h-1 mt-2 bg-primary rounded"></div>
        </div>

        {categoryProducts.length === 0 ? (
          <p className="text-gray-500 text-center text-sm sm:text-base py-12">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {categoryProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
