"use client";
import { useThemeMode } from "../../components/ThemeRegistry";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Typography, Box } from "@mui/material";

export default function SobrePage() {
  const { mode, setMode } = useThemeMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <NavBar mode={mode} setMode={setMode} isMobile={isMobile} />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
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
          Sobre o Projeto
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, textAlign: "center" }}>
          {/* Seu texto de apresentação aqui */}
          Este projeto foi desenvolvido para conectar profissionais e empresas no
          Maranhão, facilitando o acesso a oportunidades de trabalho.
        </Typography>
        <Footer />
      </Box>
    </>
  );
}