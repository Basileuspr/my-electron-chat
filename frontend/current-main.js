const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // ✅ Corrected path for Electron Forge (frontend is already the root)
  win.loadFile('index.html');

  // 🔍 Open DevTools
  win.webContents.openDevTools();

  // ❌ Log if page fails to load
  win.webContents.on('did-fail-load', (event, errorCode, errorDesc, validatedURL) => {
    console.error(`❌ Failed to load URL ${validatedURL}: ${errorDesc} (code: ${errorCode})`);
  });

  // ✅ Log if page loads successfully
  win.webContents.on('did-finish-load', () => {
    console.log(`✅ Renderer finished loading: ${win.webContents.getURL()}`);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
