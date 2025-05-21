import express from "express";
import { createKindeServerClient, GrantType, SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

// Log every incoming request URL
app.use((req, res, next) => {
  console.log(`URL requested: ${req.method} ${req.originalUrl}`);
  next();
});

// Simple in-memory session manager (only for demo)
let store: Record<string, any> = {};

const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key];
  },
  async setSessionItem(key: string, value: any) {
    store[key] = value;
  },
  async removeSessionItem(key: string) {
    delete store[key];
  },
  async destroySession() {
    store = {};
  },
};

// Configure your Kinde client here:
const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_AUTH_DOMAIN!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_REDIRECT_URL!,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL!,
});

app.get("/", async (req, res) => {
  const isAuth = await kindeClient.isAuthenticated(sessionManager);
  if (isAuth) {
    const profile = await kindeClient.getUserProfile(sessionManager);
    res.send(`
      <h1>Welcome ${profile.given_name}!</h1>
      <img src="${profile.picture}" width="100" />
      <p>Email: ${profile.email}</p>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Not logged in</h1>
      <a href="/login">Login</a> | <a href="/register">Register</a>
    `);
  }
});

app.get("/login", async (req, res) => {
  const loginUrl = await kindeClient.login(sessionManager);
  res.redirect(loginUrl.toString());
});

app.get("/register", async (req, res) => {
  const registerUrl = await kindeClient.register(sessionManager);
  res.redirect(registerUrl.toString());
});

app.get("/api/auth/kinde_callback", async (req, res) => {
  const url = new URL(`${req.protocol}://${req.get("host")}${req.url}`);
  await kindeClient.handleRedirectToApp(sessionManager, url);
  res.redirect("/");
});

app.get("/logout", async (req, res) => {
  const logoutUrl = await kindeClient.logout(sessionManager);
  res.redirect(logoutUrl.toString());
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
