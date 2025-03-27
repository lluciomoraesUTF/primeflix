import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../../services/api"; 
import styles from "./login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apis.backendApi.post("/auth/login", { email, password });

      if (response.data.token && response.data.userId) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        console.log("✅ Login bem-sucedido!", response.data);

        navigate("/");
      } else {
        setError("Erro ao autenticar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error);
      setError(error.response?.data?.message || "Credenciais inválidas ou erro no servidor.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.loginButton}>Entrar</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={() => navigate("/register")} className={styles.registerButton}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
}

export default Login;
