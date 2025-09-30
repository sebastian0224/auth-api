import { registerUser, loginUser } from "./auth-service.js";
import { registerSchema, loginSchema } from "./auth-validation.js";

export const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(
      validatedData.username,
      validatedData.email,
      validatedData.password
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: result,
    });
  } catch (error) {
    // Si es error de Zod
    if (error.name === "ZodError") {
      const errors = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        error: "Errores de validación",
        details: errors,
      });
    }

    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Validar con Zod
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData.email, validatedData.password);

    res.status(200).json({
      message: "Login exitoso",
      data: result,
    });
  } catch (error) {
    // Si es error de Zod
    if (error.name === "ZodError") {
      const errors = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        error: "Errores de validación",
        details: errors,
      });
    }

    next(error);
  }
};
