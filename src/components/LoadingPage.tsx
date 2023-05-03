"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Dna } from "react-loader-spinner";
import styles from "./LoadingPage.module.scss";

export default function LoadingPage() {
  return (
    <main className={styles.container}>
      <Dna visible height={80} width={80} ariaLabel="Loading" />
      <p>Stand By...</p>
    </main>
  );
}
