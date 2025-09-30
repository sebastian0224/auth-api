import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "El username es requerido",
    })
    .min(3, "El username debe tener al menos 3 caracteres")
    .max(50, "El username no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "El username solo puede contener letras, números, guiones y guiones bajos"
    ),

  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("Debe ser un email válido")
    .max(100, "El email no puede exceder 100 caracteres")
    .toLowerCase(),

  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("Debe ser un email válido")
    .toLowerCase(),

  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(1, "La contraseña no puede estar vacía"),
});
