"use client";

import ThemeSwitch from "@/components/ThemeSwitch";
import Header from "@/components/Header";
import { useState } from "react";
import PlantOverview from "@/components/PlantOverview";
import Footer from "@/components/Footer";
import styles from "./page.module.scss";

export default function Home() {
  const [loggedIn] = useState(true);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {!loggedIn && (
          <>
            <h1>Plantas</h1>
            <h2>your free plant care assistant</h2>
            <ThemeSwitch />
          </>
        )}
        {loggedIn && <PlantOverview />}
      </main>
      <Footer />
    </>
  );
}
