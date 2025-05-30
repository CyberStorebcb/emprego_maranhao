"use client";
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Typography, Box } from "@mui/material";

export default function SobrePage() {
  const [mode, setMode] = useState<"light" | "dark">(
    typeof window !== "undefined"
      ? (localStorage.getItem("themeMode") as "light" | "dark") || "light"
      : "light"
  );
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
      <Box maxWidth="md" mx="auto" mt={6} px={2}>
        <Typography variant="h4" color="primary" gutterBottom>
          Sobre o Empregos Maranhão
        </Typography>
        <Typography variant="body1" color="text.secondary">
          O Empregos Maranhão é uma plataforma dedicada a conectar profissionais e
          empresas do Maranhão, facilitando o acesso às melhores oportunidades de
          trabalho na região.
        </Typography>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}