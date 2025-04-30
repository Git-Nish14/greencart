import React, { Suspense } from "react";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Loading />
    </Suspense>
  );
}
