import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/candidatos", async (req, res) => {
  const { nome, cpf, nascimento, email, whatsapp, curriculoUrl, vaga } = req.body;
  try {
    const candidato = await prisma.candidato.create({
      data: { nome, cpf, nascimento: new Date(nascimento), email, whatsapp, curriculoUrl, vaga }
    });
    res.json(candidato);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erro ao cadastrar candidato." });
  }
});

app.listen(4000, () => console.log("Backend rodando na porta 4000"));