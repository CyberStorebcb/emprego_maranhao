"use client";
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../../components/NavBar";
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
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            px: 2,
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Entre em contato
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: isMobile ? "100%" : 400,
              mt: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Nome" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Mensagem"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
