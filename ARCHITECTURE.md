# 🏗️ ARCHITECTURE - Site Vitrine Manucure

## 📋 Vue d'ensemble du projet

**Nom du projet** : Site vitrine de manucure  
**Stack** : Python (Flask) + React (Vite)  
**Base de données** : SQLite  
**Type** : Application web full-stack  

---

## 🎯 Objectifs

- Site vitrine moderne et responsive
- Présentation des services et tarifs
- Galerie photos avant/après
- Formulaire de contact fonctionnel
- Interface admin pour gérer le contenu (optionnel)
- Hot reload en développement pour visualisation en temps réel

---

## 🛠️ Stack Technique

### Backend
- **Framework** : Flask 3.0
- **Langage** : Python 3.10+
- **Base de données** : SQLite (évolutif vers PostgreSQL)
- **ORM** : SQLAlchemy
- **API** : RESTful

### Frontend
- **Framework** : React 18
- **Build tool** : Vite 5
- **Routing** : React Router v6
- **HTTP Client** : Axios
- **Styling** : Tailwind CSS 3
- **Langage** : JavaScript (ES6+)

### Outils de développement
- **Serveur backend** : Flask development server (port 5000)
- **Serveur frontend** : Vite dev server (port 5173)
- **Hot reload** : Activé sur les deux serveurs

---

## 📁 Structure du projet

```
PYTHON_AI_AGENT/
│
├── backend/
│   ├── app.py                 # Point d'entrée Flask
│   ├── config.py              # Configuration (DB, secrets, CORS)
│   ├── requirements.txt       # Dépendances Python
│   ├── database.db            # Base SQLite (généré)
│   │
│   ├── models/                # Modèles SQLAlchemy
│   │   ├── __init__.py
│   │   ├── service.py         # Modèle Service (prestations)
│   │   ├── gallery.py         # Modèle Gallery (images)
│   │   └── contact.py         # Modèle Contact (messages)
│   │
│   ├── routes/                # Routes API REST
│   │   ├── __init__.py
│   │   ├── services.py        # CRUD services
│   │   ├── gallery.py         # CRUD galerie
│   │   └── contact.py         # Gestion formulaire contact
│   │
│   ├── utils/                 # Fonctions utilitaires
│   │   ├── __init__.py
│   │   └── email_sender.py    # Envoi d'emails
│   │
│   └── uploads/               # Dossier pour images uploadées
│       ├── services/
│       └── gallery/
│
├── frontend/
│   ├── public/                # Assets statiques
│   │   └── images/
│   │
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── GalleryItem.jsx
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── pages/             # Pages principales
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Admin.jsx      # (optionnel)
│   │   │
│   │   ├── services/          # Logique appels API
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx            # Composant racine + routing
│   │   ├── main.jsx           # Point d'entrée React
│   │   └── index.css          # Styles globaux + Tailwind
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── .env                       # Variables d'environnement
├── .gitignore
├── ARCHITECTURE.md            # Ce fichier
└── README.md
```

---

## 🗄️ Schéma de Base de Données

### Table : **services**
Stocke les prestations de manucure proposées.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INTEGER | Clé primaire, auto-incrémenté |
| name | VARCHAR(100) | Nom du service (ex: "Manucure gel") |
| description | TEXT | Description détaillée |
| price | FLOAT | Prix en euros |
| duration | INTEGER | Durée en minutes |
| image_url | VARCHAR(255) | Chemin vers l'image |
| created_at | DATETIME | Date de création |
| updated_at | DATETIME | Date de dernière modification |

**Exemple de données** :
```json
{
  "id": 1,
  "name": "Manucure classique",
  "description": "Soin complet des ongles avec vernis traditionnel",
  "price": 25.00,
  "duration": 45,
  "image_url": "/uploads/services/manucure-classique.jpg"
}
```

---

### Table : **gallery**
Stocke les photos de réalisations.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INTEGER | Clé primaire, auto-incrémenté |
| title | VARCHAR(100) | Titre de l'image |
| image_url | VARCHAR(255) | Chemin vers l'image |
| category | VARCHAR(50) | Catégorie (nail-art, french, gel, etc.) |
| is_featured | BOOLEAN | Mise en avant sur l'accueil |
| created_at | DATETIME | Date d'ajout |

**Catégories possibles** :
- `nail-art` : Nail art créatif
- `french` : French manucure
- `gel` : Pose de gel
- `extension` : Extensions d'ongles
- `soin` : Soins des mains

---

