"use client";
import React, { useState } from "react";
import styles from "../app/vagas/vagas.module.css";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

// Importe o componente FormularioCandidatura
import FormularioCandidatura from "./FormularioCandidatura";

// Vagas de nível superior (10)
const vagasSuperior = [
  { id: 101, titulo: "Engenheiro Civil", empresa: "Construtora Maranhão", local: "São Luís, MA", desc: "Projetos, obras e fiscalização de construções.", tipo: "Presencial", nivel: "Superior" },
  { id: 102, titulo: "Médico Clínico Geral", empresa: "Hospital Vida", local: "Imperatriz, MA", desc: "Atendimento clínico e emergencial.", tipo: "Presencial", nivel: "Superior" },
  { id: 103, titulo: "Advogado", empresa: "Escritório Maranhão Advocacia", local: "Caxias, MA", desc: "Atuação em direito civil e trabalhista.", tipo: "Presencial", nivel: "Superior" },
  { id: 104, titulo: "Professor Universitário", empresa: "Universidade Estadual do Maranhão", local: "São Luís, MA", desc: "Docência em cursos de graduação.", tipo: "Presencial", nivel: "Superior" },
  { id: 105, titulo: "Farmacêutico", empresa: "Rede FarmaMA", local: "Bacabal, MA", desc: "Gestão de farmácia e atendimento ao cliente.", tipo: "Presencial", nivel: "Superior" },
  { id: 106, titulo: "Engenheiro de Produção", empresa: "Indústria Maranhão", local: "Açailândia, MA", desc: "Gestão de processos industriais.", tipo: "Presencial", nivel: "Superior" },
  { id: 107, titulo: "Psicólogo", empresa: "Clínica Bem Viver", local: "São Luís, MA", desc: "Atendimento psicológico clínico.", tipo: "Presencial", nivel: "Superior" },
  { id: 108, titulo: "Administrador", empresa: "Prefeitura de Timon", local: "Timon, MA", desc: "Gestão administrativa municipal.", tipo: "Presencial", nivel: "Superior" },
  { id: 109, titulo: "Analista de Sistemas", empresa: "TI Maranhão", local: "São Luís, MA", desc: "Desenvolvimento e manutenção de sistemas.", tipo: "Presencial", nivel: "Superior" },
  { id: 110, titulo: "Nutricionista", empresa: "Hospital Saúde", local: "Imperatriz, MA", desc: "Elaboração de dietas e acompanhamento nutricional.", tipo: "Presencial", nivel: "Superior" },
];

