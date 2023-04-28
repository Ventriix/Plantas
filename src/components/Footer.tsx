"use client";

import ThemeSwitch from "@/components/ThemeSwitch";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ThemeSwitch />
    </footer>
  );
}
