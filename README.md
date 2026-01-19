# Site Vitrine Manucure

Site vitrine moderne pour un salon de manucure, construit avec Flask (backend) et React/Vite (frontend).

## Stack Technique

- **Backend** : Flask 3.0, SQLAlchemy, SQLite
- **Frontend** : React 19, Vite 7, Tailwind CSS 4
- **API** : RESTful

## Installation

### Prerequis

- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Lancement en developpement

### Terminal 1 - Backend

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
```

Le serveur backend sera accessible sur http://localhost:5000

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Le serveur frontend sera accessible sur http://localhost:5173

## Structure du projet

```
PYTHON_AI_AGENT/
├── backend/
│   ├── app.py              # Point d'entree Flask
│   ├── config.py           # Configuration
│   ├── extensions.py       # Extensions Flask (db)
│   ├── requirements.txt    # Dependances Python
│   ├── models/             # Modeles SQLAlchemy
│   ├── routes/             # Routes API REST
│   ├── utils/              # Fonctions utilitaires
│   └── uploads/            # Images uploadees
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/          # Pages
│   │   ├── services/       # Client API
│   │   ├── App.jsx         # Composant racine
│   │   └── main.jsx        # Point d'entree
│   ├── package.json
│   └── vite.config.js
│
├── .env                    # Variables d'environnement
├── .gitignore
├── ARCHITECTURE.md         # Documentation detaillee
└── README.md
```

## API Endpoints

### Services
- `GET /api/services` - Liste des services
- `GET /api/services/:id` - Detail d'un service
- `POST /api/services` - Creer un service
- `PUT /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service

### Galerie
- `GET /api/gallery` - Liste des images
- `GET /api/gallery?category=nail-art` - Filtrer par categorie
- `GET /api/gallery/featured` - Images mises en avant
- `POST /api/gallery` - Ajouter une image
- `DELETE /api/gallery/:id` - Supprimer une image

### Contact
- `POST /api/contact` - Envoyer un message
- `GET /api/contacts` - Liste des messages (admin)
- `PUT /api/contacts/:id` - Mettre a jour le statut

## Pages Frontend

- `/` - Accueil
- `/services` - Liste des prestations
- `/gallery` - Galerie photos
- `/contact` - Formulaire de contact
- `/admin` - Interface d'administration

## Configuration

Copiez le fichier `.env` et modifiez les valeurs selon vos besoins :

```env
SECRET_KEY=votre_cle_secrete
DATABASE_URL=sqlite:///database.db
VITE_API_URL=http://localhost:5000
```
