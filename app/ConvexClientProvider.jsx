"use client";

import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

function ConvexClientProvider({ children }) {
  // FIX: Add const here!
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}

export default ConvexClientProvider;
