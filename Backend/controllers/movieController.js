import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const TMDB_API_KEY = "dfa4fc8f554de20cd7318a5f3ae7a20c"; // 🔑 API Key fixa

// 📌 Função para salvar um filme
export const saveMovie = async (req, res) => {
  try {
    console.log("📥 Dados recebidos:", req.body);
    console.log("🆔 Usuário autenticado:", req.user);

    const { movieId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!movieId) {
      return res.status(400).json({ error: "ID do filme é obrigatório." });
    }

    // 🔍 Buscar detalhes do filme na TMDB API
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-BR`;
    const response = await axios.get(tmdbUrl);
    console.log("🔍 Resposta da API TMDB:", response.data);
    const movieData = response.data;

    if (!movieData || !movieData.title) {
      return res.status(400).json({ error: "Filme não encontrado na TMDB." });
    }

    // ✅ Criar entrada no banco de dados
    const movie = await prisma.movie.create({
      data: {
        movieId,
        userId,
        title: movieData.title,
      },
    });

    console.log("✅ Filme salvo com sucesso!", movie);
    res.status(201).json(movie);
  } catch (error) {
    console.error("🚨 Erro ao salvar filme:", error);
    res.status(500).json({ error: "Erro ao salvar o filme.", details: error.message });
  }
};

// 📌 Função para buscar os filmes salvos de um usuário
export const getMovies = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const movies = await prisma.movie.findMany({
      where: { userId },
      select: { movieId: true, title: true }, // Retorna o ID e título do filme
    });

    res.json(movies);
  } catch (error) {
    console.error("🚨 Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes.", details: error.message });
  }
};

// 📌 Função para deletar um filme
export const deleteMovie = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { movieId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!movieId) {
      return res.status(400).json({ error: "ID do filme é obrigatório." });
    }

    // 🔎 Verifica se o filme pertence ao usuário
    const movie = await prisma.movie.findFirst({
      where: { userId, movieId: parseInt(movieId) },
    });

    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado ou não pertence ao usuário." });
    }

    // 🚀 Deleta o filme
    await prisma.movie.delete({
      where: { id: movie.id },
    });

    console.log(`🗑️ Filme ${movieId} deletado com sucesso!`);
    res.status(200).json({ message: "Filme removido com sucesso!" });
  } catch (error) {
    console.error("🚨 Erro ao deletar filme:", error);
    res.status(500).json({ error: "Erro ao deletar filme.", details: error.message });
  }
};


