# 🧪 Prueba Técnica Backend – NestJS + Prisma

![NestJS](https://img.shields.io/badge/-NestJS-e0234e?style=flat\&logo=nestjs\&logoColor=white) ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat\&logo=prisma\&logoColor=white) ![MySQL](https://img.shields.io/badge/-MySQL-00758f?style=flat\&logo=mysql\&logoColor=white)

API mínima para gestionar **usuarios** y sus **mensajes** usando NestJS, Prisma ORM y MySQL.

---

## 📂 Estructura del proyecto

```
chat-api/
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  ├─ prisma/
│  │  └─ prisma.service.ts
│  ├─ users/
│  │  ├─ users.controller.ts
│  │  ├─ users.module.ts
│  │  ├─ users.service.ts
│  │  └─ dto/create-user.dto.ts
│  └─ messages/
│     ├─ messages.controller.ts
│     ├─ messages.module.ts
│     ├─ messages.service.ts
│     └─ dto/create-message.dto.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ .env.example
├─ package.json
└─ README.md  ← (este archivo)
```

---

## 🛠️ Stack

| Capa         | Tecnología             |
| ------------ | ---------------------- |
| Runtime      | Node 20 + TypeScript   |
| Framework    | **NestJS** 10          |
| ORM          | **Prisma Client** 5    |
| DB           | **MySQL** 8            |
| Validaciones | class‑validator + DTOs |

---

## 🚀 Inicio rápido (local)

```bash
# 1. Clonar repositorio
git clone https://github.com/xhadowx1996/cautious-computing-machine.git
cd cautious-computing-machine

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env
# Editar .env según tus credenciales MySQL

# 4. Crear DB y aplicar migraciones
npx prisma migrate dev --name init

# 5. Generar el cliente Prisma (por si acaso)
npx prisma generate

# 6. Levantar Nest en modo watch
npm run start:dev
```

> **Nota:** Si usas el contenedor MySQL propuesto más abajo, no necesitas instalar MySQL nativo.

---

## 🧩 Variables de entorno

`.env.example` incluído:

```ini
# Cadena de conexión MySQL
DATABASE_URL="mysql://johndoe:randompassword@127.0.0.1:3306/mydb"
```

Copia → `.env` y ajusta usuario, password o puerto si cambias el contenedor.

---

## 🐳 MySQL en Docker (opcional)

```bash
docker run -d \
  --name mysql-local \
  -p 127.0.0.1:3306:3306 \
  -e MYSQL_ROOT_PASSWORD=danieldev123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=johndoe \
  -e MYSQL_PASSWORD=randompassword \
  -v ./mysql-data:/var/lib/mysql \
  mysql:8.4
```

---

## 📚 Modelo de datos (Prisma)

```prisma
model User {
  id       Int       @id @default(autoincrement())
  name     String
  email    String    @unique
  messages Message[]
}

model Message {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    Int
}
```

---

## 🌐 Endpoints

| Método | Ruta                  | Descripción                  | DTO / Validaciones                                              |
| ------ | --------------------- | ---------------------------- | --------------------------------------------------------------- |
| POST   | `/users`              | Crea usuario                 | `CreateUserDto` → `name` requerido, `email` con formato válido. |
| POST   | `/messages`           | Crea mensaje para un usuario | `CreateMessageDto` → `content` no vacío, `userId` entero.       |
| GET    | `/users/:id/messages` | Lista mensajes del usuario   | —                                                               |

### Ejemplos cURL

```bash
# Crear usuario
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@example.com"}'

# Crear mensaje
curl -X POST http://localhost:3000/messages \
     -H "Content-Type: application/json" \
     -d '{"content":"¡Hola mundo!","userId":1}'

# Listar mensajes
curl http://localhost:3000/users/1/messages
```

---

## 🧪 Validaciones

* `@IsNotEmpty()` → `name`, `content`
* `@IsEmail()` → `email`
* `@IsInt()` → `userId`

Config global: `app.useGlobalPipes(new ValidationPipe({ whitelist:true, forbidNonWhitelisted:true }))`

---

## 🗄️ Scripts NPM

| Script                    | Acción                                            |
| ------------------------- | ------------------------------------------------- |
| `npm run start`           | Nest en modo producción                           |
| `npm run start:dev`       | Nest en watch + reload                            |
| `npm run build`           | Compila a `dist/`                                 |
| `npm run prisma:generate` | Regenera cliente Prisma                           |
| `postinstall`             | Ejecuta `prisma generate` tras cada `npm install` |

---

## 🔒 Buenas prácticas

* Carpeta `prisma/` versionada; migraciones reproducibles.
* `.env` ignorado en Git; se entrega `.env.example`.
* `PrismaService` para **singleton** de conexión.
* DTOs y **class-validator** para sanitizar entrada.
* Controladores delgados, lógica en Services.
* `gitignore`: `node_modules/`, `.env`, `mysql-data/`.

---

## 📄 Licencia

[MIT](LICENSE) – libre para uso educativo y pruebas técnicas.

---

> **Autor:** Daniel Felipe Moya Pinto · 2025
