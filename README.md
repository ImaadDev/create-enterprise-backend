# 🚀 Create Enterprise Backend

> **⚠️ BETA VERSION**: This package is currently in beta (v0.1.2) with limited features. Full enterprise features are only available for Fastify + Supabase templates. Express support is basic, and some advanced features are still in development.

A powerful enterprise-grade backend scaffolding CLI that generates production-ready backends with authentication, JWT, and database integration — in seconds.

## ✨ Features

- ⚡ **Frameworks**: Fastify and Express support
- 🗄️ **Databases**: MongoDB and Supabase integration
- 🔐 **Authentication**: JWT-based auth (basic for Express/MongoDB, advanced for Fastify/Supabase)
- ♻️ **Refresh Tokens**: Available for Fastify + Supabase (with rotation)
- 🚪 **Logout**: Single device and all devices (Fastify + Supabase only)
- 🛡️ **Role-Based Access Control (RBAC)**: Available for Fastify + Supabase
- 🧩 **Modular Architecture**: Feature-based structure for scalability
- 📦 **Auto-generated Routes**: Automatic route registration
- 🔧 **Enterprise-ready Structure**: Organized folder layout
- 💡 **Extensible**: Designed for future enhancements

## 📦 Installation & Usage

Install globally or run directly with NPX:

```bash
npx create-enterprise-backend my-backend
```

Or generate inside the current directory:

```bash
npx create-enterprise-backend .
```

## 🧭 CLI Flow

You'll be prompted to select:

- **Backend Framework**
  - Fastify (recommended for full features)
  - Express (basic features)

- **Database**
  - MongoDB (basic auth)
  - Supabase (advanced auth features)

- **Features** (available based on selections)
  - Basic Authentication (JWT)
  - Advanced Auth (Refresh Tokens, RBAC) - Fastify + Supabase only

## 🗂️ Generated Project Structure

The structure varies by template. For Fastify + Supabase (full features):

```
src/
├── config/
│   ├── env.js
│   └── supabase.js
├── plugins/
│   ├── auth.js
│   ├── refresh.store.js
│   └── request-context.js
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.routes.js
│   │   ├── refresh.controller.js
│   │   ├── refresh.routes.js
│   │   └── refresh.service.js
│   ├── products/  # Example module
│   └── users/     # Example module
├── generated/
│   └── register.js
├── utils/
│   └── error-handler.js
├── routes.js
├── app.js
└── server.js
```

For Express + MongoDB (basic features):

```
src/
├── config/
│   ├── db.js
│   └── env.js
├── middlewares/
│   ├── db-guard.js
│   └── jwt.guard.js
├── modules/
│   └── auth/
│       ├── auth.controller.js
│       ├── auth.service.js
│       ├── auth.routes.js
│       └── user.model.js
├── utils/
│   └── error-handler.js
├── routes.js
├── app.js
└── server.js
```

## 🔐 Authentication Flow

### Basic Auth (Express/MongoDB & Fastify/MongoDB)

- Simple JWT-based login and protected routes
- User registration and login endpoints

### Advanced Auth (Fastify + Supabase Only)

#### Login

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

#### Protected Route

```
GET /api/auth/me
Authorization: Bearer ACCESS_TOKEN
```

#### Refresh Token

```
POST /api/auth/refresh
{
  "refreshToken": "..."
}
```

Returns new access + refresh tokens (rotation enabled).

#### Logout (current device)

```
POST /api/auth/logout
{
  "refreshToken": "..."
}
```

#### Logout from all devices

```
POST /api/auth/logout-all
Authorization: Bearer ACCESS_TOKEN
```

Revokes all active sessions for the user.

## 🛡️ Security Design

- Access tokens are short-lived
- Refresh tokens are rotated (Fastify + Supabase)
- Logout-all revokes all sessions (Fastify + Supabase)
- RBAC enforced at backend level (Fastify + Supabase)
- Supabase used only as Identity Provider (when applicable)
- Backend controls authorization

## ⚙️ Environment Variables

Create a `.env` file based on your template:

### For MongoDB Templates

```env
PORT=5000
JWT_SECRET=your_super_strong_secret
MONGODB_URI=mongodb://localhost:27017/yourdb
```

### For Supabase Templates

```env
PORT=5000
JWT_SECRET=your_super_strong_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🚧 Development

After generating your project:

```bash
cd my-backend
npm install
npm run dev
```

## 🧠 Architecture Notes

- Supabase Auth verifies identity (when used)
- Backend issues its own JWT for control over authorization
- Decoupled design allows scaling to microservices
- Feature-based architecture for maintainability

## 🔮 Roadmap

- ✅ Fastify + Supabase (advanced features)
- ✅ Express + MongoDB (basic auth)
- ✅ Fastify + MongoDB (basic auth)
- ⏳ Express + Supabase support
- ⏳ Refresh token persistence (database storage)
- ⏳ Session & device tracking
- ⏳ Rate limiting & brute-force protection
- ⏳ Admin session management
- ⏳ OAuth providers integration
- ⏳ Additional database support

## 🤝 Contributing

This project is in beta, and contributions are welcome! Please:

- Report bugs via [GitHub Issues](https://github.com/ImaadDev/create-enterprise-backend/issues)
- Suggest features or improvements
- Submit pull requests for enhancements

## 👨‍💻 Author

Imad Hussain Khan  
Full-Stack Web Developer  
Enterprise Backend & SaaS Architect

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## ⭐ Support

If you find this useful:

- ⭐ Star the repo
- 📦 Use it in your projects
- 💬 Share feedback & ideas

## ☕ Support the Project

If you find this tool helpful, consider supporting its development:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/imadhussainkhan)

## 🏁 Final Note

This tool is designed for real-world backends. While in beta, it provides a solid foundation for building scalable applications.

🚀 Happy building!
