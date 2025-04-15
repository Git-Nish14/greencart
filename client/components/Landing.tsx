"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import MainBanner from "@/components/MainBanner";
import Categories from "@/components/Categories";
import BestSeller from "@/components/BestSeller";
import BottomBanner from "@/components/BottomBanner";
import NewsLetter from "@/components/NewsLetter";
import Login from "@/components/Login";

export default function ClientHome() {
  const { showUserLogin } = useAppContext();

  return (
    <main className="min-h-screen flex flex-col">
      {showUserLogin && <Login />}
      <div className="flex-1 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
        <MainBanner />
        <Categories />
        <BestSeller />
        <BottomBanner />
        <NewsLetter />
      </div>
    </main>
  );
}
