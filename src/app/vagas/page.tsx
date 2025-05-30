"use client";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import VagasList from "../../components/VagasList";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function VagasPage() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = localStorage.getItem("themeMode") as "light" | "dark";
    if (stored) setMode(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);
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
      }),
    [mode]
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar mode={mode} setMode={setMode} isMobile={isMobile} />
      <main>
        <VagasList />
      </main>
      <Footer />
    </ThemeProvider>
  );
}