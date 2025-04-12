"use client";
import React, { FormEvent } from "react";

const NewsLetter: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your submission logic here (API call, validation, etc.)
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col mt-16 md:mt-24 pb-14 items-center justify-center text-center px-4 sm:px-6">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Never Miss a Deal!
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg text-gray-500/70 max-w-xl pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between max-w-2xl w-full sm:h-12 md:h-13 gap-3 sm:gap-0"
      >
        <input
          className="border border-gray-300 rounded-md sm:rounded-r-none h-12 px-4 w-full text-gray-600 outline-none"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition-all text-white h-12 sm:h-full px-8 sm:px-12 rounded-md sm:rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
