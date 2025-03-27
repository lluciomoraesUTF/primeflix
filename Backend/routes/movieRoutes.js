import express from "express";
import { saveMovie, getMovies, deleteMovie } from "../controllers/movieController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveMovie);
router.get("/", authMiddleware, getMovies);
router.delete("/:movieId", authMiddleware, deleteMovie);
export default router;