// Vagas de nível médio (20)
const vagasMedio = [
  { id: 201, titulo: "Técnico em Enfermagem", empresa: "Hospital Vida", local: "São Luís, MA", desc: "Auxílio em procedimentos médicos.", tipo: "Presencial", nivel: "Médio" },
  { id: 202, titulo: "Assistente Administrativo", empresa: "Prefeitura de Bacabal", local: "Bacabal, MA", desc: "Rotinas administrativas e atendimento.", tipo: "Presencial", nivel: "Médio" },
  { id: 203, titulo: "Técnico em Informática", empresa: "Escola Técnica MA", local: "Caxias, MA", desc: "Manutenção de computadores e redes.", tipo: "Presencial", nivel: "Médio" },
  { id: 204, titulo: "Recepcionista", empresa: "Clínica Bem Viver", local: "São Luís, MA", desc: "Atendimento ao público e agendamento.", tipo: "Presencial", nivel: "Médio" },
  { id: 205, titulo: "Fiscal de Loja", empresa: "Supermercado Maranhão", local: "Imperatriz, MA", desc: "Controle de entrada e saída de mercadorias.", tipo: "Presencial", nivel: "Médio" },
  { id: 206, titulo: "Auxiliar de Laboratório", empresa: "Laboratório Vida", local: "Timon, MA", desc: "Coleta e análise de amostras.", tipo: "Presencial", nivel: "Médio" },
  { id: 207, titulo: "Técnico em Segurança do Trabalho", empresa: "Indústria Maranhão", local: "Açailândia, MA", desc: "Prevenção de acidentes e treinamentos.", tipo: "Presencial", nivel: "Médio" },
  { id: 208, titulo: "Operador de Caixa", empresa: "Rede FarmaMA", local: "Bacabal, MA", desc: "Operação de caixa e atendimento ao cliente.", tipo: "Presencial", nivel: "Médio" },
  { id: 209, titulo: "Secretário Escolar", empresa: "Escola Estadual MA", local: "Caxias, MA", desc: "Organização de documentos escolares.", tipo: "Presencial", nivel: "Médio" },
  { id: 210, titulo: "Agente de Saúde", empresa: "Prefeitura de Timon", local: "Timon, MA", desc: "Visitas domiciliares e orientações.", tipo: "Presencial", nivel: "Médio" },
  { id: 211, titulo: "Auxiliar de Escritório", empresa: "Contabilidade Maranhão", local: "São Luís, MA", desc: "Rotinas de escritório e arquivo.", tipo: "Presencial", nivel: "Médio" },
  { id: 212, titulo: "Técnico em Edificações", empresa: "Construtora Maranhão", local: "Imperatriz, MA", desc: "Acompanhamento de obras.", tipo: "Presencial", nivel: "Médio" },
  { id: 213, titulo: "Técnico em Meio Ambiente", empresa: "Indústria Maranhão", local: "Açailândia, MA", desc: "Monitoramento ambiental.", tipo: "Presencial", nivel: "Médio" },
  { id: 214, titulo: "Auxiliar de Farmácia", empresa: "Hospital Saúde", local: "São Luís, MA", desc: "Controle de estoque e atendimento.", tipo: "Presencial", nivel: "Médio" },
  { id: 215, titulo: "Técnico em Radiologia", empresa: "Clínica Bem Viver", local: "Imperatriz, MA", desc: "Operação de equipamentos de imagem.", tipo: "Presencial", nivel: "Médio" },
  { id: 216, titulo: "Técnico em Contabilidade", empresa: "Contabilidade Maranhão", local: "Bacabal, MA", desc: "Lançamentos e conciliações contábeis.", tipo: "Presencial", nivel: "Médio" },
  { id: 217, titulo: "Técnico em Logística", empresa: "Transportadora MA", local: "Caxias, MA", desc: "Controle de estoque e distribuição.", tipo: "Presencial", nivel: "Médio" },
  { id: 218, titulo: "Técnico em Agropecuária", empresa: "Fazenda Maranhão", local: "Açailândia, MA", desc: "Acompanhamento de produção agrícola.", tipo: "Presencial", nivel: "Médio" },
  { id: 219, titulo: "Técnico em Administração", empresa: "Prefeitura de Timon", local: "Timon, MA", desc: "Apoio administrativo.", tipo: "Presencial", nivel: "Médio" },
  { id: 220, titulo: "Técnico em Química", empresa: "Indústria Maranhão", local: "São Luís, MA", desc: "Análises laboratoriais.", tipo: "Presencial", nivel: "Médio" },
];

