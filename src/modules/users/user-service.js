import pool from "../../db/pool.js";
import { AppError } from "../../middlewares/error-handler.js";

export const getUserById = async (userId) => {
  const result = await pool.query(
    "SELECT id, username, email, created_at FROM users WHERE id = $1",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return result.rows[0];
};

export const updateUser = async (userId, data) => {
  const { username, email } = data;

  const fields = [];
  const values = [];
  let paramCount = 1;

  if (username) {
    fields.push(`username = $${paramCount}`);
    values.push(username);
    paramCount++;
  }

  if (email) {
    fields.push(`email = $${paramCount}`);
    values.push(email);
    paramCount++;
  }

  if (fields.length === 0) {
    throw new AppError("No hay campos para actualizar", 400);
  }

  values.push(userId);

  const query = `
    UPDATE users 
    SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${paramCount}
    RETURNING id, username, email, created_at, updated_at
  `;
  //---------------revisar
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return result.rows[0];
};

export const deleteUser = async (userId) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return { message: "Usuario eliminado exitosamente" };
};
