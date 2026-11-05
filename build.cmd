@echo off
cd /d "%~dp0"
echo Building for production. This can take a minute.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { npm run build 2>&1 | Tee-Object -FilePath '.build.log' }"
echo.
echo Build finished. Log saved to .build.log
pause