### Table : **contacts**
Stocke les messages du formulaire de contact.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INTEGER | Clé primaire, auto-incrémenté |
| name | VARCHAR(100) | Nom du contact |
| email | VARCHAR(100) | Email du contact |
| phone | VARCHAR(20) | Téléphone (optionnel) |
| message | TEXT | Message |
| status | VARCHAR(20) | Statut : new, read, replied |
| created_at | DATETIME | Date de réception |

---

## 🔌 API Endpoints (REST)

### **Services**

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/services` | Liste tous les services | Non |
| GET | `/api/services/:id` | Détails d'un service | Non |
| POST | `/api/services` | Créer un service | Admin |
| PUT | `/api/services/:id` | Modifier un service | Admin |
| DELETE | `/api/services/:id` | Supprimer un service | Admin |

**Exemple de réponse GET** :
```json
[
  {
    "id": 1,
    "name": "Manucure gel",
    "description": "Application de vernis gel semi-permanent",
    "price": 35.00,
    "duration": 60,
    "image_url": "/uploads/services/gel.jpg"
  }
]
```

---

### **Galerie**

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/gallery` | Toutes les images | Non |
| GET | `/api/gallery?category=nail-art` | Filtrer par catégorie | Non |
| GET | `/api/gallery/:id` | Une image spécifique | Non |
| POST | `/api/gallery` | Ajouter une image | Admin |
| DELETE | `/api/gallery/:id` | Supprimer une image | Admin |

---

### **Contact**

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/contact` | Envoyer un message | Non |
| GET | `/api/contacts` | Liste des messages | Admin |
| PUT | `/api/contacts/:id` | Marquer comme lu/répondu | Admin |

**Body POST /api/contact** :
```json
{
  "name": "Marie Dupont",
  "email": "marie@example.com",
  "phone": "0612345678",
  "message": "Bonjour, je souhaite prendre rendez-vous..."
}
```

---

## 🎨 Pages Frontend

### 1. **Home (Accueil)** - `/`

**Sections** :
- **Hero** : Image d'en-tête avec titre et CTA "Prendre RDV"
- **À propos** : Présentation du salon (2-3 paragraphes)
- **Services populaires** : Top 3 services en cartes
- **Galerie miniature** : 6 photos en grille avec lien "Voir plus"
- **Témoignages** : 2-3 avis clients (optionnel)
- **Footer** : Horaires, adresse, réseaux sociaux

**Composants utilisés** :
- `<Hero />`
- `<ServiceCard />` (x3)
- `<GalleryGrid />` (version miniature)

---

### 2. **Services** - `/services`

**Sections** :
- **Header** : Titre "Nos Prestations"
- **Filtres** : Tous / Manucure / Pédicure / Nail Art
- **Grille de services** : Cards avec image, nom, prix, durée
- **Détails au clic** : Modal ou page dédiée

**Composants utilisés** :
- `<ServiceCard />` (mapping de toutes les prestations)
- `<ServiceFilter />`
- `<ServiceModal />` (optionnel)

**Fonctionnalités** :
- Filtrage dynamique
- Tri par prix
- Bouton "Réserver" (peut ouvrir modal contact)

---

### 3. **Gallery** - `/gallery`

**Sections** :
- **Header** : Titre "Notre Galerie"
- **Filtres** : Catégories (Nail Art, French, Gel, etc.)
- **Grille d'images** : Masonry layout responsive
- **Lightbox** : Affichage en grand au clic

**Composants utilisés** :
- `<GalleryItem />` (avec effet hover)
- `<Lightbox />` (bibliothèque ou custom)
- `<CategoryFilter />`

**Fonctionnalités** :
- Lazy loading des images
- Navigation clavier dans la lightbox
- Responsive (3 cols desktop, 2 tablet, 1 mobile)

---

### 4. **Contact** - `/contact`

**Sections** :
- **Formulaire** : Nom, Email, Téléphone, Message
- **Informations** : Adresse, téléphone, email, horaires
- **Map** : Google Maps embed
- **CTA** : "Suivez-nous" (Instagram, Facebook)

**Composants utilisés** :
- `<ContactForm />` (avec validation Formik ou native)
- `<MapEmbed />`
- `<ContactInfo />`

**Validation** :
- Email format valide
- Nom et message obligatoires
- Téléphone optionnel mais format vérifié si renseigné
- Message de confirmation après envoi

---

### 5. **Admin** - `/admin` (optionnel)

**Sections** :
- **Login** : Authentification simple
- **Dashboard** :
  - Gérer les services (CRUD)
  - Gérer la galerie (upload, suppression)
  - Voir les messages de contact
  - Statistiques basiques

**Composants utilisés** :
- `<AdminLogin />`
- `<ServiceManager />`
- `<GalleryManager />`
- `<ContactList />`

---

## 🚀 Workflow de Développement

### **Phase 1 : Setup Initial** (Jour 1)

**Backend** :
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend** :
```bash
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Fichiers de config** :
- Créer `.env` avec secrets
- Configurer CORS dans Flask
- Configurer Tailwind CSS

