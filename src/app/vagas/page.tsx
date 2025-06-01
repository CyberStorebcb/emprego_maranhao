"use client";
import { useThemeMode } from "../../components/ThemeRegistry";
import useMediaQuery from "@mui/material/useMediaQuery";
import VagasList from "../../components/VagasList";
import NavBar from "../../components/NavBar";

export default function VagasPage() {
  const { mode, setMode } = useThemeMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <NavBar mode={mode} setMode={setMode} isMobile={isMobile} />
      <main>
        <VagasList />
      </main>
    </>
  );
}