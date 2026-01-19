from flask import Blueprint, request, jsonify
from extensions import db
from models.gallery import Gallery

gallery_bp = Blueprint('gallery', __name__)


@gallery_bp.route('/gallery', methods=['GET'])
def get_gallery():
    """
    Liste toutes les images de la galerie
    ---
    tags:
      - Gallery
    parameters:
      - name: category
        in: query
        type: string
        required: false
        description: Filtrer par categorie (nail-art, french, gel, extension, soin)
    responses:
      200:
        description: Liste des images
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                example: 1
              title:
                type: string
                example: "Nail art floral"
              image_url:
                type: string
                example: "/uploads/gallery/nail-art-1.jpg"
              category:
                type: string
                example: "nail-art"
              is_featured:
                type: boolean
                example: true
    """
    category = request.args.get('category')

    if category:
        images = Gallery.query.filter_by(category=category).all()
    else:
        images = Gallery.query.all()

    return jsonify([image.to_dict() for image in images])


@gallery_bp.route('/gallery/<int:id>', methods=['GET'])
def get_gallery_item(id):
    """
    Recupere une image par son ID
    ---
    tags:
      - Gallery
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID de l'image
    responses:
      200:
        description: Details de l'image
      404:
        description: Image non trouvee
    """
    image = Gallery.query.get_or_404(id)
    return jsonify(image.to_dict())


@gallery_bp.route('/gallery/featured', methods=['GET'])
def get_featured():
    """
    Recupere les images mises en avant
    ---
    tags:
      - Gallery
    responses:
      200:
        description: Liste des images mises en avant
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
              title:
                type: string
              image_url:
                type: string
              category:
                type: string
              is_featured:
                type: boolean
    """
    images = Gallery.query.filter_by(is_featured=True).all()
    return jsonify([image.to_dict() for image in images])


@gallery_bp.route('/gallery', methods=['POST'])
def create_gallery_item():
    """
    Ajoute une nouvelle image a la galerie
    ---
    tags:
      - Gallery
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - title
            - image_url
          properties:
            title:
              type: string
              example: "French manucure elegante"
            image_url:
              type: string
              example: "/uploads/gallery/french-1.jpg"
            category:
              type: string
              enum: [nail-art, french, gel, extension, soin]
              example: "french"
            is_featured:
              type: boolean
              example: false
    responses:
      201:
        description: Image ajoutee avec succes
      400:
        description: Donnees invalides
    """
    data = request.get_json()

    if not data or not data.get('title') or not data.get('image_url'):
        return jsonify({'error': "Le titre et l'URL de l'image sont requis"}), 400

    category = data.get('category')
    if category and category not in Gallery.CATEGORIES:
        return jsonify({'error': f'Categorie invalide. Valeurs acceptees: {Gallery.CATEGORIES}'}), 400

    image = Gallery(
        title=data['title'],
        image_url=data['image_url'],
        category=category,
        is_featured=data.get('is_featured', False)
    )

    db.session.add(image)
    db.session.commit()

    return jsonify(image.to_dict()), 201


@gallery_bp.route('/gallery/<int:id>', methods=['PUT'])
def update_gallery_item(id):
    """
    Met a jour une image de la galerie
    ---
    tags:
      - Gallery
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID de l'image
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            title:
              type: string
            image_url:
              type: string
            category:
              type: string
              enum: [nail-art, french, gel, extension, soin]
            is_featured:
              type: boolean
    responses:
      200:
        description: Image mise a jour
      400:
        description: Categorie invalide
      404:
        description: Image non trouvee
    """
    image = Gallery.query.get_or_404(id)
    data = request.get_json()

    if data.get('title'):
        image.title = data['title']
    if data.get('image_url'):
        image.image_url = data['image_url']
    if data.get('category') is not None:
        if data['category'] and data['category'] not in Gallery.CATEGORIES:
            return jsonify({'error': f'Categorie invalide. Valeurs acceptees: {Gallery.CATEGORIES}'}), 400
        image.category = data['category']
    if data.get('is_featured') is not None:
        image.is_featured = data['is_featured']

    db.session.commit()

    return jsonify(image.to_dict())


@gallery_bp.route('/gallery/<int:id>', methods=['DELETE'])
def delete_gallery_item(id):
    """
    Supprime une image de la galerie
    ---
    tags:
      - Gallery
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID de l'image
    responses:
      200:
        description: Image supprimee avec succes
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Image supprimee avec succes"
      404:
        description: Image non trouvee
    """
    image = Gallery.query.get_or_404(id)

    db.session.delete(image)
    db.session.commit()

    return jsonify({'message': 'Image supprimee avec succes'})
