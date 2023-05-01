"use client";

import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "@/context/AuthContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthContextProvider>
  );
}

export default Providers;
