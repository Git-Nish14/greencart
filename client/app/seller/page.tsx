import AddProduct from "@/components/seller/AddProduct";
import React from "react";

export default function SellerHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Seller Dashboard</h1>
      <p>Add your products here!</p>
      <AddProduct />
    </div>
  );
}
