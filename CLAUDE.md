# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nail salon showcase website with Flask REST API backend and React/Vite frontend. SQLite database with SQLAlchemy ORM.

## Development Commands

### Backend (Flask - Port 5001)
```bash
cd backend
source venv/bin/activate      # Activate virtualenv (macOS/Linux)
python app.py                 # Run Flask server with hot reload
```

### Frontend (React/Vite - Port 5173)
```bash
cd frontend
npm run dev                   # Development server with HMR
npm run build                 # Production build
npm run lint                  # ESLint
```

### First-time Setup
```bash
# Backend
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt

# Frontend
cd frontend && npm install
```

## Architecture

### Backend Structure
- **app.py** - Flask entry point, CORS config, Swagger setup, blueprint registration
- **extensions.py** - SQLAlchemy db instance (avoids circular imports)
- **config.py** - App configuration from environment variables
- **models/** - SQLAlchemy models (Service, Gallery, Contact) with `to_dict()` methods
- **routes/** - Blueprint-based REST endpoints with Swagger YAML docstrings

### Frontend Structure
- **src/services/api.js** - Axios client with all API calls
- **src/components/** - Reusable UI components (Navbar, Footer, Hero, ServiceCard, GalleryItem, ContactForm)
- **src/pages/** - Route pages (Home, Services, Gallery, Contact, Admin)
- **vite.config.js** - Vite config with `/api` proxy to backend

### API Documentation
Swagger UI available at: `http://localhost:5001/api/docs/`

### Key Patterns
- Routes use Flask Blueprints with `/api` prefix
- Models import `db` from `extensions.py` (not `app.py`) to avoid circular imports
- Frontend uses Vite proxy for `/api/*` requests to avoid CORS in development
- Tailwind CSS v4 configured via `@tailwindcss/vite` plugin

## Important Notes

- **Port 5001** is used instead of 5000 (macOS AirPlay uses 5000)
- CORS allows `http://localhost:5173` (frontend dev server)
- Database tables auto-created on Flask startup via `db.create_all()`
