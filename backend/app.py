from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from config import Config
from extensions import db

# Initialisation de l'application Flask
app = Flask(__name__)
app.config.from_object(Config)

# Configuration CORS
CORS(app, resources={
    r"/api/*": {
        "origins": Config.CORS_ORIGINS,
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})

# Configuration Swagger
swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec",
            "route": "/apispec.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/api/docs/"
}

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "API Site Vitrine Manucure",
        "description": "API REST pour le site vitrine de manucure",
        "version": "1.0.0",
        "contact": {
            "name": "Support",
            "email": "contact@manucure-studio.fr"
        }
    },
    "basePath": "/api",
    "schemes": ["http", "https"],
    "tags": [
        {"name": "Services", "description": "Gestion des prestations"},
        {"name": "Gallery", "description": "Gestion de la galerie photos"},
        {"name": "Contact", "description": "Gestion des messages de contact"}
    ]
}

swagger = Swagger(app, config=swagger_config, template=swagger_template)

# Initialisation de la base de données avec l'app
db.init_app(app)

# Import des modèles (après l'initialisation de db)
from models import Service, Gallery, Contact

# Import et enregistrement des routes
from routes.services import services_bp
from routes.gallery import gallery_bp
from routes.contact import contact_bp

app.register_blueprint(services_bp, url_prefix='/api')
app.register_blueprint(gallery_bp, url_prefix='/api')
app.register_blueprint(contact_bp, url_prefix='/api')

# Route de test
@app.route('/')
def index():
    return {'message': 'API Site Vitrine Manucure', 'status': 'running'}

# Création des tables au démarrage
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5001)
