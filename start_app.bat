@echo off
echo ========================================================
echo   Launching South TN TravelMate (Backend + Frontend)
echo ========================================================
echo.

echo Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "South TN TravelMate - Backend" cmd /k "python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo Starting Vite Frontend on http://localhost:3000 ...
start "South TN TravelMate - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers launched!
echo Open your browser at http://localhost:3000
echo Backend API Docs at http://127.0.0.1:8000/docs
echo ========================================================
