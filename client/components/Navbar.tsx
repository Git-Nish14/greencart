"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
    getCartAmount,
    axios,
  } = useAppContext();

  const router = useRouter();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      router.push("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link href="/">
        <Image
          onClick={() => setOpen(false)}
          className="h-9"
          src={assets.logo}
          alt="dummyLogoColored"
          width={140}
          height={140}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/products">All products</Link>
        {user && <Link href="/my-products">My Products</Link>}
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <Image src={assets.search_icon} alt="search" width={20} height={20} />
        </div>

        <div className="relative">
          <Link href="/cart">
            <Image
              src={assets.nav_cart_icon}
              alt="cart"
              width={20}
              height={20}
            />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <Image
              src={assets.profile_icon}
              alt="profile"
              width={50}
              height={50}
            />
            <ul className="hidden group-hover:block absolute top-12 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-40">
              <Link
                href="/cart/my-orders"
                className="block px-3 py-2 hover:bg-primary/10"
              >
                My Orders
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 hover:bg-primary/10"
              >
                Profile
              </Link>
              <li
                onClick={logout}
                className="block px-3 py-2 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="flex items-center gap-6 sm:hidden">
        <div className="relative">
          <Link href="/cart">
            <Image
              src={assets.nav_cart_icon}
              alt="cart"
              width={20}
              height={20}
            />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="">
          <Image src={assets.menu_icon} alt="menu" width={20} height={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-4 px-5 text-sm sm:hidden z-50">
          <Link href="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="block"
          >
            All Products
          </Link>
          {user && (
            <Link
              href="/cart/my-orders"
              onClick={() => setOpen(false)}
              className="block"
            >
              My Orders
            </Link>
          )}
          <Link href="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block"
          >
            Contact
          </Link>

          {/* Search Bar in Mobile Menu */}
          <div className="flex w-full items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-full">
            <input
              onChange={(e) => {
                setOpen(false);
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
              type="text"
              placeholder="Search products"
            />
            <Image
              src={assets.search_icon}
              alt="search"
              width={20}
              height={20}
            />
          </div>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

//     "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { assets } from "@/assets/assets";
// import { useAppContext } from "@/context/AppContext";
// import { useRouter } from "next/navigation";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { user, setUser, setShowUserLogin } = useAppContext();
//   const router = useRouter();

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const logout = async () => {
//     setUser(null);
//     router.push("/");
//   };

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     if (open) {
//       const handleClickOutside = (e: any) => {
//         if (
//           !e.target.closest(".mobile-menu") &&
//           !e.target.closest(".menu-button")
//         ) {
//           setOpen(false);
//         }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [open]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 py-3 border-b border-gray-200 bg-white transition-all duration-300 ${
//         scrolled ? "shadow-md" : ""
//       }`}
//     >
//       <Link href="/" className="flex items-center">
//         <Image
//           className="h-8 w-auto"
//           src={assets.logo}
//           alt="Logo"
//           width={120}
//           height={36}
//           priority
//         />
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-6 lg:gap-8">
//         <div className="flex items-center space-x-1 lg:space-x-5">
//           <Link
//             href="/"
//             className="px-2 py-1 hover:text-primary transition-colors text-sm lg:text-base"
//           >
//             Home
//           </Link>
//           <Link
//             href="/products"
//             className="px-2 py-1 hover:text-primary transition-colors text-sm lg:text-base"
//           >
//             All products
//           </Link>
//           {user && (
//             <Link
//               href="/my-products"
//               className="px-2 py-1 hover:text-primary transition-colors text-sm lg:text-base"
//             >
//               My Products
//             </Link>
//           )}
//           <Link
//             href="/contact"
//             className="px-2 py-1 hover:text-primary transition-colors text-sm lg:text-base"
//           >
//             Contact
//           </Link>
//           <Link
//             href="/about"
//             className="px-2 py-1 hover:text-primary transition-colors text-sm lg:text-base"
//           >
//             About
//           </Link>
//         </div>

//         <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 py-1 rounded-full">
//           <input
//             className="w-40 xl:w-56 bg-transparent outline-none placeholder-gray-500"
//             type="text"
//             placeholder="Search products"
//           />
//           <Image src={assets.search_icon} alt="search" width={18} height={18} />
//         </div>

//         <div className="flex items-center gap-4 lg:gap-6">
//           <Link href="/cart" className="relative group">
//             <Image
//               src={assets.nav_cart_icon}
//               alt="cart"
//               width={22}
//               height={22}
//               className="group-hover:scale-110 transition-transform"
//             />
//             <span className="absolute -top-2 -right-2 text-xs text-white bg-primary w-5 h-5 flex items-center justify-center rounded-full">
//               3
//             </span>
//           </Link>

//           {/* Conditional Login/Logout Button */}
//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="whitespace-nowrap px-5 py-1.5 text-sm bg-primary hover:bg-primary-dark transition text-white rounded-full"
//             >
//               Login
//             </button>
//           ) : (
//             <div className="relative group">
//               <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
//                 <Image
//                   src={assets.profile_icon}
//                   alt="profile"
//                   width={32}
//                   height={32}
//                   className="object-cover"
//                 />
//               </div>
//               <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-lg border border-gray-100 py-2 w-40 rounded-md text-sm z-40">
//                 <Link
//                   href="/my-orders"
//                   className="block px-4 py-2 hover:bg-gray-50 hover:text-primary"
//                 >
//                   My Orders
//                 </Link>
//                 <Link
//                   href="/my-profile"
//                   className="block px-4 py-2 hover:bg-gray-50 hover:text-primary"
//                 >
//                   My Profile
//                 </Link>
//                 <li
//                   onClick={logout}
//                   className="block px-4 py-2 hover:bg-gray-50 hover:text-primary cursor-pointer"
//                 >
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         aria-label="Menu"
//         className="md:hidden menu-button p-1 focus:outline-none"
//       >
//         <div
//           className={`w-6 flex flex-col items-end justify-center gap-1.5 transition-all ${
//             open ? "rotate-90" : ""
//           }`}
//         >
//           <span
//             className={`block h-0.5 bg-gray-800 transition-all ${
//               open ? "w-6" : "w-6"
//             }`}
//           ></span>
//           <span
//             className={`block h-0.5 bg-gray-800 transition-all ${
//               open ? "w-6" : "w-4"
//             }`}
//           ></span>
//           <span
//             className={`block h-0.5 bg-gray-800 transition-all ${
//               open ? "w-6" : "w-5"
//             }`}
//           ></span>
//         </div>
//       </button>

//       {/* Mobile Menu */}
//       <div
//         className={`mobile-menu absolute top-full left-0 w-full bg-white shadow-lg py-3 flex flex-col md:hidden transition-all duration-300 ${
//           open
//             ? "opacity-100 translate-y-0"
//             : "opacity-0 -translate-y-4 pointer-events-none"
//         }`}
//       >
//         <div className="px-6 pb-3 mb-3 border-b border-gray-100">
//           <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 py-1.5 rounded-full">
//             <input
//               className="w-full bg-transparent outline-none placeholder-gray-500"
//               type="text"
//               placeholder="Search products"
//             />
//             <Image
//               src={assets.search_icon}
//               alt="search"
//               width={18}
//               height={18}
//             />
//           </div>
//         </div>

//         <Link
//           href="/"
//           onClick={() => setOpen(false)}
//           className="px-6 py-2.5 hover:bg-gray-50"
//         >
//           Home
//         </Link>
//         <Link
//           href="/products"
//           onClick={() => setOpen(false)}
//           className="px-6 py-2.5 hover:bg-gray-50"
//         >
//           All Products
//         </Link>
//         {user && (
//           <Link
//             href="/my-products"
//             onClick={() => setOpen(false)}
//             className="px-6 py-2.5 hover:bg-gray-50"
//           >
//             My Products
//           </Link>
//         )}
//         <Link
//           href="/about"
//           onClick={() => setOpen(false)}
//           className="px-6 py-2.5 hover:bg-gray-50"
//         >
//           About
//         </Link>
//         <Link
//           href="/contact"
//           onClick={() => setOpen(false)}
//           className="px-6 py-2.5 hover:bg-gray-50"
//         >
//           Contact
//         </Link>
//         <Link
//           href="/cart"
//           onClick={() => setOpen(false)}
//           className="px-6 py-2.5 hover:bg-gray-50 flex items-center gap-2"
//         >
//           <span>Cart</span>
//           <span className="text-xs text-white bg-primary w-5 h-5 flex items-center justify-center rounded-full">
//             3
//           </span>
//         </Link>

//         <div className="px-6 pt-3 mt-2 border-t border-gray-100">
//           {!user ? (
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 setShowUserLogin(true);
//               }}
//               className="w-full cursor-pointer py-2.5 bg-primary hover:bg-primary-dark transition text-white rounded-md text-sm"
//             >
//               Login
//             </button>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <Link
//                 href="/my-orders"
//                 onClick={() => setOpen(false)}
//                 className="py-2.5 hover:bg-gray-50"
//               >
//                 My Orders
//               </Link>
//               <Link
//                 href="/my-profile"
//                 onClick={() => setOpen(false)}
//                 className="py-2.5 hover:bg-gray-50"
//               >
//                 My Profile
//               </Link>
//               <button
//                 onClick={() => {
//                   logout();
//                   setOpen(false);
//                 }}
//                 className="w-full cursor-pointer py-2.5 bg-primary hover:bg-primary-dark transition text-white rounded-md text-sm mt-2"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
