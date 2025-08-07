const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

const logDir = path.join(__dirname, 'frontend_logs');
const logFile = path.join(logDir, `chat-session_${new Date().toISOString().slice(0, 10)}.log`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'frontend_logs', 'preload.js'), // ✅ Corrected
      contextIsolation: false,
      nodeIntegration: true,
    }
  });

  win.loadFile(path.resolve(__dirname, 'index.html')); // ✅ Corrected

  win.webContents.on('did-fail-load', (event, errorCode, errorDesc, validatedURL) => {
    const err = `❌ Failed to load URL ${validatedURL}: ${errorDesc} (code: ${errorCode})\n`;
    console.error(err);
    fs.appendFileSync(logFile, err);
  });

  win.webContents.on('did-finish-load', () => {
    const msg = `✅ Renderer finished loading: ${win.webContents.getURL()}\n`;
    console.log(msg);
    fs.appendFileSync(logFile, msg);
  });

  globalShortcut.register('F12', () => {
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools();
    } else {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
