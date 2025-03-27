import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// POST: Rota de login (usada pelo frontend)
router.post("/login", login);

// GET: Apenas retorna uma mensagem indicando que a rota funciona
router.get("/login", (req, res) => {
    res.json({ message: "API de autenticação funcionando! Use POST para login." });
});

router.post("/register", register);

export default router;
