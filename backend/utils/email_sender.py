"""
Module d'envoi d'emails (optionnel).
Nécessite Flask-Mail et une configuration SMTP.
"""
import os


def send_email(to, subject, body):
    """
    Envoie un email.

    Note: Cette fonction est un placeholder.
    Pour l'activer, installez Flask-Mail et configurez les variables SMTP dans .env

    Args:
        to (str): Adresse email du destinataire
        subject (str): Sujet de l'email
        body (str): Corps de l'email

    Returns:
        bool: True si l'envoi a réussi, False sinon
    """
    # Configuration requise dans .env:
    # MAIL_SERVER=smtp.gmail.com
    # MAIL_PORT=587
    # MAIL_USERNAME=votre_email@gmail.com
    # MAIL_PASSWORD=votre_mot_de_passe

    mail_server = os.getenv('MAIL_SERVER')
    mail_username = os.getenv('MAIL_USERNAME')

    if not mail_server or not mail_username:
        print(f"[Email non configuré] To: {to}, Subject: {subject}")
        return False

    # TODO: Implémenter l'envoi réel avec Flask-Mail
    # from flask_mail import Message
    # msg = Message(subject, recipients=[to], body=body)
    # mail.send(msg)

    print(f"[Email envoyé] To: {to}, Subject: {subject}")
    return True


def send_contact_notification(contact_data):
    """
    Envoie une notification pour un nouveau message de contact.

    Args:
        contact_data (dict): Données du contact (name, email, message)

    Returns:
        bool: True si l'envoi a réussi
    """
    admin_email = os.getenv('ADMIN_EMAIL', 'admin@example.com')

    subject = f"Nouveau message de contact - {contact_data.get('name')}"
    body = f"""
    Nouveau message reçu via le formulaire de contact:

    Nom: {contact_data.get('name')}
    Email: {contact_data.get('email')}
    Téléphone: {contact_data.get('phone', 'Non renseigné')}

    Message:
    {contact_data.get('message')}
    """

    return send_email(admin_email, subject, body)
