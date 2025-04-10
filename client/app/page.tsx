import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext"; // Import the provider
import React from "react";

function Page() {
  return (
    <div>
      {/* Wrap Navbar inside the AppContextProvider to provide context */}
      <AppContextProvider>
        <Navbar />
      </AppContextProvider>
    </div>
  );
}

export default Page;
