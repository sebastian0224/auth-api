import { getUserById, updateUser, deleteUser } from "./user-service.js";

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
    const userId = req.user.id;
    const { username, email } = req.body;

    // Aquí irá la validación con Zod después
    if (!username && !email) {
      return res.status(400).json({
        error: "Debes proporcionar al menos un campo para actualizar",
      });
    }

    const updatedUser = await updateUser(userId, { username, email });

    res.json({
      message: "Perfil actualizado exitosamente",
      data: updatedUser,
    });
  } catch (error) {
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
