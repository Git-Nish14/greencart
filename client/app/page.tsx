import React from "react";
import MainBanner from "@/components/MainBanner";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";
import Categories from "@/components/Categories";
import BestSeller from "@/components/BestSeller";
import BottomBanner from "@/components/BottomBanner";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <AppContextProvider>
        <header>
          <Navbar />
        </header>
        <div className="flex-1 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
          <MainBanner />
          <Categories />
          <BestSeller />
          <BottomBanner />
          <NewsLetter />
        </div>
        <Footer />
      </AppContextProvider>
    </main>
  );
};

export default HomePage;
