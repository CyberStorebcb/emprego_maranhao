"use client";
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Typography, Box, TextField, Button } from "@mui/material";

export default function ContatoPage() {
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
      <Box maxWidth="sm" mx="auto" mt={6} px={2}>
        <Typography variant="h4" color="primary" gutterBottom>
          Contato
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Fale conosco para dúvidas, sugestões ou parcerias.
        </Typography>
        <form>
          <TextField label="Seu nome" fullWidth margin="normal" />
          <TextField label="E-mail" type="email" fullWidth margin="normal" />
          <TextField
            label="Mensagem"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Enviar
          </Button>
        </form>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}