from flask import Blueprint, request, jsonify
from extensions import db
from models.contact import Contact
import re

contact_bp = Blueprint('contact', __name__)


def is_valid_email(email):
    """Verifie si l'email est valide."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def is_valid_phone(phone):
    """Verifie si le numero de telephone est valide (format francais)."""
    if not phone:
        return True
    pattern = r'^(\+33|0)[1-9](\d{2}){4}$'
    return re.match(pattern, phone.replace(' ', '').replace('.', '').replace('-', '')) is not None


@contact_bp.route('/contact', methods=['POST'])
def send_contact():
    """
    Envoie un message de contact
    ---
    tags:
      - Contact
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - name
            - email
            - message
          properties:
            name:
              type: string
              example: "Marie Dupont"
            email:
              type: string
              example: "marie@example.com"
            phone:
              type: string
              example: "0612345678"
            message:
              type: string
              example: "Bonjour, je souhaite prendre rendez-vous..."
    responses:
      201:
        description: Message envoye avec succes
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Message envoye avec succes"
            contact:
              type: object
      400:
        description: Donnees invalides
    """
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Donnees manquantes'}), 400

    if not data.get('name') or not data.get('name').strip():
        return jsonify({'error': 'Le nom est requis'}), 400
    if not data.get('email'):
        return jsonify({'error': "L'email est requis"}), 400
    if not data.get('message') or not data.get('message').strip():
        return jsonify({'error': 'Le message est requis'}), 400

    if not is_valid_email(data['email']):
        return jsonify({'error': "Format d'email invalide"}), 400

    if data.get('phone') and not is_valid_phone(data['phone']):
        return jsonify({'error': 'Format de telephone invalide'}), 400

    contact = Contact(
        name=data['name'].strip(),
        email=data['email'].strip(),
        phone=data.get('phone', '').strip() or None,
        message=data['message'].strip()
    )

    db.session.add(contact)
    db.session.commit()

    return jsonify({
        'message': 'Message envoye avec succes',
        'contact': contact.to_dict()
    }), 201


@contact_bp.route('/contacts', methods=['GET'])
def get_contacts():
    """
    Liste tous les messages de contact (admin)
    ---
    tags:
      - Contact
    parameters:
      - name: status
        in: query
        type: string
        required: false
        enum: [new, read, replied]
        description: Filtrer par statut
    responses:
      200:
        description: Liste des messages
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
              name:
                type: string
              email:
                type: string
              phone:
                type: string
              message:
                type: string
              status:
                type: string
                enum: [new, read, replied]
              created_at:
                type: string
      400:
        description: Statut invalide
    """
    status = request.args.get('status')

    if status:
        if status not in Contact.STATUSES:
            return jsonify({'error': f'Statut invalide. Valeurs acceptees: {Contact.STATUSES}'}), 400
        contacts = Contact.query.filter_by(status=status).order_by(Contact.created_at.desc()).all()
    else:
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()

    return jsonify([contact.to_dict() for contact in contacts])


@contact_bp.route('/contacts/<int:id>', methods=['PUT'])
def update_contact_status(id):
    """
    Met a jour le statut d'un message (admin)
    ---
    tags:
      - Contact
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID du message
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - status
          properties:
            status:
              type: string
              enum: [new, read, replied]
              example: "read"
    responses:
      200:
        description: Statut mis a jour
      400:
        description: Statut invalide
      404:
        description: Message non trouve
    """
    contact = Contact.query.get_or_404(id)
    data = request.get_json()

    if not data or not data.get('status'):
        return jsonify({'error': 'Le statut est requis'}), 400

    if data['status'] not in Contact.STATUSES:
        return jsonify({'error': f'Statut invalide. Valeurs acceptees: {Contact.STATUSES}'}), 400

    contact.status = data['status']
    db.session.commit()

    return jsonify(contact.to_dict())


@contact_bp.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    """
    Supprime un message de contact (admin)
    ---
    tags:
      - Contact
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID du message
    responses:
      200:
        description: Message supprime avec succes
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Message supprime avec succes"
      404:
        description: Message non trouve
    """
    contact = Contact.query.get_or_404(id)

    db.session.delete(contact)
    db.session.commit()

    return jsonify({'message': 'Message supprime avec succes'})
