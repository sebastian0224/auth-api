import { registerUser, loginUser } from "./auth-service.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Aquí irá la validación con Zod después
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    const result = await registerUser(username, email, password);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Aquí irá la validación con Zod después
    if (!email || !password) {
      return res.status(400).json({
        error: "Email y contraseña son requeridos",
      });
    }

    const result = await loginUser(email, password);

    res.status(200).json({
      message: "Login exitoso",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
