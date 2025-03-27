import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acesso negado. Token ausente ou inválido." });
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Token decodificado:", decoded); // ADICIONE ISSO!
    req.user = decoded; // Certifique-se de que `id` existe no token
    next();
  } catch (error) {
    return res.status(400).json({ error: "Token inválido." });
  }
};

export default authMiddleware;
