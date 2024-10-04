import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    if (!user.name || !user.email || !user.password) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDb = await Prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });
    res.status(201).json(userDb);
  } catch (e) {
    console.error("Erro ao criar o usuário:", e);
    res.status(500).json({ message: "Erro no Servidor ao criar o usuário" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Busca usuário no DB
    const userInfo = req.body;
    const user = await Prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    // Verifica se o usuário existe no banco
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Compara a senha que usuário digitou com a do banco
    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1m" });

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: "Erro ao fazer login:" });
  }
});

export default router;
