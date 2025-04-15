"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { FC } from "react";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  description: string[];
  image: string[];
}

const ProductDetailsPage: FC = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { products, currency, addToCart, removeFromCart, cartItems } =
    useAppContext();

  const product = products.find((item) => item._id === id);
  const quantity = product ? cartItems[product._id] || 0 : 0;

  const relatedProducts = products
    .filter(
      (item) =>
        product &&
        item.category === product.category &&
        item._id !== product._id
    )
    .slice(0, 5);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
            <p className="mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dull transition"
            >
              Browse Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <button
            onClick={() => router.push("/")}
            className="hover:text-primary transition"
          >
            Home
          </button>{" "}
          {" / "}
          <button
            onClick={() => router.push("/products")}
            className="hover:text-primary transition"
          >
            Products
          </button>{" "}
          {" / "}
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
            {/* Product Image */}
            <div className="flex-1 flex justify-center items-start">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-xl object-contain"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3 capitalize">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {currency}
                  {product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <>
                    <span className="text-gray-400 line-through text-lg">
                      {currency}
                      {product.price}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {Math.round(
                        ((product.price - product.offerPrice) / product.price) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <h2 className="font-semibold text-gray-800 mb-3">
                  Description
                </h2>
                <ul className="space-y-2 text-gray-600">
                  {product.description.map((line, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cart Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {quantity === 0 ? (
                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/40 text-primary px-8 py-3 rounded-full transition w-full sm:w-auto"
                  >
                    <Image
                      src={assets.cart_icon}
                      alt="Cart Icon"
                      width={20}
                      height={20}
                    />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between border border-gray-200 rounded-full p-1">
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                      aria-label="Decrease quantity"
                    >
                      <span className="text-xl font-semibold">−</span>
                    </button>
                    <span className="text-lg font-medium w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                      aria-label="Increase quantity"
                    >
                      <span className="text-xl font-semibold">+</span>
                    </button>
                  </div>
                )}

                <button
                  className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-full transition w-full sm:w-auto"
                  onClick={() => {
                    /* Add wishlist functionality */
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Related Products
            </h2>
            <button
              onClick={() => router.push("/products")}
              className="text-primary font-medium hover:underline flex items-center"
            >
              See All <span className="ml-1">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
