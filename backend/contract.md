# 📜 Contrato de la API de "WebRush Brasil"

## 📝 Descripción
Esta API provee los endpoints necesarios para gestionar las funcionalidades del sitio web "WebRush Brasil", un servicio freelance de desarrollo web en Brasil. La API se conecta a una base de datos PostgreSQL alojada en Neon y está diseñada para ser consumida por un frontend en React.

- **🌐 Base URL:** `http://localhost:3000/api` (en desarrollo) o el dominio de producción más adelante.
- **⚙️ Backend:** Node.js con Express
- **🗄️ Base de datos:** PostgreSQL (con `pg` como cliente)
- **📦 Formato de respuesta:** JSON

---

## 📩 1. Endpoints de Contactos

### 🔹 `POST /api/contacts`
**📌 Descripción:** Crea un nuevo mensaje de contacto.

#### 📥 Cuerpo de la solicitud:
```json
{
  "name": "string", // Nombre del remitente (máx. 100 caracteres), requerido
  "email": "string", // Email válido, requerido
  "message": "string" // Mensaje (máx. 1000 caracteres), requerido
}
```

#### ✅ Respuesta Exitosa (201 Created):
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "message": "string",
  "created_at": "timestamp",
  "responded": false
}
```

#### ⚠️ Posibles Errores:
- `400 Bad Request`: Datos inválidos o faltantes
- `500 Internal Server Error`: Error en la base de datos

---

### 🔹 `GET /api/contacts`
**📌 Descripción:** Obtiene una lista de todos los contactos.

#### 🔍 Parámetros de consulta (opcional):
- `limit`: Número máximo de resultados (default: 10)
- `offset`: Desplazamiento para paginación (default: 0)

#### ✅ Respuesta Exitosa (200 OK):
```json
[
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "message": "string",
    "created_at": "timestamp",
    "responded": boolean
  }
]
```

#### ⚠️ Posibles Errores:
- `500 Internal Server Error`: Error al obtener contactos

---

## 📰 2. Endpoints del Blog

### 🔹 `GET /api/blog`
**📌 Descripción:** Obtiene una lista de posts publicados.

#### 🔍 Parámetros de consulta (opcional):
- `limit`: Número máximo de resultados (default: 10)
- `offset`: Desplazamiento para paginación (default: 0)

#### ✅ Respuesta Exitosa (200 OK):
```json
[
  {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "content": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

#### ⚠️ Posibles Errores:
- `500 Internal Server Error`: Error al obtener posts

---

### 🔹 `GET /api/blog/:slug`
**📌 Descripción:** Obtiene un post específico por su slug.

#### 🔎 Parámetros de ruta:
- `slug`: Slug único del post (ej. `"por-que-seu-negocio-precisa-de-um-site"`)

#### ✅ Respuesta Exitosa (200 OK):
```json
{
  "id": "uuid",
  "title": "string",
  "slug": "string",
  "content": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

#### ⚠️ Posibles Errores:
- `404 Not Found`: Post no encontrado
- `500 Internal Server Error`: Error al obtener el post

---

## 🎨 3. Endpoints del Portafolio

### 🔹 `GET /api/portfolio`
**📌 Descripción:** Obtiene una lista de proyectos.

#### 🔍 Parámetros de consulta (opcional):
- `limit`: Número máximo de resultados (default: 10)
- `offset`: Desplazamiento para paginación (default: 0)

#### ✅ Respuesta Exitosa (200 OK):
```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "image_url": "string",
    "project_url": "string",
    "created_at": "timestamp"
  }
]
```

#### ⚠️ Posibles Errores:
- `500 Internal Server Error`: Error al obtener proyectos

---

## 🛠️ 4. Endpoints de Servicios

### 🔹 `GET /api/services`
**📌 Descripción:** Obtiene una lista de servicios.

#### ✅ Respuesta Exitosa (200 OK):
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "price": "number", // En reales (R$)
    "created_at": "timestamp"
  }
]
```

#### ⚠️ Posibles Errores:
- `500 Internal Server Error`: Error al obtener servicios

---

## 📌 Consideraciones Generales

- **🔑 Autenticación:** Actualmente los endpoints son públicos. En el futuro, se podría agregar autenticación (JWT o similar) para administrar contactos y posts del blog.
- **✅ Validación:** Se recomienda validar el email y asegurar que los slugs sean únicos en blog posts.
- **📄 Paginación:** Los endpoints GET incluyen `limit` y `offset` para manejar listas grandes de datos.
- **🔄 Códigos de Estado HTTP:**
  - `200 OK`: Éxito en GET
  - `201 Created`: Éxito en POST
  - `400 Bad Request`: Datos inválidos
  - `404 Not Found`: Recurso no encontrado
  - `500 Internal Server Error`: Error del servidor
