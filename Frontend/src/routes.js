import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";        // Tela Home
import Movie from "./pages/Movie";      // Tela de Movie
import Header from "./components/Header";  // Cabeçalho
import Erro from "./pages/Erro";        // Página de Erro
import Favorites from "./pages/Favorites";  // Página de Favoritos
import Login from "./pages/Login";      // Tela de Login
import Register from "./pages/Register";  // Tela de Registro

function RoutesApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);

        // Escutando mudanças no localStorage
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);
        };

        // Adicionando evento de escuta
        window.addEventListener('storage', handleStorageChange);

        // Limpando o evento ao desmontar o componente
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);  // Executa uma vez ao montar o componente

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<Movie />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path='/register' element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
