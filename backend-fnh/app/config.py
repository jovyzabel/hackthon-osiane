import os
from dotenv import load_dotenv # Optionnel, pour charger les variables d'environnement d'un .env

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env')) # Charger .env du répertoire racine

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'une-cle-secrete-tres-difficile-a-deviner'
    # Configuration MySQL (ou PostgreSQL)
    # Exemple MySQL: mysql+pymysql://user:password@host/dbname
    # Exemple PostgreSQL: postgresql+psycopg2://user:password@host/dbname
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+pymysql://votre_utilisateur_mysql:votre_mot_de_passe_mysql@localhost/fhn_hackathon'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(basedir, 'static', 'uploads') # Chemin vers le dossier d'uploads
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5 MB taille max pour upload
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}
    SITE_URL = os.environ.get('SITE_URL') or 'http://127.0.0.1:5000' # Pour les templates