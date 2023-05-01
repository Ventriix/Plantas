"use client";

import Header from "@/components/Header";
import PlantOverview from "@/components/PlantOverview";
import Footer from "@/components/Footer";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./Home.module.scss";

export default function Home() {
  const user = useAuthContext();

  return (
    <>
      <Header />
      <main>
        {!user && (
          <>
            <h1 className={styles.title}>Plantas</h1>
            <h2>your free plant care assistant</h2>
          </>
        )}
        {user && <PlantOverview />}
      </main>
      <Footer />
    </>
  );
}
