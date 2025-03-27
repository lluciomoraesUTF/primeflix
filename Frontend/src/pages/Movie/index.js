import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apis from "../../services/api";
import style from "./movie.module.css";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadingMovie() {
      try {
        const response = await apis.tmdbApi.get(`/movie/${id}`, {
          params: {
            api_key: "dfa4fc8f554de20cd7318a5f3ae7a20c",
            language: "pt-BR",
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Filme não encontrado:", error);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    loadingMovie();
  }, [navigate, id]);

  const saveMovie = async (movieId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      console.log("📤 Enviando requisição para salvar filme...");
      console.log("🔹 Token armazenado:", token);
      console.log("🔹 userId armazenado:", userId);
      console.log("🔹 movieId enviado:", movieId);

      await apis.backendApi.post("/movies/save", { movieId, userId });

      console.log("✅ Filme salvo com sucesso!");
      setShowSuccessPopup(true); 

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error("❌ Erro ao salvar filme:", error.response?.data || error);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginPopup(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className={style.movieInfo}>
        <h2>Carregando filme...</h2>
      </div>
    );
  }

  return (
    <div className={style.movieContainer}>
      <h1 className={style.title}>{movie.title}</h1>
      <img
        className={style.image}
        src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : ""}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className={style.areaButtons}>
        <button onClick={() => saveMovie(movie.id)}>Salvar Filme</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title}`}>
            Trailer
          </a>
        </button>
      </div>

      {showLoginPopup && (
        <div className={style.popupOverlay}>
          <div className={style.popup}>
            <p>⚠ Você precisa estar logado para salvar o filme.</p>
            <button onClick={handleLoginRedirect} className={style.loginButton}>
              Ir para Login
            </button>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className={style.successPopup}>
          <p>✅ Filme adicionado com sucesso!</p>
        </div>
      )}
    </div>
  );
}

export default Movie;
