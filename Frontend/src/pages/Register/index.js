import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError("Erro no cadastro, tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
          <button type="submit" className={styles.redButton}>Cadastrar</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={() => navigate("/login")} className={styles.redButton}>
          Já tem uma conta? Faça login
        </button>
      </div>
    </div>
  );
}

export default Register;
