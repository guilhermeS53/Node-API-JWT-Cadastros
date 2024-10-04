import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  console.log(req);
  const token = req.headers.authorization;

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    req.userId = decoded.id;

    console.log(decoded);
  } catch (e) {
    return res.status(401).json({ message: "Token inválido" });
  }
  next();
};

export default auth;
