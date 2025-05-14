from app import create_app, db
from app.models import User, Enfant # Importer tous les modèles pour les commandes shell

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Enfant': Enfant} # Ajouter d'autres modèles

if __name__ == '__main__':
    app.run(debug=True) # Mettre debug=False en production