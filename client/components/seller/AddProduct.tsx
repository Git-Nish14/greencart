"use client";

import { assets, categories } from "@/assets/assets";
import Image from "next/image";
import React, { useState, FormEvent, useContext } from "react";
import {
  Image as ImageIcon,
  X,
  Plus,
  DollarSign,
  Tag,
  FileText,
  CheckCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

// Assuming you have an AppContext with currency
import { AppContext } from "@/context/AppContext";

const AddProduct: React.FC = () => {
  const { currency } = useContext(AppContext) || { currency: "$" };
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (index: number, file: File | null) => {
    if (!file) return;

    // Create a copy of the arrays
    const updatedFiles = [...files];
    const updatedFileUrls = [...fileUrls];

    // Update file and create URL
    updatedFiles[index] = file;
    updatedFileUrls[index] = URL.createObjectURL(file);

    // Update state
    setFiles(updatedFiles);
    setFileUrls(updatedFileUrls);
  };

  const removeImage = (index: number) => {
    // Create copies of the arrays
    const updatedFiles = [...files];
    const updatedFileUrls = [...fileUrls];

    // Remove file and URL
    if (updatedFileUrls[index]) {
      URL.revokeObjectURL(updatedFileUrls[index]);
    }

    updatedFiles[index] = undefined as any;
    updatedFileUrls[index] = undefined as any;

    // Update state
    setFiles(updatedFiles);
    setFileUrls(updatedFileUrls);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      // Here would be your actual submission logic
      alert("Product added successfully!");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-500 text-white p-5">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Add New Product</h1>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Plus size={20} />
              </div>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="p-6">
            {/* Product Images */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon size={18} className="text-emerald-500" />
                <h2 className="text-lg font-medium text-gray-800">
                  Product Images
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Upload up to 4 images of your product
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="relative border border-dashed rounded-lg overflow-hidden aspect-square"
                    >
                      {fileUrls[index] ? (
                        <>
                          <Image
                            src={fileUrls[index]}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <label
                          htmlFor={`image${index}`}
                          className="flex flex-col items-center justify-center h-full cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <input
                            id={`image${index}`}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                              handleImageChange(
                                index,
                                e.target.files?.[0] || null
                              )
                            }
                          />
                          <Plus size={24} className="text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">
                            Add image
                          </span>
                        </label>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="product-name"
                  className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700"
                >
                  <Tag size={16} className="text-emerald-500" />
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Premium Wireless Headphones"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="product-description"
                  className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700"
                >
                  <FileText size={16} className="text-emerald-500" />
                  Product Description
                </label>
                <textarea
                  id="product-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product in detail..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((item, idx) => (
                        <option key={idx} value={item.path}>
                          {item.path}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="product-price"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Regular Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">{currency}</span>
                    </div>
                    <input
                      id="product-price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="offer-price"
                    className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700"
                  >
                    Offer Price
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Optional
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">{currency}</span>
                    </div>
                    <input
                      id="offer-price"
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Add Product</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
