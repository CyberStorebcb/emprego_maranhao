"use client";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Typography, Box, Button, Fade, Slide } from "@mui/material";
import Link from "next/link";

// Escolha uma imagem de fundo (coloque em /public ou use uma URL externa)
const backgroundUrl = "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export default function HomePage() {
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
      }),
    [mode]
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!mounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `linear-gradient(rgba(24,26,27,0.5),rgba(24,26,27,0.5)), url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "background 0.5s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavBar mode={mode} setMode={setMode} isMobile={isMobile} />
        <Fade in timeout={1200}>
          <Box textAlign="center" mt={isMobile ? 8 : 14}>
            <Slide in direction="down" timeout={900}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                color="primary"
                fontWeight={700}
                gutterBottom
                sx={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                  letterSpacing: "-1px",
                  transition: "color 0.3s",
                }}
              >
                Sua oportunidade 👨🏽‍💻
              </Typography>
            </Slide>
            <Fade in timeout={1800}>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
                mb={4}
                sx={{
                  textShadow: "0 1px 4px rgba(0,0,0,0.10)",
                  transition: "color 0.3s",
                }}
              >
                Encontre as melhores oportunidades de trabalho no Maranhão.
              </Typography>
            </Fade>
            <Slide in direction="up" timeout={1500}>
              <Button
                component={Link}
                href="/vagas"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  px: 5,
                  py: 1.5,
                  boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
                  transition: "box-shadow 0.3s, background 0.3s",
                  ":hover": {
                    background: theme.palette.secondary.main,
                    boxShadow: "0 6px 24px rgba(245, 0, 87, 0.18)",
                  },
                }}
              >
                Eu quero
              </Button>
            </Slide>
          </Box>
        </Fade>
        <Box flex={1} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
