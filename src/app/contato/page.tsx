"use client";
import { useThemeMode } from "../../components/ThemeRegistry";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../../components/NavBar";
import { Typography, Box, TextField, Button, Paper } from "@mui/material";

export default function ContatoPage() {
  const { mode, setMode } = useThemeMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <NavBar mode={mode} setMode={setMode} />
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
        <Paper
          elevation={4}
          sx={{
            p: isMobile ? 2 : 4,
            maxWidth: 420,
            width: "100%",
            mt: isMobile ? 6 : 12,
            mb: 4,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom
            align="center"
          >
            Entre em contato
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
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
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
