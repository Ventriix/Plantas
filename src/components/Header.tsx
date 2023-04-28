"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const [loggedIn] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerNavContainer}>
        <Image
          className={styles.icon}
          alt="Icon"
          src="https://placehold.co/80x80"
          height={0}
          width={0}
        />
        <nav>
          <ul>
            {!loggedIn && (
              <ul>
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
              </ul>
            )}
            {loggedIn && (
              <ul>
                <li>
                  <Link href="/">
                    <button type="button" className={styles.navLink}>
                      My Plants
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button type="button" className={styles.navLink}>
                      Log out
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
