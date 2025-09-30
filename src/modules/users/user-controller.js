import { getUserById, updateUser, deleteUser } from "./user-service.js";
import { updateProfileSchema } from "./user-validation.js";

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);

    res.json({
      message: "Perfil obtenido exitosamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body);

    const userId = req.user.id;
    const updatedUser = await updateUser(userId, validatedData);

    res.json({
      message: "Perfil actualizado exitosamente",
      data: updatedUser,
    });
  } catch (error) {
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

export const deleteProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await deleteUser(userId);

    res.json({
      message: "Cuenta eliminada exitosamente",
    });
  } catch (error) {
    next(error);
  }
};
