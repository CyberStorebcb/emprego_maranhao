"use client";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("themeMode") as "light" | "dark";
    if (stored) setMode(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode, mounted]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#f50057" },
          ...(mode === "dark"
            ? {
                background: { default: "#181a1b", paper: "#23272a" },
                text: { primary: "#f5f5f5", secondary: "#b0b3b8" },
              }
            : {
                background: { default: "#f5f5f5", paper: "#fff" },
                text: { primary: "#222", secondary: "#666" },
              }),
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: `${geistSans.style.fontFamily}, ${geistMono.style.fontFamily}, Arial, sans-serif`,
        },
      }),
    [mode]
  );

  if (!mounted) return null;

  // Passe setMode/mode para NavBar se quiser alternar o tema via botão
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}