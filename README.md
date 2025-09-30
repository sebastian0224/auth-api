# Auth API - Authentication System

RESTful API for user authentication and management built with Node.js, Express, PostgreSQL, and JWT.

## 🚀 Features

- User registration and authentication
- JWT-based authentication
- Password encryption with bcrypt
- Data validation with Zod
- PostgreSQL database
- Dockerized for development and production
- Centralized error handling
- Modular and scalable architecture

## 🛠️ Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **Bcrypt** - Password encryption
- **Zod** - Schema validation
- **Docker** - Containerization
- **Docker Compose** - Container orchestration

## 📋 Prerequisites

- Docker
- Docker Compose

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/auth-api.git
cd auth-api
```

### 2. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DB_HOST=db
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
```

### 3. Run with Docker Compose

**Development mode:**

```bash
docker-compose -f docker-compose-dev.yml up --build
```

**Production mode:**

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### 1. Register User

Creates a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Success Response (201):**

```json
{
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2025-09-30T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Error (400):**

```json
{
  "error": "Errores de validación",
  "details": [
    {
      "field": "password",
      "message": "La contraseña debe contener al menos una mayúscula"
    }
  ]
}
```

---

### 2. Login

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Success Response (200):**

```json
{
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2025-09-30T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**

```json
{
  "error": "Credenciales inválidas"
}
```

---

### 3. Get Profile

Retrieves the authenticated user's profile.

**Endpoint:** `GET /api/users/profile`

**Headers:**

```
Authorization: Bearer {your_jwt_token}
```

**Success Response (200):**

```json
{
  "message": "Perfil obtenido exitosamente",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "created_at": "2025-09-30T12:00:00.000Z"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Token inválido o expirado"
}
```

---

### 4. Update Profile

Updates the authenticated user's profile information.

**Endpoint:** `PUT /api/users/profile`

**Headers:**

```
Authorization: Bearer {your_jwt_token}
```

**Request Body:**

```json
{
  "username": "new_username",
  "email": "newemail@example.com"
}
```

**Success Response (200):**

```json
{
  "message": "Perfil actualizado exitosamente",
  "data": {
    "id": 1,
    "username": "new_username",
    "email": "newemail@example.com",
    "created_at": "2025-09-30T12:00:00.000Z",
    "updated_at": "2025-09-30T14:30:00.000Z"
  }
}
```

**Validation Error (400):**

```json
{
  "error": "Errores de validación",
  "details": [
    {
      "field": "email",
      "message": "Debe ser un email válido"
    }
  ]
}
```

---

### 5. Delete Profile

Deletes the authenticated user's account.

**Endpoint:** `DELETE /api/users/profile`

**Headers:**

```
Authorization: Bearer {your_jwt_token}
```

**Success Response (200):**

```json
{
  "message": "Cuenta eliminada exitosamente"
}
```

**Error Response (401):**

```json
{
  "error": "Token inválido o expirado"
}
```

````

## 🔒 Validation Rules

**Passwords must have:**
- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Usernames must:**
- Be between 3 and 50 characters
- Only contain letters, numbers, hyphens, and underscores

**Emails must:**
- Be a valid email format
- Maximum 100 characters

## 🐳 Useful Docker Commands

```bash
# View logs in real-time
docker-compose -f docker-compose-dev.yml logs -f api

# Stop containers
docker-compose -f docker-compose-dev.yml down

# Remove volumes (complete cleanup)
docker-compose -f docker-compose-dev.yml down -v

# Rebuild without cache
docker-compose -f docker-compose-dev.yml build --no-cache
````

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)

---

⭐ If you found this project useful, please consider giving it a star on GitHub!
