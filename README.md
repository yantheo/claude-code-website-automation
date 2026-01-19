# 💅 Nail Salon Website

> My first **vibe coding** project with Claude Code - From concept to code, guided by AI

![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌟 About the Project

Modern and responsive showcase website for a nail salon, created entirely with **Claude Code** as part of my learning journey in AI-assisted full-stack development.

**"Vibe Coding" Concept**: Start from an idea, architect with Claude.ai, then implement with Claude Code - a new way of coding where AI becomes a co-developer.

---

## 🎯 Project Goals

- ✅ Learn full-stack development (Backend + Frontend)
- ✅ Experiment with "vibe coding" using Claude Code
- ✅ Create a professional and functional website
- ✅ Understand modern web application architecture
- ✅ Manage an end-to-end project with AI assistance

---

## 🛠️ Tech Stack

### Backend
- **Python 3.10+**
- **Flask 3.0** - Minimalist web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (scalable to PostgreSQL)
- **Flask-CORS** - Cross-origin request management

### Frontend
- **React 18** - Modern UI library
- **Vite 5** - Ultra-fast build tool with hot reload
- **React Router v6** - SPA navigation
- **Axios** - HTTP client
- **Tailwind CSS 3** - Utility-first CSS framework

### Development Tools
- **Claude Code** - AI assistant for development
- **VS Code** - Code editor
- **Git** - Version control

---

## 📁 Project Structure

```
PYTHON_AI_AGENT/
│
├── backend/                    # Flask REST API
│   ├── app.py                 # Entry point
│   ├── config.py              # Configuration
│   ├── database.db            # SQLite database
│   ├── requirements.txt       # Python dependencies
│   │
│   ├── models/                # SQLAlchemy models
│   │   ├── service.py         # Service model
│   │   ├── gallery.py         # Gallery model
│   │   └── contact.py         # Contact model
│   │
│   ├── routes/                # API routes
│   │   ├── services.py        # CRUD services
│   │   ├── gallery.py         # CRUD gallery
│   │   └── contact.py         # Contact form
│   │
│   └── uploads/               # Uploaded images
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Main pages
│   │   ├── services/          # API logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── ARCHITECTURE.md            # Architecture documentation
├── README.md                  # This file
└── .gitignore
```

---

## 🚀 Installation and Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PYTHON_AI_AGENT.git
cd PYTHON_AI_AGENT
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Backend will be accessible at: **http://localhost:5001**

### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be accessible at: **http://localhost:5173**

---

## 🗄️ Database

### Initialize database with test data

```bash
cd backend
python seed.py
```

This will create:
- 5 nail services with descriptions and prices
- 8 images in the gallery
- SQLite tables ready to use

### Table structure

**services**: Offered services (name, description, price, duration)  
**gallery**: Photos of work (title, image, category)  
**contacts**: Visitor messages (name, email, message, status)

---

## 🌐 API Endpoints

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Service details
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Gallery
- `GET /api/gallery` - All images
- `GET /api/gallery?category=nail-art` - Filter by category
- `POST /api/gallery` - Add image
- `DELETE /api/gallery/:id` - Delete image

### Contact
- `POST /api/contact` - Send message
- `GET /api/contacts` - List messages (admin)

---

## 🎨 Features

### ✅ Implemented (V1)

- [x] Homepage with Hero section
- [x] Services catalog
- [x] Photo gallery (portfolio)
- [x] Functional contact form
- [x] Complete REST API
- [x] Responsive design (mobile, tablet, desktop)
- [x] Hot reload in development

### 🔮 Coming Soon (V2)

- [ ] Online appointment booking system
- [ ] Admin dashboard for content management
- [ ] Google Calendar integration
- [ ] User authentication
- [ ] Online payment (Stripe)
- [ ] Newsletter
- [ ] Multi-language support (EN/FR)
- [ ] Dark mode

---

## 🧪 Testing

### Test the API

Use **Thunder Client** (VS Code) or **Postman**:

```bash
# Test backend
curl http://localhost:5001/api/services

# Test contact form
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```

---

## 📸 Screenshots

_To be added: interface screenshots_

---

## 🤖 My Journey with Claude Code

### What I Learned

1. **Architecture First**: Define structure before coding
2. **Vibe Coding**: Dialogue with AI like a co-developer
3. **Full-Stack**: Understanding Backend/Frontend interaction
4. **REST API**: Creating and consuming endpoints
5. **Modern React**: Hooks, functional components, routing
6. **Workflows**: Hot reload, Git, virtual environments

### Workflow Used

```
1. Brainstorming with Claude.ai
   ↓
2. Detailed architecture (ARCHITECTURE.md)
   ↓
3. Implementation with Claude Code
   ↓
4. Testing and iterations
   ↓
5. Git deployment
```

### Challenges Faced

- **Port 5000 occupied** (macOS AirPlay) → Solution: port 5001
- **CORS errors** → Flask-CORS configuration
- **First time using SQLite** → Learning SQLAlchemy ORM

### What Surprised Me

- Development speed with Claude Code
- Quality of generated code
- Importance of good initial architecture
- How hot reload changes everything in development

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file at the root:

```env
# Flask
FLASK_APP=backend/app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key

# Database
DATABASE_URL=sqlite:///database.db

# Frontend
VITE_API_URL=http://localhost:5001
```

### CORS

Backend allows requests from `http://localhost:5173` (frontend dev).

In production, modify `backend/config.py` with production domain.

---

## 📦 Available Scripts

### Backend

```bash
python app.py          # Run Flask server
python seed.py         # Fill database with test data
pip freeze > requirements.txt  # Update dependencies
```

### Frontend

```bash
npm run dev            # Development server
npm run build          # Production build
npm run preview        # Preview build
```

---

## 🚀 Deployment (Future)

### Backend
- **Render.com** or **Railway.app** (free with limitations)
- Migrate SQLite → PostgreSQL

### Frontend
- **Vercel** or **Netlify** (free, optimized for React)

### Production Configuration
- Environment variables
- HTTPS required
- CORS configured for production domain
- Asset compression

---

## 🤝 Contributing

This is a personal educational project, but suggestions are welcome!

1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **Anthropic** for Claude and Claude Code
- The **React** and **Flask** communities
- All tutorials and resources that helped me

---

## 📧 Contact

**Your Name** - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/YOUR_USERNAME/PYTHON_AI_AGENT](https://github.com/YOUR_USERNAME/PYTHON_AI_AGENT)

---

## 💡 Next Projects

Now that I've mastered vibe coding with Claude Code, my next goals:
- [ ] Complete e-commerce project
- [ ] Admin dashboard with charts
- [ ] Public API with JWT authentication
- [ ] React Native mobile app

---

<div align="center">

**Made with ❤️ and Claude Code**

⭐ Don't hesitate to star the project if you found it interesting!

</div>
