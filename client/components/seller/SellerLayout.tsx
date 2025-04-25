"use client";

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SellerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { axios } = useAppContext();
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/seller-product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/seller-orders", icon: assets.order_icon },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="logo"
            width={140}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="md:w-64 w-20 border-r border-gray-300 pt-6 flex flex-col bg-white">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center py-3 px-4 gap-3 transition-all duration-200
                  ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                      : "hover:bg-gray-100/90 border-white"
                  }`}
              >
                <Image src={item.icon} alt={item.name} width={28} height={28} />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
};

export default SellerLayout;
