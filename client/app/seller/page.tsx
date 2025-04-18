"use client";
import SellerLogin from "@/components/SellerLogin";
import { useAppContext } from "@/context/AppContext";
import React from "react";

function Page() {
  const { isSeller } = useAppContext();

  return <div>{!isSeller && <SellerLogin />}</div>;
}

export default Page;
