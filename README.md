# 🚀 Create Enterprise Backend

A powerful enterprise-grade backend scaffolding CLI that generates a production-ready Fastify or Express backend with Supabase authentication, JWT, Refresh Tokens, RBAC, and secure session management — in seconds.

## ✨ Features

- ⚡ Fastify / Express support
- 🔐 Supabase Auth integration
- 🔑 JWT-based backend authentication
- ♻️ Refresh Tokens with rotation
- 🚪 Logout & Logout-All (multi-device)
- 🛡️ Role-Based Access Control (RBAC)
- 🧩 Feature-based architecture
- 📦 Auto-generated route registration
- 🔧 Enterprise-ready folder structure
- 💡 Extensible for future features

## 📦 Installation & Usage

Run directly with NPX

```bash
npx create-enterprise-backend my-backend
```

Or generate inside the current directory:

```bash
npx create-enterprise-backend .
```

## 🧭 CLI Flow

You'll be prompted to select:

- **Backend framework**
  - Fastify
  - Express

- **Database**
  - MongoDB
  - Supabase

- **Enterprise features**
  - Authentication (JWT + Supabase)
  - Refresh Tokens + Logout
  - Role-Based Access Control (RBAC)

## 🗂️ Generated Project Structure

```
src/
├── config/
│   └── supabase.js
├── plugins/
│   ├── auth.js
│   ├── refresh.store.js
│   └── request-context.js
├── modules/
│   └── auth/
│       ├── auth.controller.js
│       ├── auth.service.js
│       ├── auth.routes.js
│       ├── refresh.controller.js
│       ├── refresh.routes.js
│       └── refresh.service.js
├── generated/
│   └── register.js
├── routes.js
├── app.js
└── server.js
```

⚠️ The features folder exists only in templates and is never copied into the generated project.

## 🔐 Authentication Flow

### Login

```
POST /api/auth/login
```

Returns:

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "email": "...",
    "role": "user"
  }
}
```

### Protected Route

```
GET /api/auth/me
Authorization: Bearer ACCESS_TOKEN
```

### Refresh Token

```
POST /api/auth/refresh
{
  "refreshToken": "..."
}
```

Returns new access + refresh tokens (rotation enabled).

### Logout (current device)

```
POST /api/auth/logout
{
  "refreshToken": "..."
}
```

### Logout from all devices

```
POST /api/auth/logout-all
Authorization: Bearer ACCESS_TOKEN
```

Revokes all active sessions for the user.

## 🛡️ Security Design

- Access tokens are short-lived
- Refresh tokens are rotated
- Logout-all revokes all sessions
- RBAC enforced at backend level
- Supabase used only as Identity Provider
- Backend controls authorization

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_super_strong_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🚧 Development

```bash
npm install
npm run dev
```

## 🧠 Why Not Use Supabase JWT Directly?

Supabase Auth verifies identity.
This backend issues its own JWT to:

- enforce RBAC
- support logout-all
- control refresh rotation
- decouple backend from Supabase
- scale to microservices

This is industry-standard architecture.

## 🔮 Roadmap

- ✅ Express + Supabase support
- ⏳ MongoDB auth & RBAC
- ⏳ Refresh token persistence (Supabase DB)
- ⏳ Session & device tracking
- ⏳ Rate limiting & brute-force protection
- ⏳ Admin session management
- ⏳ OAuth providers

## 👨‍💻 Author

Imad Hussain Khan  
Full-Stack Web Developer  
Enterprise Backend & SaaS Architect

## ⭐ Support

If you find this useful:

- ⭐ Star the repo
- 📦 Use it in your projects
- 💬 Share feedback & ideas

## 🏁 Final Note

This tool is designed for real-world, enterprise backends, not demos.

If you understand this codebase — you understand modern backend architecture.

🚀 Happy building!
