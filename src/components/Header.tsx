"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./Header.module.scss";

export default function Header() {
  const user = useAuthContext();

  return (
    <header className={styles.header}>
      <div className={styles.headerNavContainer}>
        <Link href="/">
          <Image
            className={styles.icon}
            alt="Icon"
            src="/icon.png"
            height={800}
            width={800}
          />
        </Link>
        <nav>
          <ul>
            {!user && (
              <>
                <li>
                  <Link href="/login">
                    <button type="button" className="btn btnNeutral">
                      Log In
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <button type="button" className="btn btnAccentGreen">
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href="/">
                    <button
                      type="button"
                      className={`btn btnNeutral ${styles.smallText}`}
                    >
                      My Plants
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <button
                      type="button"
                      className={`btn btnAccentGreen ${styles.smallText}`}
                    >
                      Profile
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
