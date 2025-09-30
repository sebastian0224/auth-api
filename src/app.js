import express from "express";
import routes from "./routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Rutas
app.use("/", routes);

app.use(errorHandler);

export default app;
