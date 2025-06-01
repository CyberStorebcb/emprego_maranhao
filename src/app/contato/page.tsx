"use client";
import { useThemeMode } from "../../components/ThemeRegistry";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Typography, Box, TextField, Button } from "@mui/material";

const backgroundUrl =
  "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ContatoPage() {
  const { mode, setMode } = useThemeMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <NavBar mode={mode} setMode={setMode} isMobile={isMobile} />
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
        <Footer />
      </Box>
    </>
  );
}
