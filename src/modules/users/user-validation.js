import { z } from "zod";

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, "El username debe tener al menos 3 caracteres")
      .max(50, "El username no puede exceder 50 caracteres")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "El username solo puede contener letras, números, guiones y guiones bajos"
      )
      .optional(),

    email: z
      .string()
      .email("Debe ser un email válido")
      .max(100, "El email no puede exceder 100 caracteres")
      .toLowerCase()
      .optional(),
  })
  .refine((data) => data.username || data.email, {
    message: "Debes proporcionar al menos username o email para actualizar",
  });