---

### **Phase 2 : Backend API** (Jours 2-3)

1. **Modèles de données** :
   - Créer `models/service.py`
   - Créer `models/gallery.py`
   - Créer `models/contact.py`
   - Initialiser la base SQLite

2. **Routes API** :
   - Implémenter CRUD services
   - Implémenter CRUD galerie
   - Implémenter POST contact

3. **Tests** :
   - Tester avec Thunder Client / Postman
   - Vérifier CORS
   - Tester upload d'images

---

### **Phase 3 : Frontend Core** (Jours 4-5)

1. **Composants de base** :
   - `Navbar` avec routing
   - `Footer` réutilisable
   - `Hero` pour l'accueil

2. **Pages principales** :
   - Page Home (structure)
   - Page Services (structure)
   - Page Gallery (structure)
   - Page Contact (structure)

3. **Styling Tailwind** :
   - Palette de couleurs
   - Responsive breakpoints
   - Composants stylisés

---

### **Phase 4 : Intégration API** (Jours 6-7)

1. **Service API client** :
   - Créer `services/api.js` avec Axios
   - Fonctions pour chaque endpoint

2. **Connexion pages/API** :
   - Fetch services dans page Services
   - Fetch galerie dans page Gallery
   - POST formulaire contact

3. **Gestion d'état** :
   - useState pour données
   - useEffect pour fetch initial
   - Gestion du loading et erreurs

---

### **Phase 5 : Polish & Features** (Jours 8-10)

1. **UX/UI** :
   - Animations (Framer Motion optionnel)
   - Transitions de page
   - Feedback utilisateur (toasts)

2. **Responsive** :
   - Tester sur mobile/tablet
   - Ajuster breakpoints Tailwind
   - Menu mobile (hamburger)

3. **Optimisations** :
   - Lazy loading images
   - Code splitting React
   - Compression images backend

4. **SEO basique** :
   - Meta tags
   - Alt text sur images
   - Sitemap (optionnel)

---

## 📦 Dépendances

### Backend (`requirements.txt`)

```txt
Flask==3.0.0
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.1.1
python-dotenv==1.0.0
Pillow==10.0.0
Werkzeug==3.0.0
```

**Optionnelles** :
- `Flask-Mail` : Pour envoi d'emails
- `Flask-JWT-Extended` : Pour authentification admin
- `pytest` : Pour tests unitaires

---

### Frontend (`package.json`)

```json
{
  "name": "manucure-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

**Optionnelles** :
- `framer-motion` : Animations avancées
- `react-hot-toast` : Notifications
- `react-photo-view` : Lightbox galerie
- `formik` + `yup` : Validation formulaires

---

## ⚙️ Configuration importante

### CORS (Flask)

Dans `app.py` :
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})
```

---

### Proxy Vite (optionnel)

Dans `vite.config.js` :
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

**Avantage** : Permet d'appeler `/api/services` au lieu de `http://localhost:5000/api/services`

---

### Variables d'environnement

Fichier `.env` à la racine :
```env
# Flask
FLASK_APP=backend/app.py
FLASK_ENV=development
SECRET_KEY=votre_clé_secrète_super_sécurisée

# Database
DATABASE_URL=sqlite:///database.db

# Email (optionnel)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=votre_email@gmail.com
MAIL_PASSWORD=votre_mot_de_passe

# Frontend
VITE_API_URL=http://localhost:5000
```

**⚠️ Important** : Ajouter `.env` dans `.gitignore` !

---

## 🎨 Design System (Tailwind)

### Palette de couleurs suggérée

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          500: '#ec4899',  // Rose principal
          600: '#db2777',
          700: '#be185d',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',  // Gris élégant
          700: '#334155',
        },
        accent: '#fbbf24',  // Or pour CTAs
      }
    }
  }
}
```

### Composants réutilisables

**Bouton principal** :
```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition">
  Prendre RDV
</button>
```

**Card service** :
```jsx
<div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
  {/* Contenu */}