// Vagas de nível básico (20)
const vagasBasico = [
  { id: 301, titulo: "Auxiliar de Serviços Gerais", empresa: "Hospital Vida", local: "São Luís, MA", desc: "Limpeza e organização de ambientes.", tipo: "Presencial", nivel: "Básico" },
  { id: 302, titulo: "Atendente de Loja", empresa: "Supermercado Maranhão", local: "Imperatriz, MA", desc: "Atendimento ao cliente e reposição de mercadorias.", tipo: "Presencial", nivel: "Básico" },
  { id: 303, titulo: "Auxiliar de Cozinha", empresa: "Restaurante Sabor MA", local: "Caxias, MA", desc: "Preparação de alimentos e limpeza.", tipo: "Presencial", nivel: "Básico" },
  { id: 304, titulo: "Porteiro", empresa: "Condomínio São Luís", local: "São Luís, MA", desc: "Controle de acesso e segurança.", tipo: "Presencial", nivel: "Básico" },
  { id: 305, titulo: "Zelador", empresa: "Condomínio Bacabal", local: "Bacabal, MA", desc: "Manutenção e limpeza de áreas comuns.", tipo: "Presencial", nivel: "Básico" },
  { id: 306, titulo: "Repositor de Mercadorias", empresa: "Supermercado Maranhão", local: "Imperatriz, MA", desc: "Reposição de produtos nas prateleiras.", tipo: "Presencial", nivel: "Básico" },
  { id: 307, titulo: "Auxiliar de Limpeza", empresa: "Escola Estadual MA", local: "Caxias, MA", desc: "Limpeza de salas e corredores.", tipo: "Presencial", nivel: "Básico" },
  { id: 308, titulo: "Vigia", empresa: "Prefeitura de Timon", local: "Timon, MA", desc: "Segurança patrimonial.", tipo: "Presencial", nivel: "Básico" },
  { id: 309, titulo: "Auxiliar de Produção", empresa: "Indústria Maranhão", local: "Açailândia, MA", desc: "Apoio na linha de produção.", tipo: "Presencial", nivel: "Básico" },
  { id: 310, titulo: "Servente de Obras", empresa: "Construtora Maranhão", local: "São Luís, MA", desc: "Apoio em obras civis.", tipo: "Presencial", nivel: "Básico" },
  { id: 311, titulo: "Auxiliar de Escritório", empresa: "Contabilidade Maranhão", local: "Bacabal, MA", desc: "Organização de documentos.", tipo: "Presencial", nivel: "Básico" },
  { id: 312, titulo: "Balconista", empresa: "Rede FarmaMA", local: "Imperatriz, MA", desc: "Atendimento ao balcão.", tipo: "Presencial", nivel: "Básico" },
  { id: 313, titulo: "Auxiliar de Estoque", empresa: "Transportadora MA", local: "Caxias, MA", desc: "Controle de estoque e organização.", tipo: "Presencial", nivel: "Básico" },
  { id: 314, titulo: "Motorista", empresa: "Prefeitura de Timon", local: "Timon, MA", desc: "Transporte de pessoas e materiais.", tipo: "Presencial", nivel: "Básico" },
  { id: 315, titulo: "Auxiliar de Serviços Gerais", empresa: "Clínica Bem Viver", local: "Açailândia, MA", desc: "Limpeza e apoio geral.", tipo: "Presencial", nivel: "Básico" },
  { id: 316, titulo: "Garçom", empresa: "Restaurante Sabor MA", local: "São Luís, MA", desc: "Atendimento de mesas.", tipo: "Presencial", nivel: "Básico" },
  { id: 317, titulo: "Auxiliar de Lavanderia", empresa: "Hospital Saúde", local: "Imperatriz, MA", desc: "Lavagem de roupas hospitalares.", tipo: "Presencial", nivel: "Básico" },
  { id: 318, titulo: "Auxiliar de Manutenção", empresa: "Indústria Maranhão", local: "Bacabal, MA", desc: "Apoio em consertos e manutenção.", tipo: "Presencial", nivel: "Básico" },
  { id: 319, titulo: "Auxiliar de Almoxarifado", empresa: "Prefeitura de Timon", local: "Timon, MA", desc: "Controle de materiais.", tipo: "Presencial", nivel: "Básico" },
  { id: 320, titulo: "Auxiliar de Serviços Gerais", empresa: "Escola Estadual MA", local: "Caxias, MA", desc: "Limpeza e organização escolar.", tipo: "Presencial", nivel: "Básico" },
];

const vagas = [
  ...vagasBasico,
  ...vagasMedio,
  ...vagasSuperior,
];

const tipos = ["Todos", "Home Office", "Presencial"];
const niveis = ["Todos", "Superior", "Médio", "Básico"];

type Vaga = {
  id: number;
  titulo: string;
  empresa: string;
  local: string;
  desc: string;
  tipo: string;
  nivel: string;
};

