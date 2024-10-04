import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// user: guilherme
// password: Dz7Xg5bYyA5dLwOx

// mongodb+srv://guilherme:<db_password>@users.nsfk3.mongodb.net/?retryWrites=true&w=majority&appName=users
