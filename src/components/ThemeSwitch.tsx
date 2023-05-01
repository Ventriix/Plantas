"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ThemeSwitch = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const inactiveTheme =
    // eslint-disable-next-line no-nested-ternary
    theme === "system"
      ? systemTheme === "dark"
        ? "light"
        : "dark"
      : theme === "dark"
      ? "light"
      : "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Theme Switch"
      className={`${className} btn btnAccentGreen btnRound`}
      onClick={() => setTheme(inactiveTheme)}
    >
      {inactiveTheme === "light" ? (
        <MoonIcon className="smallIcon" />
      ) : (
        <SunIcon className="smallIcon" />
      )}
    </button>
  );
};

export default ThemeSwitch;