const VagasList = () => {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [nivel, setNivel] = useState("Todos");
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
  const [showForm, setShowForm] = useState(false);

  const vagasFiltradas = vagas.filter(
    (vaga) =>
      (tipo === "Todos" || vaga.tipo === tipo) &&
      (nivel === "Todos" || vaga.nivel === nivel) &&
      (
        vaga.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        vaga.empresa.toLowerCase().includes(busca.toLowerCase()) ||
        vaga.local.toLowerCase().includes(busca.toLowerCase())
      )
  );

  // Separação por nível
  const vagasPorNivel = {
    Superior: vagasFiltradas.filter(v => v.nivel === "Superior"),
    Médio: vagasFiltradas.filter(v => v.nivel === "Médio"),
    Básico: vagasFiltradas.filter(v => v.nivel === "Básico"),
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "32px 8px",
        minHeight: "80vh",
      }}
    >
      {/* Sidebar fixa à esquerda */}
      <aside
        style={{
          marginLeft: -240,
          left: 32,
          top: 100,
          width: 240,
          borderRadius: 16,
          padding: "24px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          zIndex: 10,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#1976d2", display: "flex", alignItems: "center", gap: 6 }}>
          <WorkIcon sx={{ fontSize: 22 }} /> Filtros
        </div>
        {/* Filtro por tipo */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Tipo de vaga</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tipos.map((t) => (
              <button
                key={t}
                className={tipo === t ? styles.activeFilter : styles.filterBtn}
                onClick={() => setTipo(t)}
                aria-pressed={tipo === t}
                style={{
                  height: 40,
                  minWidth: 120,
                  padding: "0 60px",
                  borderRadius: 20,
                  border: "1px solid #1976d2",
                  background: tipo === t ? "#1976d2" : "#fff",
                  color: tipo === t ? "#fff" : "#1976d2",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: tipo === t ? "0 2px 8px #1976d255" : "none",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: 6,
                }}
              >
                {t === "Home Office" && <HomeIcon sx={{ fontSize: 18 }} />}
                {t === "Presencial" && <BusinessIcon sx={{ fontSize: 18 }} />}
                {t}
              </button>
            ))}
          </div>
        </div>
        {/* Filtro por nível */}
        <div>
          <div style={{ fontWeight: 600, margin: "24px 0 8px 0", fontSize: 15 }}>Nível</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {niveis.map((n) => (
              <button
                key={n}
                className={nivel === n ? styles.activeFilter : styles.filterBtn}
                onClick={() => setNivel(n)}
                aria-pressed={nivel === n}
                style={{
                  height: 40,
                  minWidth: 120,
                  padding: "0 60px",
                  textAlign: "center",
                  borderRadius: 20,
                  border: "1px solid #1976d2",
                  background: nivel === n ? "#1976d2" : "#fff",
                  color: nivel === n ? "#fff" : "#1976d2",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: nivel === n ? "0 2px 8px #1976d255" : "none",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Espaço lateral para o sidebar fixo */}
      <div style={{ width: 280 }} />

      {/* Lista de vagas separadas por nível */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <div className={styles.title} style={{ marginBottom: 18 }}>
          <WorkIcon sx={{ fontSize: 32, verticalAlign: "middle", color: "var(--primary, #1976d2)", mr: 1 }} />
          Vagas em destaque
        </div>

        {/* Campo de busca */}
        <div style={{
          position: "relative",
          maxWidth: 600,
          margin: "auto",
          display: "flex",
          alignItems: "center",
          marginBottom: 30,
        }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              color: "#1976d2",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              opacity: 0.85,
            }}
          >
            <SearchIcon fontSize="medium" />
          </span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar vaga, empresa ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 40px 12px 44px",
              borderRadius: 24,
              border: "2px solid #1976d2",
              background: "#fff",
              fontSize: 16,
              color: "#222",
              boxShadow: "0 2px 12px #1976d220",
              outline: "none",
              transition: "border 0.2s, box-shadow 0.2s",
              marginBottom: 0,
            }}
          />
          {busca && (
            <button
              aria-label="Limpar busca"
              onClick={() => setBusca("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#f5f5f5",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                color: "#888",
                padding: 4,
                boxShadow: "0 1px 4px #0001",
                transition: "background 0.2s",
              }}
            >
              <ClearIcon fontSize="small" />
            </button>
          )}
        </div>

        {/* Contador de vagas */}
        <div style={{ marginBottom: 18, fontWeight: 500, color: "#1976d2" }}>
          {vagasFiltradas.length} vaga{vagasFiltradas.length === 1 ? "" : "s"} encontrada{vagasFiltradas.length === 1 ? "" : "s"}
        </div>

        {/* Separação visual por nível */}
        {nivel === "Todos" && (
          <>
            {(["Básico", "Médio", "Superior"] as Array<keyof typeof vagasPorNivel>).map((nivelKey) =>
              vagasPorNivel[nivelKey].length > 0 && (
                <div key={nivelKey} style={{ marginBottom: 40 }}>
                  <h2 style={{
                    color: "#1976d2",
                    fontSize: 22,
                    fontWeight: 700,
                    margin: "32px 0 18px 0",
                    borderBottom: "2px solid #1976d2",
                    paddingBottom: 4,
                  }}>
                    Vagas de nível {nivelKey}
                  </h2>
                  <div className={styles.list}>
                    {vagasPorNivel[nivelKey].map((vaga, idx) => (
                      <div
                        className={styles.card}
                        key={vaga.id}
                        style={{
                          animation: `fadeInUp 0.6s ${idx * 0.06 + 0.1}s both`,
                          borderLeft: vaga.tipo === "Home Office" ? "4px solid #43c6ac" : "4px solid #1976d2",
                          position: "relative",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className={styles.cardTitle}>{vaga.titulo}</div>
                        </div>
                        <div className={styles.cardCompany}>{vaga.empresa}</div>
                        <div className={styles.cardLocation}>
                          <PlaceIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                          {vaga.local}
                        </div>
                        <div className={styles.cardDesc}>
                          {vaga.desc}
                        </div>
                        <div style={{ color: "#388e3c", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                          Salário: {formatSalario(vaga.titulo)}
                        </div>
                        <div style={{ color: "#1976d2", fontSize: 14, marginBottom: 4 }}>
                          Benefícios: {beneficiosPadrao.join(", ")}
                        </div>
                        {/* Tag de tipo */}
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: vaga.tipo === "Home Office" ? "#43c6ac" : "#1976d2",
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 600,
                          borderRadius: 12,
                          padding: "2px 10px",
                          margin: "8px 0",
                          boxShadow: "0 1px 4px #1976d233"
                        }}>
                          {vaga.tipo === "Home Office" ? <HomeIcon sx={{ fontSize: 16 }} /> : <BusinessIcon sx={{ fontSize: 16 }} />}
                          {vaga.tipo}
                        </span>
                        <button
                          className={styles.applyBtn}
                          style={{
                            marginTop: 10,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            background: "linear-gradient(90deg, #1976d2 60%, #00eaff 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            borderRadius: 99,
                            padding: "8px 20px",
                            boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
                            textDecoration: "none",
                            transition: "all 0.2s",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVagaSelecionada(vaga);
                            setShowForm(true);
                          }}
                        >
                          <SendIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                          Candidatar-se
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </>
        )}

        {/* Se nível filtrado, mostra lista única */}
        {nivel !== "Todos" && (
          <div className={styles.list}>
            {vagasFiltradas.map((vaga, idx) => (
              <div
                className={styles.card}
                key={vaga.id}
                style={{
                  animation: `fadeInUp 0.6s ${idx * 0.06 + 0.1}s both`,
                  borderLeft: vaga.tipo === "Home Office" ? "4px solid #43c6ac" : "4px solid #1976d2",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className={styles.cardTitle}>{vaga.titulo}</div>
                </div>
                <div className={styles.cardCompany}>{vaga.empresa}</div>
                <div className={styles.cardLocation}>
                  <PlaceIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                  {vaga.local}
                </div>
                <div className={styles.cardDesc}>
                  {vaga.desc}
                </div>
                <div style={{ color: "#388e3c", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                  Salário: {formatSalario(vaga.titulo)}
                </div>
                <div style={{ color: "#1976d2", fontSize: 14, marginBottom: 4 }}>
                  Benefícios: {beneficiosPadrao.join(", ")}
                </div>
                {/* Tag de tipo */}
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: vaga.tipo === "Home Office" ? "#43c6ac" : "#1976d2",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 12,
                  padding: "2px 10px",
                  margin: "8px 0",
                  boxShadow: "0 1px 4px #1976d233"
                }}>
                  {vaga.tipo === "Home Office" ? <HomeIcon sx={{ fontSize: 16 }} /> : <BusinessIcon sx={{ fontSize: 16 }} />}
                  {vaga.tipo}
                </span>
                <button
                  className={styles.applyBtn}
                  style={{
                    marginTop: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "linear-gradient(90deg, #1976d2 60%, #00eaff 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: 99,
                    padding: "8px 20px",
                    boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setVagaSelecionada(vaga);
                    setShowForm(true);
                  }}
                >
                  <SendIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                  Candidatar-se
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Página de inscrição - Modal */}
        {showForm && vagaSelecionada && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.35)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowForm(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <FormularioCandidatura vaga={vagaSelecionada} onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}

        {/* Animação fadeInUp */}
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 24px, 0);
            }
            
            export default VagasList;
            to {
              opacity: 1;
              transform: none;
            }
          }
          @media (max-width: 900px) {
            .${styles.container} {
              flex-direction: column !important;
            }
            aside {
              width: 100% !important;
              min-width: 0 !important;
              margin-bottom: 24px !important;
              position: static !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
};

// Salários por profissão
const salariosPorProfissao: Record<string, { min: number; max: number }> = {
  "Engenheiro Civil": { min: 6000, max: 12000 },
  "Médico Clínico Geral": { min: 8000, max: 15000 },
  "Advogado": { min: 3500, max: 9000 },
  "Professor Universitário": { min: 3500, max: 9000 },
  "Farmacêutico": { min: 3200, max: 7000 },
  "Engenheiro de Produção": { min: 5000, max: 11000 },
  "Psicólogo": { min: 2500, max: 6500 },
  "Administrador": { min: 3000, max: 7500 },
  "Analista de Sistemas": { min: 3500, max: 9000 },
  "Nutricionista": { min: 2500, max: 6000 },
  "Técnico em Enfermagem": { min: 1800, max: 3500 },
  "Assistente Administrativo": { min: 1800, max: 3000 },
  "Técnico em Informática": { min: 2000, max: 4000 },
  "Recepcionista": { min: 1800, max: 2500 },
  "Fiscal de Loja": { min: 1800, max: 2500 },
  "Auxiliar de Laboratório": { min: 1800, max: 2600 },
  "Técnico em Segurança do Trabalho": { min: 2200, max: 4000 },
  "Operador de Caixa": { min: 1800, max: 2500 },
  "Secretário Escolar": { min: 2000, max: 3000 },
  "Agente de Saúde": { min: 1800, max: 2800 },
  "Auxiliar de Escritório": { min: 1800, max: 2500 },
  "Técnico em Edificações": { min: 2200, max: 4000 },
  "Técnico em Meio Ambiente": { min: 2200, max: 4000 },
  "Auxiliar de Farmácia": { min: 1800, max: 2500 },
  "Técnico em Radiologia": { min: 2200, max: 3500 },
  "Técnico em Contabilidade": { min: 2000, max: 3500 },
  "Técnico em Logística": { min: 2000, max: 3500 },
  "Técnico em Agropecuária": { min: 2000, max: 3500 },
  "Técnico em Administração": { min: 2000, max: 3500 },
  "Técnico em Química": { min: 2200, max: 4000 },
  "Auxiliar de Serviços Gerais": { min: 1800, max: 2200 },
  "Atendente de Loja": { min: 1800, max: 2200 },
  "Auxiliar de Cozinha": { min: 1800, max: 2200 },
  "Porteiro": { min: 1800, max: 2200 },
  "Zelador": { min: 1800, max: 2200 },
  "Repositor de Mercadorias": { min: 1800, max: 2200 },
  "Auxiliar de Limpeza": { min: 1800, max: 2200 },
  "Vigia": { min: 1800, max: 2200 },
  "Auxiliar de Produção": { min: 1800, max: 2200 },
  "Servente de Obras": { min: 1800, max: 2200 },
  "Balconista": { min: 1800, max: 2200 },
  "Auxiliar de Estoque": { min: 1800, max: 2200 },
  "Motorista": { min: 2000, max: 3500 },
  "Garçom": { min: 1800, max: 2200 },
  "Auxiliar de Lavanderia": { min: 1800, max: 2200 },
  "Auxiliar de Manutenção": { min: 1800, max: 2200 },
  "Auxiliar de Almoxarifado": { min: 1800, max: 2200 },
};

function formatSalario(titulo: string) {
  const sal = salariosPorProfissao[titulo];
  if (sal) {
    return `R$ ${sal.min.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} até R$ ${sal.max.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }
  return "R$ 1.800,00 até R$ 15.000,00*";
}

// Benefícios padrão
const beneficiosPadrao = [
  "Vale Alimentação",
  "Vale Transporte",
  "Plano de Saúde"
];

export default VagasList;

