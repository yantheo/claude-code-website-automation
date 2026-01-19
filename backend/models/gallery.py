from datetime import datetime
from extensions import db


class Gallery(db.Model):
    """Modèle pour les photos de la galerie."""

    __tablename__ = 'gallery'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=True)  # nail-art, french, gel, extension, soin
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Catégories valides
    CATEGORIES = ['nail-art', 'french', 'gel', 'extension', 'soin']

    def to_dict(self):
        """Convertit le modèle en dictionnaire."""
        return {
            'id': self.id,
            'title': self.title,
            'image_url': self.image_url,
            'category': self.category,
            'is_featured': self.is_featured,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
