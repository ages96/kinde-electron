# Kinde Electron App

A desktop application built with **Electron** and **Express**, featuring **user authentication using the Kinde TypeScript SDK**.

## Features

- User login and registration using Kinde
- Session-based authentication flow
- Simple in-memory session store (demo purposes)
- TypeScript-based Electron setup
- Environment variable configuration

---

## Project Structure

```
├── dist/                   # Compiled JavaScript files
│   ├── main.js
│   └── server.js
├── node_modules/           # Project dependencies
├── main.ts                 # Electron main process
├── server.ts               # Express server with Kinde auth
├── package.json            # Project metadata and scripts
├── package-lock.json       # Dependency lock file
└── tsconfig.json           # TypeScript configuration
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kinde-electron.git
cd kinde-electron
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
KINDE_AUTH_DOMAIN=https://your-domain.kinde.com
KINDE_CLIENT_ID=your-kinde-client-id
KINDE_CLIENT_SECRET=your-kinde-client-secret
KINDE_REDIRECT_URL=http://localhost:3000/api/auth/kinde_callback
KINDE_LOGOUT_REDIRECT_URL=http://localhost:3000
```

> **Note:** Replace the placeholders with your actual Kinde application values.

---

## Run the App

```bash
npm start
```

This will:
1. Compile the TypeScript files to JavaScript (\`dist/\`)
2. Launch the Electron application
3. Start an Express server for handling authentication

---

## Build Only

```bash
npm run build
```

This will compile TypeScript into the \`dist/\` folder.

---

## Security Notice

This project uses a basic in-memory session store which is **not recommended for production**. For real-world use, consider a persistent session strategy like Redis or database-backed sessions.

---

## License

ISC

---

## Author

Ages