</div>
```

---

## 🔒 Sécurité

### Checklist

- [ ] Validation des inputs côté backend (ne jamais faire confiance au frontend)
- [ ] Sanitization des données avant insertion en DB
- [ ] Rate limiting sur les endpoints (ex: formulaire contact)
- [ ] Validation des types de fichiers uploadés (images uniquement)
- [ ] Taille max des uploads (ex: 5MB)
- [ ] HTTPS en production
- [ ] Variables sensibles dans `.env`
- [ ] Protection CSRF pour formulaires
- [ ] Headers de sécurité (CORS, CSP, etc.)

---

## 📱 Responsive Breakpoints

Utiliser les breakpoints Tailwind :
- `sm` : 640px (mobile landscape)
- `md` : 768px (tablette)
- `lg` : 1024px (desktop)
- `xl` : 1280px (grand écran)

**Exemple** :
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

---

## 🧪 Tests (optionnel)

### Backend
```bash
pip install pytest pytest-flask
pytest tests/
```

### Frontend
```bash
npm install -D vitest @testing-library/react
npm run test
```

---

## 🚀 Déploiement (futur)

### Options gratuites

**Backend** :
- Render.com (gratuit avec limitations)
- Railway.app
- PythonAnywhere
- Heroku (avec crédit)

**Frontend** :
- Vercel (recommandé pour React)
- Netlify
- GitHub Pages

**Base de données** :
- SQLite → PostgreSQL (nécessaire en production)
- ElephantSQL (PostgreSQL gratuit)
- Supabase

---

## 📝 Commandes essentielles

### Lancer le projet en développement

**Terminal 1 - Backend** :
```bash
cd backend
source venv/bin/activate
python app.py
# → http://localhost:5000
```

**Terminal 2 - Frontend** :
```bash
cd frontend
npm run dev
# → http://localhost:5173
```

### Autres commandes utiles

```bash
# Backend
pip freeze > requirements.txt  # Sauvegarder les dépendances
flask db init                  # Initialiser migrations (avec Flask-Migrate)
flask db migrate               # Créer migration
flask db upgrade               # Appliquer migration

# Frontend
npm run build                  # Build production
npm run preview                # Preview du build
```

---

## 🎯 Fonctionnalités futures (V2)

- [ ] Système de prise de rendez-vous en ligne
- [ ] Intégration calendrier (Google Calendar)
- [ ] Paiement en ligne (Stripe)
- [ ] Système de fidélité
- [ ] Newsletter
- [ ] Multi-langues (FR/EN)
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Notifications push
- [ ] Chatbot pour RDV

---

## 📚 Ressources utiles

### Documentation
- [Flask](https://flask.palletsprojects.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

### Inspirations design
- [Dribbble - Beauty Salon](https://dribbble.com/search/beauty-salon-website)
- [Awwwards - Salon websites](https://www.awwwards.com/)

### Assets gratuits
- [Unsplash](https://unsplash.com/) - Photos gratuites
- [Pexels](https://www.pexels.com/) - Photos/vidéos
- [Heroicons](https://heroicons.com/) - Icônes SVG
- [Google Fonts](https://fonts.google.com/) - Typographies

---

## ✅ Checklist avant de commencer avec Claude Code

- [ ] Architecture lue et comprise
- [ ] Dossier "PYTHON_AI_AGENT" prêt dans VS Code
- [ ] Claude Code installé dans le terminal VS Code
- [ ] Python 3.10+ installé sur la machine
- [ ] Node.js 18+ installé sur la machine
- [ ] Git configuré (optionnel mais recommandé)
- [ ] Ce fichier ARCHITECTURE.md sauvegardé dans le projet

---

## 🆘 Troubleshooting courant

### Problème : CORS errors
**Solution** : Vérifier que Flask-CORS est installé et configuré correctement

### Problème : Port 5000 déjà utilisé (macOS)
**Solution** : Utiliser un autre port ou désactiver AirPlay Receiver

### Problème : Module not found
**Solution** : Vérifier que le venv est activé et que les dépendances sont installées

### Problème : Images ne s'affichent pas
**Solution** : Vérifier les chemins relatifs et la config du dossier `uploads`

### Problème : Hot reload ne fonctionne pas
**Solution** : Redémarrer les serveurs, vérifier que `debug=True` (Flask) et que Vite watch est actif

---

## 📞 Support

Pour toute question pendant le développement :
1. Consulter cette documentation
2. Vérifier les logs de la console (backend et frontend)
3. Utiliser Claude Code pour déboguer
4. Revenir sur Claude.ai pour des questions d'architecture

---

**Document créé le** : 19 janvier 2026  
**Dernière mise à jour** : 19 janvier 2026  
**Version** : 1.0  
**Auteur** : Architecture conçue avec Claude (Anthropic)

---

🎉 **Bon développement !** N'hésite pas à adapter cette architecture selon tes besoins spécifiques.
