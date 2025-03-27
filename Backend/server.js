import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const prisma = new PrismaClient(); // Criar instância do Prisma

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Testando a conexão com o banco via Prisma
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("📦 Conectado ao banco de dados com Prisma");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    process.exit(1); // Encerra a aplicação em caso de erro
  }
}

connectDB(); // Chamando a função para conectar ao banco

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
