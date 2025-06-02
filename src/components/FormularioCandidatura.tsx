import React, { useState } from "react";

// Defina o tipo Vaga
type Vaga = {
  titulo: string;
  desc: string;
};

// Função auxiliar para formatar o salário (ajuste conforme necessário)
function formatSalario(): string {
  // Exemplo simples, ajuste conforme sua lógica real
  return "R$ 2.000,00";
}

function FormularioCandidatura({ vaga, onClose }: { vaga: Vaga, onClose: () => void }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [curriculo, setCurriculo] = useState<File | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setErro(false);

    // Simulação de upload do currículo (você pode integrar com S3/Cloudinary depois)
    let curriculoUrl = "";
    if (curriculo) {
      // Aqui você pode fazer upload real, por enquanto só nome do arquivo
      curriculoUrl = curriculo.name;
    }

    // Envio para o backend
    const response = await fetch("http://localhost:4000/candidatos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        cpf,
        nascimento,
        email,
        whatsapp,
        curriculoUrl,
        vaga: vaga?.titulo || "",
      }),
    });

    if (!response.ok) {
      setErro(true);
    }

    setTimeout(() => {
      setEnviado(false);
      if (!erro) onClose();
    }, 2000);
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 18,
      padding: 0,
      minWidth: 340,
      maxWidth: "95vw",
      boxShadow: "0 4px 32px #1976d233",
      position: "relative",
    }}>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 16,
          top: 16,
          background: "none",
          border: "none",
          fontSize: 22,
          color: "#888",
          cursor: "pointer",
          zIndex: 2,
        }}
        aria-label="Fechar"
      >
        ×
      </button>
      <div style={{ padding: 32, maxWidth: 500 }}>
        <h2 style={{
          color: "#1976d2",
          textAlign: "center",
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: 0.5,
          marginBottom: 8,
        }}>
          Cadastro para: <br />
          <span style={{ fontWeight: 700 }}>{vaga.titulo}</span>
        </h2>
        <div style={{ textAlign: "center", color: "#444", fontSize: 16, marginBottom: 10 }}>
          {vaga.desc}
        </div>
        <div style={{ textAlign: "center", color: "#388e3c", fontWeight: 600, fontSize: 15, marginBottom: 18 }}>
          Salário: {formatSalario()}
        </div>
        <div style={{ textAlign: "center", color: "#1976d2", fontSize: 15, marginBottom: 18 }}>
          Benefícios: Vale Alimentação, Vale Transporte, Plano de Saúde
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: "1.5px solid #1976d2", fontSize: 15 }}
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            required
            maxLength={14}
            style={{ padding: 10, borderRadius: 8, border: "1.5px solid #1976d2", fontSize: 15 }}
          />
          <input
            type="date"
            placeholder="Data de nascimento"
            value={nascimento}
            onChange={e => setNascimento(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: "1.5px solid #1976d2", fontSize: 15 }}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: "1.5px solid #1976d2", fontSize: 15 }}
          />
          <input
            type="tel"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: "1.5px solid #1976d2", fontSize: 15 }}
          />
          <div>
            <label style={{ fontWeight: 500, color: "#1976d2" }}>
              Anexar currículo:
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setCurriculo(e.target.files ? e.target.files[0] : null)}
              required
              style={{ marginTop: 8 }}
            />
            {curriculo && (
              <div style={{ fontSize: 13, color: "#1976d2", marginTop: 4 }}>
                {curriculo.name}
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #1976d2 60%, #00eaff 100%)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 99,
              padding: "12px 0",
              fontSize: 17,
              border: "none",
              marginTop: 10,
              cursor: "pointer",
              transition: "background 0.2s",
              letterSpacing: 0.5,
            }}
            disabled={enviado}
          >
            {enviado ? "Enviando..." : "Enviar"}
          </button>
          {enviado && (
            <div style={{ color: "#43c6ac", fontWeight: 700, fontSize: 16, textAlign: "center", marginTop: 4 }}>
              Dados enviados com sucesso!
            </div>
          )}
          {erro && (
            <div style={{ color: "red", fontWeight: 700, fontSize: 16, textAlign: "center", marginTop: 4 }}>
              Erro ao enviar dados, tente novamente.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Exporte o componente corretamente (ajuste para exportar o componente correto)
export default FormularioCandidatura;