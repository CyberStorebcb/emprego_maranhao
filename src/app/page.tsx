"use client";
import { useThemeMode } from "../components/ThemeRegistry";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Typography, Box, Button, Fade, Slide, Grow, Zoom, Stack } from "@mui/material";
import Link from "next/link";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";

const previewVagas = [
  { id: 1, titulo: "Analista", empresa: "Tech Maranhão", local: "São Luís, MA" },
  { id: 2, titulo: "Vigia", empresa: "Escola Miranda", local: "Alto Alegre" },
  { id: 3, titulo: "Administrativo", empresa: "Qualidade+", local: "São Mateus" },
];

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
            number: { value: 120, density: { enable: true, value_area: 900 } },
            color: {
              value: mode === "dark"
                ? ["#90caf9", "#00eaff", "#fff", "#1976d2"]
                : ["#1976d2", "#00bcd4", "#ff4081", "#fff"],
              animation: { enable: true, speed: 20, sync: false },
            },
            shape: { type: ["circle", "star", "triangle"] },
            links: {
              enable: true,
              distance: 130,
              color: mode === "dark" ? "#90caf9" : "#1976d2",
              opacity: 0.25,
              width: 1,
              triangles: { enable: true, opacity: 0.08 },
            },
            opacity: { value: 0.7, random: true, animation: { enable: true, speed: 1, sync: false } },
            size: { value: { min: 2, max: 6 }, random: true, animation: { enable: true, speed: 2, sync: false } },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
            glow: {
              enable: true,
              color: mode === "dark" ? "#90caf9" : "#1976d2",
              radius: 10,
              intensity: 0.4,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: ["repulse", "bubble"] },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 90, duration: 0.5 },
              push: { quantity: 4 },
              bubble: { distance: 120, size: 10, duration: 2, opacity: 0.8, color: "#fff" },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: "blur(0.5px)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <NavBar mode={mode} setMode={setMode} isMobile={isMobile} />

        {/* Conteúdo principal */}
        <Zoom in timeout={1200}>
          <Box
            textAlign="center"
            mt={isMobile ? 8 : 14}
            sx={{
              mx: "auto",
              maxWidth: 700,
              background: mode === "dark"
                ? "rgba(24,26,27,0.85)"
                : "rgba(255,255,255,0.85)",
              borderRadius: 4,
              boxShadow: "0 4px 32px rgba(25, 118, 210, 0.10)",
              p: isMobile ? 2 : 4,
              mb: 4,
            }}
          >
            <Slide in direction="down" timeout={900}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight={800}
                gutterBottom
                sx={{
                  background: "linear-gradient(90deg, #1976d2, #00eaff, #ff4081, #1976d2)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradient-move 3s linear infinite",
                  letterSpacing: "-1px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                  "@keyframes gradient-move": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "100% 50%" },
                  },
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
            <Grow in timeout={2000}>
              <Button
                component={Link}
                href="/vagas"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontWeight: 700,
                  fontSize: isMobile ? "1rem" : "1.25rem",
                  px: 5,
                  py: 1.7,
                  borderRadius: 99,
                  boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
                  background: "linear-gradient(90deg, #1976d2 60%, #00eaff 100%)",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  ":hover": {
                    background: "linear-gradient(90deg, #ff4081 0%, #1976d2 100%)",
                    color: "#fff",
                    transform: "scale(1.09)",
                    boxShadow: "0 8px 32px rgba(245, 0, 87, 0.18)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.18) 0%, transparent 70%)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  },
                  ":hover::after": {
                    opacity: 1,
                  },
                }}
              >
                EU QUERO
              </Button>
            </Grow>
            {/* Preview das vagas em destaque */}
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mt={5}
            >
              {previewVagas.map((vaga) => (
                <Fade in timeout={1500 + vaga.id * 200} key={vaga.id}>
                  <Box
                    sx={{
                      background: mode === "dark"
                        ? "rgba(144,202,249,0.08)"
                        : "rgba(25,118,210,0.08)",
                      borderRadius: 3,
                      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                      p: 2,
                      minWidth: 180,
                      textAlign: "left",
                      borderLeft: `4px solid ${mode === "dark" ? "#90caf9" : "#1976d2"}`,
                    }}
                  >
                    <Typography fontWeight={700} fontSize="1.1rem">
                      {vaga.titulo}
                    </Typography>
                    <Typography fontSize="0.95rem" color="text.secondary">
                      {vaga.empresa}
                    </Typography>
                    <Typography fontSize="0.9rem" color="primary">
                      {vaga.local}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Stack>
            <Button
              component={Link}
              href="/vagas"
              variant="outlined"
              color="primary"
              size="medium"
              sx={{
                mt: 3,
                borderRadius: 99,
                fontWeight: 600,
                px: 4,
                borderWidth: 2,
                ":hover": {
                  borderColor: "#ff4081",
                  color: "#ff4081",
                },
              }}
            >
              Ver todas as vagas
            </Button>
          </Box>
        </Zoom>
        <Box flex={1} />
        <Footer />
      </Box>
    </Box>
  );
}
