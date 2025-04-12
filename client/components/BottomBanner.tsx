"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Apple, Leaf, Sun, Droplet } from "lucide-react";
import { assets, features } from "@/assets/assets";

function BottomBanner() {
  return (
    <div className="relative w-full mt-24 bg-[#f6fcf6] rounded-xl px-4 sm:px-6 md:px-8 lg:px-20 py-10 overflow-hidden">
      <motion.div
        className="absolute top-6 left-4 sm:left-10 text-yellow-400 opacity-40 z-0"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sun size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 text-red-400 opacity-40 z-0"
        animate={{ y: [0, -50, 0], rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Apple size={48} />
      </motion.div>

      <motion.div
        className="absolute top-4 right-6 sm:right-16 text-green-400 opacity-40 z-0"
        animate={{
          y: [0, -35, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf size={44} />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-2 text-purple-400 opacity-40 z-0"
        animate={{
          y: [0, -55, 0],
          rotate: [0, -12, 12, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Droplet size={44} />
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
        {/* Banner Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={assets.bottom_banner_image}
            alt="bottom-banner"
            width={700}
            height={500}
            className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]"
          />
        </div>

        {/* Feature Text */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 text-center lg:text-left">
            The Best in the Business – Here's Why
          </h1>

          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="w-9 sm:w-10 md:w-11 shrink-0"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500/80 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
