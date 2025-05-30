"use client";
import React from "react";
import styles from "../app/vagas/vagas.module.css";

const vagas = [
  { id: 1, titulo: "Front-end React", empresa: "Tech Maranhão", local: "São Luís, MA", desc: "Desenvolvimento de interfaces modernas com React e Material UI." },
  { id: 2, titulo: "Back-end Node.js", empresa: "Maranhão Devs", local: "Imperatriz, MA", desc: "APIs REST, banco de dados e Docker." },
  { id: 3, titulo: "Designer UI/UX", empresa: "Criativa", local: "Home Office", desc: "Figma, prototipação e design responsivo." },
  { id: 4, titulo: "Analista de Dados", empresa: "DadosMA", local: "Caxias, MA", desc: "SQL, Python e Power BI." },
  { id: 5, titulo: "Suporte Técnico", empresa: "HelpTI", local: "São Luís, MA", desc: "Atendimento ao cliente, redes e manutenção." },
  { id: 6, titulo: "DevOps", empresa: "CloudMA", local: "Home Office", desc: "AWS, CI/CD, automação de infraestrutura." },
  { id: 7, titulo: "Mobile Flutter", empresa: "AppMaranhão", local: "Balsas, MA", desc: "Desenvolvimento de apps Android/iOS." },
  { id: 8, titulo: "QA Tester", empresa: "Qualidade+", local: "São Luís, MA", desc: "Testes automatizados e manuais." },
  { id: 9, titulo: "Product Owner", empresa: "InovaMA", local: "Home Office", desc: "Gestão de backlog, SCRUM, visão de produto." },
  { id: 10, titulo: "Full Stack", empresa: "WebMA", local: "Imperatriz, MA", desc: "React, Node.js, PostgreSQL." },
  { id: 11, titulo: "Estágio TI", empresa: "Universidade MA", local: "São Luís, MA", desc: "Suporte, desenvolvimento e aprendizado contínuo." },
  { id: 12, titulo: "Analista de Redes", empresa: "NetMaranhão", local: "Caxias, MA", desc: "Configuração e manutenção de redes corporativas." },
  { id: 13, titulo: "Engenheiro de Software", empresa: "SoftMA", local: "Home Office", desc: "Projetos de grande escala, arquitetura de sistemas." },
  { id: 14, titulo: "Desenvolvedor PHP", empresa: "SitesMA", local: "Balsas, MA", desc: "Desenvolvimento de sites e sistemas em PHP." },
  { id: 15, titulo: "Analista de Suporte", empresa: "HelpTI", local: "Imperatriz, MA", desc: "Atendimento, troubleshooting e documentação." },
  // Adicione mais vagas se quiser!
];

const VagasList = () => (
  <div className={styles.container}>
    <div className={styles.title}>Vagas em destaque</div>
    <div className={styles.list}>
      {vagas.map((vaga) => (
        <div className={styles.card} key={vaga.id}>
          <div className={styles.cardTitle}>{vaga.titulo}</div>
          <div className={styles.cardCompany}>{vaga.empresa}</div>
          <div className={styles.cardLocation}>{vaga.local}</div>
          <div className={styles.cardDesc}>{vaga.desc}</div>
          <a
            className={styles.applyBtn}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Candidatar-se
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default VagasList;