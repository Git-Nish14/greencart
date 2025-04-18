"use client";

import SellerLayout from "@/components/seller/SellerLayout";
import { useAppContext } from "@/context/AppContext";
import SellerLogin from "@/components/SellerLogin";
import React from "react";

export default function SellerLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSeller } = useAppContext();

  if (!isSeller) {
    return <SellerLogin />;
  }

  return <SellerLayout>{children}</SellerLayout>;
}
