"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Loading() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");

  useEffect(() => {
    if (nextUrl) {
      const timeout = setTimeout(() => {
        router.push(`/${nextUrl}`);
      }, 5000);
      return () => clearTimeout(timeout); // cleanup
    }
  }, [nextUrl, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
}

export default Loading;
