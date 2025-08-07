@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM --- Setup log folder and date ---
set LOGDIR=frontend_logs
set "DATETIME=%date:~10,4%-%date:~4,2%-%date:~7,2%_%time:~0,2%-%time:~3,2%"
set "DATETIME=%DATETIME: =0%"

REM --- Create log folder if not exists ---
if not exist "%LOGDIR%" (
    mkdir "%LOGDIR%"
)

REM --- Define log file paths ---
set FRONTEND_LOG=%LOGDIR%\frontend_!DATETIME!.log
set BACKEND_LOG=%LOGDIR%\backend_!DATETIME!.log

REM --- Launch backend server ---
start "Backend Server" cmd /k "cd backend && echo Backend starting... && python main.py >> ..\%BACKEND_LOG% 2>&1"

REM --- Launch frontend Electron app ---
start "Frontend App" cmd /k "cd frontend && echo Frontend starting... && npm start >> ..\%FRONTEND_LOG% 2>&1"

REM --- Optional: Launch the Electron wrapper from root directory ---
REM start "Electron Shell" cmd /k "npm run electron >> %LOGDIR%\electron_!DATETIME!.log 2>&1"
