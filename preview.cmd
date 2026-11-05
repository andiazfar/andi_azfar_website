@echo off
cd /d "%~dp0"
if not exist previews mkdir previews

set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME% set CHROME="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

echo Capturing previews from http://localhost:3000
echo (the dev server must already be running)
echo.

%CHROME% --headless=new --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,844 --virtual-time-budget=8000 --screenshot="previews\mobile.png" http://localhost:3000
%CHROME% --headless=new --no-sandbox --disable-gpu --hide-scrollbars --window-size=768,1024 --virtual-time-budget=8000 --screenshot="previews\tablet.png" http://localhost:3000
%CHROME% --headless=new --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,900 --virtual-time-budget=8000 --screenshot="previews\desktop.png" http://localhost:3000

echo.
echo Done. Files are in the previews folder:
dir /b previews
pause
