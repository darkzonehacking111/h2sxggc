@echo off
title Udbhav 2027 Localhost Server
echo ==========================================================
echo Starting Udbhav 2027 Localhost Server...
echo Main Site:   http://localhost:8080/index.html
echo Theme Reveal: http://localhost:8080/theme-reveal.html
echo ==========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause

