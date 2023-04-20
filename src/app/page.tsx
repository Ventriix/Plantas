import ThemeSwitch from "@/components/ThemeSwitch";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Plantas</h1>
      <h2>your free plant care assistant</h2>
      <ThemeSwitch />
    </main>
  );
}
