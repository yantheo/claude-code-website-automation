from flask import Blueprint, request, jsonify
from extensions import db
from models.service import Service

services_bp = Blueprint('services', __name__)


@services_bp.route('/services', methods=['GET'])
def get_services():
    """
    Liste tous les services
    ---
    tags:
      - Services
    responses:
      200:
        description: Liste des services
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                example: 1
              name:
                type: string
                example: "Manucure classique"
              description:
                type: string
                example: "Soin complet des ongles avec vernis traditionnel"
              price:
                type: number
                example: 25.00
              duration:
                type: integer
                example: 45
              image_url:
                type: string
                example: "/uploads/services/manucure.jpg"
    """
    services = Service.query.all()
    return jsonify([service.to_dict() for service in services])


@services_bp.route('/services/<int:id>', methods=['GET'])
def get_service(id):
    """
    Recupere un service par son ID
    ---
    tags:
      - Services
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID du service
    responses:
      200:
        description: Details du service
        schema:
          type: object
          properties:
            id:
              type: integer
            name:
              type: string
            description:
              type: string
            price:
              type: number
            duration:
              type: integer
            image_url:
              type: string
      404:
        description: Service non trouve
    """
    service = Service.query.get_or_404(id)
    return jsonify(service.to_dict())


@services_bp.route('/services', methods=['POST'])
def create_service():
    """
    Cree un nouveau service
    ---
    tags:
      - Services
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - name
            - price
          properties:
            name:
              type: string
              example: "Pose de gel"
            description:
              type: string
              example: "Application de vernis gel semi-permanent"
            price:
              type: number
              example: 35.00
            duration:
              type: integer
              example: 60
            image_url:
              type: string
              example: "/uploads/services/gel.jpg"
    responses:
      201:
        description: Service cree avec succes
      400:
        description: Donnees invalides
    """
    data = request.get_json()

    if not data or not data.get('name') or not data.get('price'):
        return jsonify({'error': 'Le nom et le prix sont requis'}), 400

    service = Service(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        duration=data.get('duration'),
        image_url=data.get('image_url')
    )

    db.session.add(service)
    db.session.commit()

    return jsonify(service.to_dict()), 201


@services_bp.route('/services/<int:id>', methods=['PUT'])
def update_service(id):
    """
    Met a jour un service existant
    ---
    tags:
      - Services
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID du service
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
            description:
              type: string
            price:
              type: number
            duration:
              type: integer
            image_url:
              type: string
    responses:
      200:
        description: Service mis a jour
      404:
        description: Service non trouve
    """
    service = Service.query.get_or_404(id)
    data = request.get_json()

    if data.get('name'):
        service.name = data['name']
    if data.get('description') is not None:
        service.description = data['description']
    if data.get('price'):
        service.price = data['price']
    if data.get('duration') is not None:
        service.duration = data['duration']
    if data.get('image_url') is not None:
        service.image_url = data['image_url']

    db.session.commit()

    return jsonify(service.to_dict())


@services_bp.route('/services/<int:id>', methods=['DELETE'])
def delete_service(id):
    """
    Supprime un service
    ---
    tags:
      - Services
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID du service
    responses:
      200:
        description: Service supprime avec succes
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Service supprime avec succes"
      404:
        description: Service non trouve
    """
    service = Service.query.get_or_404(id)

    db.session.delete(service)
    db.session.commit()

    return jsonify({'message': 'Service supprime avec succes'})
