"use client";
import { useThemeMode } from "../components/ThemeRegistry";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Typography, Box, Button, Fade, Slide } from "@mui/material";
import Link from "next/link";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";


export default function HomePage() {
  const { mode, setMode } = useThemeMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Fundo animado de partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: mode === "dark" ? "#181a1b" : "#f5f5f5" } },
          particles: {
            number: { value: 80 },
            color: { value: mode === "dark" ? "#90caf9" : "#1976d2" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 80, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
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
                sx={(theme) => ({
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
                })}
              >
                Eu quero
              </Button>
            </Slide>
          </Box>
        </Fade>
        <Box flex={1} />
        <Footer />
      </Box>
    </Box>
  );
}
