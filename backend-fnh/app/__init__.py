from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from .config import Config # ou from config import Config si config.py est à la racine

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
login_manager.login_view = 'auth.login' # Redirige vers la route de connexion
login_manager.login_message_category = 'info' # Catégorie pour les messages flash de Flask-Login

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.core import bp as core_bp
    app.register_blueprint(core_bp) # Pas de préfixe, pour les routes comme / et /dashboard

    # Pour les erreurs (optionnel mais bien)
    # from app.errors import bp as errors_bp
    # app.register_blueprint(errors_bp)

    return app