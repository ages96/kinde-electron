import { app, BrowserWindow } from "electron";
import path from "path";
import { startServer } from "./server";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // optional, for IPC
    },
  });

  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  startServer(); // start Express backend server with Kinde auth
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
