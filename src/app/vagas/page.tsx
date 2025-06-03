"use client";
import { useThemeMode } from "../../components/ThemeRegistry";
import VagasList from "../../components/VagasList";
import NavBar from "../../components/NavBar";

export default function VagasPage() {
  const { mode, setMode } = useThemeMode();

  return (
    <>
      <NavBar mode={mode} setMode={setMode} />
      <main>
        <VagasList />
      </main>
    </>
  );
}