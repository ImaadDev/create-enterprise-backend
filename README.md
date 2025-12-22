# Create Enterprise Backend

A CLI tool for scaffolding enterprise-ready backend applications with Express or Fastify, integrated with MongoDB or Supabase.

## Features

- **Frameworks**: Choose between Express.js or Fastify
- **Databases**: Support for MongoDB or Supabase
- **Authentication**: Pre-configured JWT authentication modules
- **Middleware**: Built-in error handling, database guards, and JWT guards
- **Project Structure**: Organized modular architecture for scalability

## Installation

Install globally using npm:

```bash
npm install -g create-enterprise-backend
```

Or use with npx without installing:

```bash
npx create-enterprise-backend
```

## Usage

Run the CLI and follow the interactive prompts:

```bash
create-enterprise-backend [project-name]
```

### Options

- **Project Name**: Optional. If not provided, you'll be prompted to enter it.
- **Framework**: Select Express or Fastify
- **Database**: Choose MongoDB or Supabase
- **Install Dependencies**: Option to install npm packages immediately

### Example

```bash
npx create-enterprise-backend my-backend-app
```

This will create a new directory `my-backend-app` with the scaffolded backend.

## Project Structure

The generated project includes:

- **src/app.js**: Main application setup
- **src/server.js**: Server initialization
- **src/routes.js**: Route definitions
- **src/config/**: Configuration files (database, environment)
- **src/middlewares/**: Custom middleware (guards, error handling)
- **src/modules/**: Modular components (e.g., auth module)
- **src/services/**: Business logic services
- **src/utils/**: Utility functions

## Getting Started

After generating the project:

1. Navigate to the project directory:
   ```bash
   cd my-backend-app
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will run on the configured port (check `src/config/env.js`).

## Requirements

- Node.js >= 18

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/ImaadDev/create-enterprise-backend).

## License

MIT# create-enterprise-backend
