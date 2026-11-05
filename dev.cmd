@echo off
cd /d "%~dp0"
echo Starting the dev server. Leave this window open.
echo The site will be at http://localhost:3000
echo Closing this window stops the server.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { npm run dev -- --port 3000 2>&1 | Tee-Object -FilePath '.dev-server.log' }"
echo.
echo Dev server stopped.
pause
