# Path to your project folders
$backendPath = "N:\Electron Project\backend"
$frontendPath = "N:\Electron Project\frontend"

# Start backend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'N:\Electron Project\backend'; node index.js"

# Start frontend in another PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'N:\Electron Project\frontend'; npm start"
