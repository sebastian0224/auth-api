import pool from "../../db/pool.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";
import { AppError } from "../../middlewares/error-handler.js";

export const registerUser = async (username, email, password) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const userExists = await client.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (userExists.rows.length > 0) {
      throw new AppError("El usuario o email ya existe", 400);
    }

    const hashedPassword = await hashPassword(password);

    const result = await client.query(
      `INSERT INTO users (username, email, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );

    await client.query("COMMIT");

    const user = result.rows[0];
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at,
      },
      token,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const loginUser = async (email, password) => {
  const result = await pool.query(
    "SELECT id, username, email, password_hash, created_at FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const user = result.rows[0];
  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
    },
    token,
  };
};
