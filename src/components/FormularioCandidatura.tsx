import React, { useState } from "react";
import { IMaskInput } from "react-imask";

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
  requisitos?: string[];
  atividades?: string[];
  beneficios?: string[];
  horario?: string;
  contratacao?: string;
};

function formatSalario(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarWhatsapp(wpp: string) {
  return /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(wpp);
}

function idadeMinima(nasc: string, min = 16) {
  if (!nasc) return false;
  const nascDate = new Date(nasc);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascDate.getFullYear();
  const m = hoje.getMonth() - nascDate.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascDate.getDate())) {
    idade--;
  }
  return idade >= min;
}

interface Props {
  vaga: Vaga;
  onClose: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const FormularioCandidatura: React.FC<Props> = ({ vaga, onClose }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [curriculo, setCurriculo] = useState<File | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState(false);
  const [erros, setErros] = useState<{ [k: string]: string }>({});

  const validar = () => {
    const e: { [k: string]: string } = {};
    if (!nome.trim() || nome.trim().length < 3) e.nome = "Nome deve ter ao menos 3 letras.";
    else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome.trim())) e.nome = "Nome só pode conter letras.";
    if (!cpf || !validarCPF(cpf)) e.cpf = "CPF inválido.";
    if (!nascimento || !idadeMinima(nascimento)) e.nascimento = "Idade mínima: 16 anos.";
    if (!email || !validarEmail(email)) e.email = "E-mail inválido.";
    if (!whatsapp || !validarWhatsapp(whatsapp)) e.whatsapp = "WhatsApp inválido. Ex: (99) 99999-9999";
    if (!curriculo) e.curriculo = "Anexe seu currículo.";
    else if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(curriculo.type))
      e.curriculo = "Arquivo deve ser PDF ou DOC/DOCX.";
    else if (curriculo.size > 2 * 1024 * 1024) e.curriculo = "Tamanho máximo: 2MB.";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    setEnviado(true);
    setErro(false);

    // Simulação de upload do currículo (ajuste para upload real se quiser)
    let curriculoUrl = "";
    if (curriculo) {
      curriculoUrl = curriculo.name; // ou faça upload e pegue a URL real
    }

    try {
      const response = await fetch(`${API_URL}/candidatos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cpf,
          nascimento,
          email,
          whatsapp,
          curriculoUrl,
          vaga: vaga.titulo,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      setTimeout(() => {
        setEnviado(false);
        setErro(false);
        onClose();
      }, 1500);
    } catch {
      setErro(true);
      setEnviado(false);
    }
  };

  return (
    <div
      className="formulario-modal"
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 16,
        width: "100%",
        maxWidth: 420,
        minWidth: 0,
        boxSizing: "border-box",
        margin: "0 auto",
        overflowY: "auto",
        maxHeight: "90vh",
      }}
    >
      <button
        onClick={onClose}
        style={{
          float: "right",
          fontSize: 22,
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
        aria-label="Fechar"
        type="button"
      >
        ×
      </button>
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
        Salário: {formatSalario(vaga.salario)}
      </div>
      <div style={{
  width: "100%",
  background: "#f5faff",
  borderRadius: 12,
  padding: 18,
  marginBottom: 18,
  boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
  border: "1.5px solid #1976d2",
  boxSizing: "border-box",
}}>
  <div style={{ marginBottom: 10 }}>
    <span style={{ color: "#1976d2", fontWeight: 800, fontSize: 18, display: "block", marginBottom: 6 }}>
      Requisitos:
    </span>
    <ul style={{ margin: 0, paddingLeft: 22, color: "#222", fontSize: 15, fontWeight: 500 }}>
      {vaga.requisitos?.map((req, idx) => (
        <li key={idx}>{req}</li>
      ))}
    </ul>
  </div>
  <div style={{ marginBottom: 10 }}>
    <span style={{ color: "#1976d2", fontWeight: 800, fontSize: 18, display: "block", marginBottom: 6 }}>
      O que você irá fazer:
    </span>
    <ul style={{ margin: 0, paddingLeft: 22, color: "#222", fontSize: 15, fontWeight: 500 }}>
      {vaga.atividades?.map((atv, idx) => (
        <li key={idx}>{atv}</li>
      ))}
    </ul>
  </div>
  {vaga.beneficios && (
    <div style={{ marginBottom: 10 }}>
      <span style={{ color: "#1976d2", fontWeight: 800, fontSize: 18 }}>Benefícios:</span>
      <span style={{ color: "#222", fontSize: 15, fontWeight: 500, marginLeft: 8 }}>
        {vaga.beneficios.join(", ")}
      </span>
    </div>
  )}
  {vaga.horario && (
    <div style={{ marginBottom: 10 }}>
      <span style={{ color: "#1976d2", fontWeight: 800, fontSize: 18 }}>Horário:</span>
      <span style={{ color: "#222", fontSize: 15, fontWeight: 500, marginLeft: 8 }}>
        {vaga.horario}
      </span>
    </div>
  )}
  {vaga.contratacao && (
    <div>
      <span style={{ color: "#1976d2", fontWeight: 800, fontSize: 18 }}>Tipo de contratação:</span>
      <span style={{ color: "#222", fontSize: 15, fontWeight: 500, marginLeft: 8 }}>
        {vaga.contratacao}
      </span>
    </div>
  )}
</div>
      <div style={{
  background: "#f5faff",
  borderRadius: 12,
  padding: 16,
  marginBottom: 18,
  boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
  border: "1.5px solid #1976d2",
}}>
  <strong style={{ color: "#1976d2", fontSize: 18 }}>Atenção!</strong>
  <p style={{ color: "#333", fontSize: 15, marginTop: 8, marginBottom: 0 }}>
    Antes de se candidatar, verifique se seus dados estão corretos e atualizados.
  </p>
  <p style={{ color: "#333", fontSize: 15, marginTop: 4, marginBottom: 0 }}>
    É importante que você tenha mais de 16 anos e que seu CPF seja válido.
  </p>
  <p style={{ color: "#333", fontSize: 15, marginTop: 4, marginBottom: 0 }}>
    Não se esqueça de anexar seu currículo em formato PDF ou DOC/DOCX.
  </p>
</div>
      <form
  onSubmit={handleSubmit}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    boxSizing: "border-box",
  }}
>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={e => {
            setNome(e.target.value);
            if (!e.target.value.trim() || e.target.value.trim().length < 3) setErros(prev => ({ ...prev, nome: "Nome deve ter ao menos 3 letras." }));
            else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(e.target.value.trim())) setErros(prev => ({ ...prev, nome: "Nome só pode conter letras." }));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            else setErros(prev => { const { nome, ...rest } = prev; return rest; });
          }}
          onBlur={e => {
            if (!e.target.value.trim() || e.target.value.trim().length < 3) setErros(prev => ({ ...prev, nome: "Nome deve ter ao menos 3 letras." }));
            else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(e.target.value.trim())) setErros(prev => ({ ...prev, nome: "Nome só pode conter letras." }));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            else setErros(prev => { const { nome, ...rest } = prev; return rest; });
          }}
          required
          aria-invalid={!!erros.nome}
          aria-describedby={erros.nome ? "erro-nome" : undefined}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: `1.5px solid ${erros.nome ? "red" : "#1976d2"}`,
            fontSize: 15,
            boxSizing: "border-box",
          }}
        />
        {erros.nome && <span id="erro-nome" role="alert" style={{ color: "red", fontSize: 13 }}>{erros.nome}</span>}

        <IMaskInput
          mask="000.000.000-00"
          value={cpf}
          onAccept={value => setCpf(value)}
          as="input"
          type="text"
          placeholder="CPF (ex: 619.834.693-51)"
          required
          aria-invalid={!!erros.cpf}
          aria-describedby={erros.cpf ? "erro-cpf" : undefined}
          style={{
            padding: 10,
            borderRadius: 8,
            border: `1.5px solid ${erros.cpf ? "red" : "#1976d2"}`,
            fontSize: 15,
          }}
        />
        {erros.cpf && <span id="erro-cpf" role="alert" style={{ color: "red", fontSize: 13 }}>{erros.cpf}</span>}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="nascimento" style={{ fontWeight: 600, color: "#1976d2", marginBottom: 4 }}>
            Data de nascimento <span style={{ color: "#d32f2f" }}>*</span>
          </label>
          <span style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>
            (Você deve ter pelo menos 16 anos)
          </span>
          <input
            id="nascimento"
            type="date"
            placeholder="dd/mm/aaaa"
            value={nascimento}
            onChange={e => setNascimento(e.target.value)}
            required
            aria-invalid={!!erros.nascimento}
            aria-describedby={erros.nascimento ? "erro-nasc" : undefined}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1.5px solid ${erros.nascimento ? "red" : "#1976d2"}`,
              fontSize: 15,
              boxSizing: "border-box",
            }}
          />
          {erros.nascimento && (
            <span id="erro-nasc" style={{ color: "red", fontSize: 13 }}>{erros.nascimento}</span>
          )}
        </div>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          aria-invalid={!!erros.email}
          aria-describedby={erros.email ? "erro-email" : undefined}
          style={{
            padding: 10,
            borderRadius: 8,
            border: `1.5px solid ${erros.email ? "red" : "#1976d2"}`,
            fontSize: 15,
          }}
        />
        {erros.email && <span id="erro-email" style={{ color: "red", fontSize: 13 }}>{erros.email}</span>}

        <IMaskInput
          mask="(00) 00000-0000"
          value={whatsapp}
          onAccept={value => setWhatsapp(value)}
          as="input"
          type="tel"
          placeholder="WhatsApp (ex: (99) 99999-9999)"
          required
          aria-invalid={!!erros.whatsapp}
          aria-describedby={erros.whatsapp ? "erro-wpp" : undefined}
          style={{
            padding: 10,
            borderRadius: 8,
            border: `1.5px solid ${erros.whatsapp ? "red" : "#1976d2"}`,
            fontSize: 15,
          }}
        />
        {erros.whatsapp && <span id="erro-wpp" role="alert" style={{ color: "red", fontSize: 13 }}>{erros.whatsapp}</span>}

        <div>
          <label style={{ fontWeight: 500, color: "#1976d2" }}>
            Anexar currículo:
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => setCurriculo(e.target.files ? e.target.files[0] : null)}
            required
            aria-invalid={!!erros.curriculo}
            aria-describedby={erros.curriculo ? "erro-curriculo" : undefined}
            style={{ marginTop: 8 }}
          />
          {curriculo && (
            <div style={{ fontSize: 13, color: "#1976d2", marginTop: 4 }}>
              {curriculo.name}
            </div>
          )}
          {erros.curriculo && <span id="erro-curriculo" style={{ color: "red", fontSize: 13 }}>{erros.curriculo}</span>}
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
            cursor: enviado ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            letterSpacing: 0.5,
            opacity: enviado ? 0.7 : 1,
          }}
          disabled={enviado || Object.keys(erros).length > 0}
        >
          {enviado ? "Enviando..." : "Enviar"}
        </button>
        {enviado && (
          <div role="alert" style={{ color: "#43c6ac", fontWeight: 700, fontSize: 16, textAlign: "center", marginTop: 4 }}>
            Dados enviados com sucesso!
          </div>
        )}
        {erro && (
          <div role="alert" style={{ color: "red", fontWeight: 700, fontSize: 16, textAlign: "center", marginTop: 4 }}>
            Erro ao enviar dados, tente novamente.
          </div>
        )}
      </form>
    </div>
  );
};

export default FormularioCandidatura;