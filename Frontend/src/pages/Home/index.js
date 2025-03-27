import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apis from "../../services/api";  
import styles from "./home.module.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅ Agora o loading será usado

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await apis.tmdbApi.get("movie/now_playing", {
          params: {
            api_key: "dfa4fc8f554de20cd7318a5f3ae7a20c",
            language: "pt-BR",
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);  // ✅ Agora garantimos que o loading seja atualizado
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Filmes em Cartaz</h1>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <article key={movie.id}>
            <strong>{movie.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
            <Link to={`/movie/${movie.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
