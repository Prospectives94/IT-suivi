@echo off
title IT Ticket Manager
echo.
echo  ==========================================
echo   IT Ticket Manager - Demarrage
echo  ==========================================
echo.

:: Check if .env exists
if not exist "server\.env" (
  echo [ATTENTION] Le fichier server\.env est manquant !
  echo Copiez server\.env.example vers server\.env et configurez-le.
  echo.
  pause
  exit
)

:: Check if node_modules exist
if not exist "server\node_modules" (
  echo [INFO] Installation des dependances serveur...
  cd server && npm install && cd ..
)
if not exist "client\node_modules" (
  echo [INFO] Installation des dependances client...
  cd client && npm install && cd ..
)

echo [OK] Demarrage du serveur backend (port 3001)...
start "IT Ticket Manager - Backend" cmd /k "cd server && npm run dev"

timeout /t 2 /nobreak > nul

echo [OK] Demarrage du frontend (port 5173)...
start "IT Ticket Manager - Frontend" cmd /k "cd client && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo [OK] Application demarree !
echo Ouvrez votre navigateur sur : http://localhost:5173
echo.
start http://localhost:5173

echo Appuyez sur une touche pour fermer cette fenetre...
pause > nul
