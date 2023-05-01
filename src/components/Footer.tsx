"use client";

import ThemeSwitch from "@/components/ThemeSwitch";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import logout from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./Footer.module.scss";

export default function Footer() {
  const router = useRouter();
  const user = useAuthContext();

  return (
    <footer className={styles.footer}>
      <p>
        <b>&copy;</b> Variaty Studios {new Date().getFullYear()}
      </p>
      <ThemeSwitch />
      {user && (
        <button
          type="button"
          aria-label="Logout"
          className="btn btnAccentRed btnRound"
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <ArrowLeftOnRectangleIcon className="smallIcon" />
        </button>
      )}
    </footer>
  );
}
