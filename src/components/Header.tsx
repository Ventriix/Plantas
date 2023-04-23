import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerNavContainer}>
        <Image
          alt="Placeholder Image"
          src="https://placehold.co/300x80"
          width={300}
          height={80}
          className={styles.icon}
        />
        <nav aria-label="logged-in-nav">
          <ul>
            <li>
              <Link href="/my-plants">
                <button type="button" className={styles.navButton}>
                  My Plants
                </button>
              </Link>
            </li>
            <li>
              <Link href="/add-plant">
                <button type="button" className={styles.navButton}>
                  Add Plant
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.headerAccountContainer}>
        <ChevronDownIcon className={styles.mobileDropdownIcon} />
        <nav aria-label="account-nav">
          <ul>
            <li>
              <Link href="/login">
                <button type="button" className={styles.navButton}>
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link href="/sign-up">
                <button type="button" className={styles.navHighlightButton}>
                  Sign Up For Free
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
