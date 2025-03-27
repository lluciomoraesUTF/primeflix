import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import apis from "../../services/api"; 

import style from "./favorites.module.css";

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await apis.backendApi.get("/movies");
        const movieIds = response.data.map((m) => m.movieId);

        const movieDetails = await Promise.all(
          movieIds.map(async (id) => {
            const movieResponse = await apis.tmdbApi.get(`/movie/${id}`, {
              params: { api_key: "dfa4fc8f554de20cd7318a5f3ae7a20c", language: "pt-BR" },
            });
            return movieResponse.data;
          })
        );

        setMovies(movieDetails);
      } catch (error) {
        console.error("Erro ao buscar filmes", error);
      }
    };

    fetchMovies();
  }, []);

  const handleRemoveMovie = async (id) => {
    try {
      await apis.backendApi.delete(`/movies/${id}`);
      setMovies(movies.filter((movie) => movie.id !== id));
      alert("Filme removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover filme", error);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginPopup(false);
    navigate("/login"); 
  };

  return (
    <div className={style.myMovies}>
      <h1>Filmes Favoritos</h1>

      {showLoginPopup && (
        <div className={style.popupOverlay}>
          <div className={style.popup}>
            <p>⚠ Você precisa estar logado para acessar esta página.</p>
            <button onClick={handleLoginRedirect} className={style.loginButton}>
              Ir para Login
            </button>
          </div>
        </div>
      )}

      {movies.length === 0 && <span>Empty</span>}
      <ul>
        {movies.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <img src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt={item.title} />
            <div>
              <Link to={`/movie/${item.id}`}>Details</Link>
              <button onClick={() => handleRemoveMovie(item.id)}>Retirar Filme</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
