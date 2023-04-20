"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import styles from "./ThemeSwitch.module.scss"

const ThemeSwitch = ({ className }: { className?: string }) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    const inactiveTheme = theme === "system" ? systemTheme === "dark" ? "light" : "dark" : theme === "dark" ? "light" : "dark"

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            type="button"
            aria-label="Theme switch"
            className={`${className} ${styles.btn}`}
            onClick={() => setTheme(inactiveTheme)}
        >
            {inactiveTheme === "light" ? (
                <MoonIcon className={styles.icon} />
            ) : (
                <SunIcon className={styles.icon} />
            )}
        </button>
    )
}

export default ThemeSwitch