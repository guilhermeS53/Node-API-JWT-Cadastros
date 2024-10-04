import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const Prisma = new PrismaClient();

router.get("/listar-usuarios", async (req, res) => {
  try {
    const users = await Prisma.user.findMany();

    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", user: users });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

export default router;