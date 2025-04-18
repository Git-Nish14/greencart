"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarFooter = pathname.startsWith("/seller");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
