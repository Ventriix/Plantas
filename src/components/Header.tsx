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
        <Image
          className={styles.icon}
          alt="Icon"
          src="https://placehold.co/80x80"
          height={0}
          width={0}
        />
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
                    <button type="button" className="btn btnNeutral">
                      My Plants
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/add-plant">
                    <button type="button" className="btn btnAccentGreen">
                      Add Plant
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
