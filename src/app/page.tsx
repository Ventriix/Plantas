"use client";

import Header from "@/components/Header";
import PlantOverview from "@/components/PlantOverview";
import Footer from "@/components/Footer";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <main>{user && <PlantOverview />}</main>
      <Footer />
    </>
  );
}
