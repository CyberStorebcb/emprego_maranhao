import React, { useState } from "react";
import styles from "../app/vagas/vagas.module.css";
import { useThemeMode } from "./ThemeRegistry"; // ajuste o caminho se necessário
import FormularioCandidatura from "./FormularioCandidatura"; // ajuste o caminho se necessário

const municipios = [
  "São Luís", "Imperatriz", "Timon", "Caxias", "São José de Ribamar", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas",
  "Barra do Corda", "Pinheiro", "Santa Inês", "Chapadinha", "Buriticupu", "Grajaú", "Itapecuru Mirim", "Viana", "Zé Doca", "Coroatá"
];

const tipos = ["CLT", "Estágio", "Temporário", "PJ"];
const areas = [
  "Administrativo", "Tecnologia", "Saúde", "Educação", "Comercial", "Financeiro", "RH", "Logística", "Jurídico", "Engenharia"
];

const niveisAgrupados = {
  Básico: ["Auxiliar", "Operacional"],
  Médio: ["Técnico", "Analista"],
  Avançado: ["Especialista", "Coordenador", "Gerente", "Diretor"],
};

function gerarVagas(qtd = 500) {
  const vagas = [];
  for (let i = 1; i <= qtd; i++) {
    const municipio = municipios[Math.floor(Math.random() * municipios.length)];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    let nivel;
    if (i <= qtd * 0.4) nivel = niveisAgrupados.Básico[Math.floor(Math.random() * niveisAgrupados.Básico.length)];
    else if (i <= qtd * 0.75) nivel = niveisAgrupados.Médio[Math.floor(Math.random() * niveisAgrupados.Médio.length)];
    else nivel = niveisAgrupados.Avançado[Math.floor(Math.random() * niveisAgrupados.Avançado.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    let salarioBase = 1500;
    if (tipo === "Estágio") salarioBase = 900;
    else if (nivel === "Auxiliar" || nivel === "Operacional")
      salarioBase = 1400 + Math.floor(Math.random() * 400);
    else if (nivel === "Técnico") salarioBase = 1800 + Math.floor(Math.random() * 700);
    else if (nivel === "Analista") salarioBase = 2500 + Math.floor(Math.random() * 1500);
    else if (nivel === "Especialista") salarioBase = 3500 + Math.floor(Math.random() * 2000);
    else if (nivel === "Coordenador") salarioBase = 5000 + Math.floor(Math.random() * 2000);
    else if (nivel === "Gerente") salarioBase = 7000 + Math.floor(Math.random() * 3000);
    else if (nivel === "Diretor") salarioBase = 12000 + Math.floor(Math.random() * 8000);
    if (tipo === "PJ") salarioBase += 1000 + Math.floor(Math.random() * 2000);
    if (tipo === "Temporário") salarioBase -= 300;

    vagas.push({
      id: i,
      titulo: `${nivel} de ${area}`,
      empresa: `Empresa ${String.fromCharCode(65 + (i % 26))}${i}`,
      local: municipio,
      tipo,
      nivel,
      salario: salarioBase,
      desc: `Atue como ${nivel.toLowerCase()} na área de ${area.toLowerCase()} em ${municipio}.`,
      nova: Math.random() < 0.15,
    });
  }
  return vagas;
}


type Vaga = {
  id: number;
  titulo: string;
  empresa: string;
  local: string;
  tipo: string;
  nivel: string;
  salario: number;
  desc: string;
  nova: boolean;
};

const vagas = gerarVagas(500);

const tiposFiltro = ["Todos", ...tipos];
const cidades = ["Todas", ...Array.from(new Set(vagas.map((v) => v.local)))];
const niveisFiltro = ["Todos", "Básico", "Médio", "Avançado"];

function formatSalario(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export default function VagasList() {
  const { mode } = useThemeMode();
  const tema = mode; // "light" | "dark"
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [cidade, setCidade] = useState("Todas");
  const [nivel, setNivel] = useState("Todos");
  const [ordem, setOrdem] = useState<"desc" | "asc">("desc");
  const [filtroAberto, setFiltroAberto] = useState(false); // <-- alterado para iniciar fechado
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const filtrarPorNivel = (vagaNivel: string) => {
    if (nivel === "Todos") return true;
    if (nivel === "Básico") return niveisAgrupados.Básico.includes(vagaNivel);
    if (nivel === "Médio") return niveisAgrupados.Médio.includes(vagaNivel);
    if (nivel === "Avançado") return niveisAgrupados.Avançado.includes(vagaNivel);
    return vagaNivel === nivel;
  };

  const vagasFiltradas = vagas
    .filter(
      (vaga) =>
        (tipo === "Todos" || vaga.tipo === tipo) &&
        (cidade === "Todas" || vaga.local === cidade) &&
        filtrarPorNivel(vaga.nivel) &&
        (vaga.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          vaga.empresa.toLowerCase().includes(busca.toLowerCase()) ||
          vaga.local.toLowerCase().includes(busca.toLowerCase()))
    )
    .sort((a, b) =>
      ordem === "desc" ? b.salario - a.salario : a.salario - b.salario
    );

  // Filtros ativos e funções auxiliares
  const filtrosAtivos: string[] = [];
  if (tipo !== "Todos") filtrosAtivos.push(`Tipo: ${tipo}`);
  if (nivel !== "Todos") filtrosAtivos.push(`Nível: ${nivel}`);
  if (cidade !== "Todas") filtrosAtivos.push(`Cidade: ${cidade}`);
  if (busca.trim() !== "") filtrosAtivos.push(`Busca: "${busca}"`);

  function removerFiltro(filtro: string) {
    if (filtro.startsWith("Tipo:")) setTipo("Todos");
    else if (filtro.startsWith("Nível:")) setNivel("Todos");
    else if (filtro.startsWith("Cidade:")) setCidade("Todas");
    else if (filtro.startsWith("Busca:")) setBusca("");
  }

  function limparFiltros() {
    setTipo("Todos");
    setNivel("Todos");
    setCidade("Todas");
    setBusca("");
  }

  return (
    <section
      className={`${styles.container} ${mode === "dark" ? styles.dark : ""}`}
      aria-label="Lista de vagas"
      tabIndex={-1}
    >
      <div className={styles.flexContainer}>
        <aside className={styles.sidebar}>
          {/* Botão para abrir/fechar filtros */}
          <button
            className={styles.ctaBtn}
            style={{
              marginBottom: 24,
              display: "block",
              width: "100%",
              maxWidth: 240,
              fontSize: "1.08rem",
              padding: "10px 0",
              background: "#f5faff",
              color: "#1976d2",
              border: "2px solid #1976d2",
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(25,118,210,0.10)",
            }}
            onClick={() => setFiltroAberto((v) => !v)}
            aria-expanded={filtroAberto}
            aria-controls="filtros-vagas"
          >
            {filtroAberto ? "Ocultar filtros ▲" : "Mostrar filtros ▼"}
          </button>

          {/* Sidebar com filtros, colapsável */}
          {filtroAberto && (
            <aside
              className={styles.sidebar}
              id="filtros-vagas"
              aria-label="Filtros de vagas"
              style={{
                maxWidth: 280,
                minWidth: 180,
                marginBottom: 32,
                border: "2px solid #1976d2",
                background: tema === "dark" ? "#232a36" : "#fff",
                color: tema === "dark" ? "#fff" : "#222",
                boxShadow: "0 4px 24px rgba(25,118,210,0.13)",
                zIndex: 2,
              }}
            >
              <h2 style={{
                color: tema === "dark" ? "#fff" : "#1976d2",
                fontWeight: 800,
                fontSize: "1.2rem",
                marginBottom: 12,
                letterSpacing: "-1px"
              }}>Filtros</h2>
              <label htmlFor="busca" style={{ fontWeight: 600, fontSize: "1rem" }}>
                Buscar vaga:
              </label>
              <input
                id="busca"
                className={styles.searchInput}
                type="text"
                placeholder="Digite título, empresa ou cidade"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                aria-label="Buscar vaga"
                style={{
                  background: tema === "dark" ? "#181c24" : "#f5faff",
                  color: tema === "dark" ? "#fff" : "#222",
                  borderColor: "#1976d2"
                }}
              />
              <div style={{ marginTop: 18 }}>
                <span style={{ fontWeight: 600 }}>Tipo:</span>
                <div role="group" aria-label="Filtrar por tipo de vaga" style={{ marginTop: 8, flexWrap: "wrap", display: "flex" }}>
                  {tiposFiltro.map((t) => (
                    <button
                      key={t}
                      className={tipo === t ? styles.applyBtn : styles.ctaBtn}
                      style={{
                        marginRight: 8,
                        marginBottom: 8,
                        outline: tipo === t ? "2px solid #1976d2" : "none",
                        padding: "6px 14px",
                        background: tipo === t
                          ? (tema === "dark" ? "#1976d2" : "#1976d2")
                          : (tema === "dark" ? "#232a36" : "#fff"),
                        color: tipo === t
                          ? "#fff"
                          : (tema === "dark" ? "#fff" : "#1976d2"),
                        border: "1.5px solid #1976d2",
                        fontWeight: tipo === t ? 700 : 600,
                      }}
                      onClick={() => setTipo(t)}
                      aria-pressed={tipo === t}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <span style={{ fontWeight: 600 }}>Nível:</span>
                <div role="group" aria-label="Filtrar por nível" style={{ marginTop: 8, flexWrap: "wrap", display: "flex" }}>
                  {niveisFiltro.map((n) => (
                    <button
                      key={n}
                      className={nivel === n ? styles.applyBtn : styles.ctaBtn}
                      style={{
                        marginRight: 8,
                        marginBottom: 8,
                        outline: nivel === n ? "2px solid #1976d2" : "none",
                        padding: "6px 14px",
                        background: nivel === n
                          ? (tema === "dark" ? "#1976d2" : "#1976d2")
                          : (tema === "dark" ? "#232a36" : "#fff"),
                        color: nivel === n
                          ? "#fff"
                          : (tema === "dark" ? "#fff" : "#1976d2"),
                        border: "1.5px solid #1976d2",
                        fontWeight: nivel === n ? 700 : 600,
                      }}
                      onClick={() => setNivel(n)}
                      aria-pressed={nivel === n}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <span style={{ fontWeight: 600 }}>Cidade:</span>
                <select
                  className={styles.searchInput}
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  aria-label="Filtrar por cidade"
                  style={{
                    marginTop: 8,
                    background: tema === "dark" ? "#181c24" : "#f5faff",
                    color: tema === "dark" ? "#fff" : "#222",
                    borderColor: "#1976d2"
                  }}
                >
                  {cidades.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginTop: 18 }}>
                <span style={{ fontWeight: 600 }}>Ordenar por salário:</span>
                <div role="group" aria-label="Ordenar vagas" style={{ marginTop: 8 }}>
                  <button
                    className={ordem === "desc" ? styles.applyBtn : styles.ctaBtn}
                    style={{
                      marginRight: 8,
                      padding: "6px 14px",
                      background: ordem === "desc"
                        ? (tema === "dark" ? "#1976d2" : "#1976d2")
                        : (tema === "dark" ? "#232a36" : "#fff"),
                      color: ordem === "desc"
                        ? "#fff"
                        : (tema === "dark" ? "#fff" : "#1976d2"),
                      border: "1.5px solid #1976d2",
                      fontWeight: ordem === "desc" ? 700 : 600,
                    }}
                    onClick={() => setOrdem("desc")}
                    aria-pressed={ordem === "desc"}
                  >
                    Maior salário
                  </button>
                  <button
                    className={ordem === "asc" ? styles.applyBtn : styles.ctaBtn}
                    onClick={() => setOrdem("asc")}
                    aria-pressed={ordem === "asc"}
                    style={{
                      padding: "6px 14px",
                      background: ordem === "asc"
                        ? (tema === "dark" ? "#1976d2" : "#1976d2")
                        : (tema === "dark" ? "#232a36" : "#fff"),
                      color: ordem === "asc"
                        ? "#fff"
                        : (tema === "dark" ? "#fff" : "#1976d2"),
                      border: "1.5px solid #1976d2",
                      fontWeight: ordem === "asc" ? 700 : 600,
                    }}
                  >
                    Menor salário
                  </button>
                </div>
              </div>
            </aside>
          )}
        </aside>

        <main className={styles.mainContent}>
          {filtrosAtivos.length > 0 && (
            <div className={styles.filtrosAtivos}>
              {filtrosAtivos.map(f => (
                <span key={f} className={styles.filtroTag}>
                  {f} <button onClick={() => removerFiltro(f)}>×</button>
                </span>
              ))}
              <button onClick={limparFiltros} className={styles.limparBtn}>Limpar filtros</button>
            </div>
          )}
          <h2 className={styles.tituloVagas}>
            {vagasFiltradas.length} vaga(s) encontrada(s)
          </h2>
          <div
            className={styles.list}
            role="list"
            aria-label="Resultados de vagas"
            style={{ gap: 32, marginBottom: 40 }}
          >
            {vagasFiltradas.length === 0 && (
              <div className={styles.noJobs} role="status">
                Nenhuma vaga encontrada.
              </div>
            )}
            {vagasFiltradas.map((vaga) => (
              <article
                className={styles.card}
                key={vaga.id}
                tabIndex={0}
                aria-label={`Vaga para ${vaga.titulo} em ${vaga.local}, tipo ${vaga.tipo}, nível ${vaga.nivel}, salário ${formatSalario(
                  vaga.salario
                )}`}
                style={
                  vaga.nova
                    ? {
                        border: "2px solid #43c6ac",
                        boxShadow: "0 0 0 3px #43c6ac33",
                        marginBottom: 8,
                        background: tema === "dark" ? "#232a36" : "#fff",
                        color: tema === "dark" ? "#fff" : "#222",
                      }
                    : {
                        marginBottom: 8,
                        background: tema === "dark" ? "#232a36" : "#fff",
                        color: tema === "dark" ? "#fff" : "#222",
                      }
                }
              >
                <div className={styles.cardTitle}>
                  {vaga.titulo}
                  {vaga.nova && (
                    <span
                      style={{
                        background: "#43c6ac",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 12,
                        borderRadius: 8,
                        padding: "2px 8px",
                        marginLeft: 10,
                        verticalAlign: "middle",
                      }}
                      aria-label="Vaga nova"
                    >
                      NOVA
                    </span>
                  )}
                </div>
                <div className={styles.cardCompany}>{vaga.empresa}</div>
                <div className={styles.cardLocation}>{vaga.local}</div>
                <div className={styles.cardDesc}>{vaga.desc}</div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#1976d2",
                    marginBottom: 4,
                  }}
                >
                  {formatSalario(vaga.salario)} | {vaga.tipo} | {vaga.nivel}
                </div>
                <button
                  className={styles.applyBtn}
                  type="button"
                  aria-label={`Candidatar-se para vaga de ${vaga.titulo}`}
                  tabIndex={0}
                  style={{
                    background: tema === "dark" ? "#1976d2" : "#1976d2",
                    color: "#fff",
                  }}
                  onClick={() => {
                    setVagaSelecionada(vaga);
                    setModalAberto(true);
                  }}
                >
                  Candidatar-se
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>
      {/* Botão de acessibilidade: voltar ao topo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: tema === "dark" ? "#232a36" : "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 48,
          height: 48,
          fontSize: 24,
          boxShadow: "0 2px 8px rgba(25,118,210,0.18)",
          cursor: "pointer",
          zIndex: 1000,
        }}
        aria-label="Voltar ao topo"
      >
        ↑
      </button>
      {/* Mensagem de acessibilidade */}
      <div
        style={{
          position: "absolute",
          left: -9999,
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
        aria-live="polite"
      >
        Pressione Tab para navegar entre as vagas.
      </div>
      {/* Modal de candidatura */}
      {modalAberto && vagaSelecionada && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.45)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setModalAberto(false)}
        >
          <div
            style={{ zIndex: 2100, minWidth: 340, maxWidth: "95vw" }}
            onClick={e => e.stopPropagation()}
          >
            <FormularioCandidatura
              vaga={vagaSelecionada}
              onClose={() => setModalAberto(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}