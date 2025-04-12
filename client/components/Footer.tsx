"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-10 pb-6 w-full bg-white text-gray-600"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-10 border-b border-gray-300 pb-8">
        {/* Logo and Description */}
        <div className="md:max-w-md">
          <Image
            src={assets.logo}
            alt="GreenCart Logo"
            width={150}
            height={36}
            className="h-9 w-auto"
          />
          <p className="mt-6 text-base leading-relaxed text-gray-600">
            GreenCart is your go-to grocery delivery platform—bringing you fresh
            produce, household essentials, and pantry staples straight to your
            doorstep. Fast, affordable, and reliable service for every
            household.
          </p>
        </div>

        {/* Links and Contact */}
        <div className="w-full md:w-auto flex flex-col md:flex-row md:justify-between gap-10 text-base text-center md:text-left">
          <div className="flex-1">
            <h2 className="font-semibold mb-4 text-gray-800 text-lg">
              Company
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h2 className="font-semibold mb-4 text-gray-800 text-lg">
              Get in Touch
            </h2>
            <div className="space-y-2">
              <p>
                <a
                  href="tel:+1 757-839-6197"
                  className="hover:text-primary transition"
                >
                  +1 757-839-6197
                </a>
              </p>
              <p>
                <a
                  href="mailto:nishpatel.cse@gmail.com"
                  className="hover:text-primary transition"
                >
                  nishpatel.cse@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="pt-6 text-center text-sm md:text-base text-gray-500">
        &copy; {year} GreenCart. All rights reserved.
      </p>

      {/* Scroll to Top Button - Visible ONLY when Footer is in view */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white hover:bg-primary-dull transition z-50 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
