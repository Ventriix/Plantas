"use client";

import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "@/context/AuthContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeProvider>
  );
}

export default Providers;
