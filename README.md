# 🚀 Create Enterprise Backend

Create Enterprise Backend is a modern CLI tool to scaffold production-ready backend applications using Express or Fastify with MongoDB or Supabase, following enterprise best practices.

⚡ Zero setup. Secure defaults. Scalable structure.

## ✨ Features

### 🏗 Frameworks
- Express
- Fastify

### 🗄 Databases
- MongoDB (Mongoose)
- Supabase (Postgres + Auth)

### 🔐 Authentication Ready
- JWT-based auth
- Auth guards & middleware
- Safe handling when DB/env is missing

### 🧱 Enterprise Architecture
- Modular structure
- Controllers / Services / Routes
- Centralized error handling
- Environment-based config

### 🛠 Developer Experience
- Nodemon preconfigured
- Clean logging
- Safe defaults (no crash if DB not configured)

## 📦 Installation & Usage

You don't need to install anything globally.

**Create a new backend project**
```bash
npx create-enterprise-backend my-backend
```

**or inside the current folder:**
```bash
npx create-enterprise-backend .
```

## 🧭 Interactive Setup

The CLI will guide you through:
- Framework selection (Express / Fastify)
- Database selection (MongoDB / Supabase)
- Dependency installation (Install now or later)

## 📁 Project Structure (Example)
```
src/
├── app.js
├── server.js
├── routes.js
├── config/
│   ├── env.js
│   ├── db.js          # Mongo
│   └── supabase.js    # Supabase
├── modules/
│   └── auth/
│       ├── auth.controller.js
│       ├── auth.routes.js
│       ├── auth.service.js
│       ├── auth.schema.js
│       └── user.model.js
├── middlewares/
├── services/
└── utils/
    ├── error-handler.js
    ├── jwt-guard.js
    └── db-guard.js
```

## ▶️ Running the Server
```bash
npm run dev
```

**Output example:**
```
⚠️ Supabase public client disabled (missing env vars)
⚠️ Supabase admin client disabled (missing env vars)
🚀 Server running at http://localhost:5000
```

This is intentional and safe — the app won't crash if env vars are missing.

## 🔑 Environment Variables

### MongoDB
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/myapp
JWT_SECRET=supersecret
```

### Supabase
```
PORT=5000
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=public-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
JWT_SECRET=supersecret
```

## 🛡 Database Safety (Enterprise Behavior)

- If DB is not connected, DB-dependent routes are automatically blocked
- The server never crashes due to missing DB or env variables
- Clear warnings are logged instead

## 🧪 Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

## 📌 Node Version
- Node.js ≥ 18

## 🧠 Philosophy

This tool is built for:
- SaaS backends
- Admin dashboards
- APIs at scale
- Teams that care about structure & safety

It's meant to be extended, not locked.

## 🛣 Roadmap
- PostgreSQL & MySQL templates
- Docker & CI templates
- CLI flags (--yes, --framework, --db)
- Prisma / Drizzle support
- RBAC & multi-tenant auth

## 🤝 Contributing

Contributions are welcome!
- Fork the repo
- Create a feature branch
- Submit a PR

## 📄 License

MIT © Imad Hussain Khan

## ⭐ Support

If this tool helped you:
- ⭐ Star the repo
- 🐛 Report issues
- 💡 Suggest features
