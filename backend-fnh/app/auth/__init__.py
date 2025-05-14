from flask import Blueprint

bp = Blueprint('auth', __name__)

from app.auth import routes # Importer les routes après la création du blueprint pour éviter les imports circulaires