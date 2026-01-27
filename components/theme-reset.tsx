"use client"

import { useEffect } from "react"

export function ThemeReset() {
  useEffect(() => {
    // One-time migration: if theme is set to light/dark but we want system default
    const currentTheme = localStorage.getItem('theme')
    const migrated = localStorage.getItem('theme-migrated')
    
    if (!migrated && currentTheme && currentTheme !== 'system') {
      localStorage.removeItem('theme')
      localStorage.setItem('theme-migrated', 'true')
      window.location.reload()
    }
  }, [])

  return null
}
