from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin # Pour la gestion des utilisateurs avec Flask-Login
from app import db, login_manager # db et login_manager de app/__init__.py
import enum

# Nécessaire pour Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class RoleEnum(enum.Enum):
    PARENT = "parent"
    SECRETAIRE = "secretaire"
    ANALYSTE = "analyste"
    ADMIN = "admin"

class StatutDossierEnum(enum.Enum):
    NOUVEAU = "Nouveau"
    EN_COURS = "En cours"
    INCOMPLET = "Incomplet"
    ACCEPTE = "Accepté"
    REJETE = "Rejeté"
    CLOTURE = "Clôturé"

class User(UserMixin, db.Model): # UserMixin ajoute les propriétés nécessaires pour Flask-Login
    __tablename__ = 'utilisateurs' # Nom explicite de la table
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    mot_de_passe_hash = db.Column(db.String(255), nullable=False)
    # Utilisation de Enum pour le rôle
    role = db.Column(db.Enum(RoleEnum), nullable=False, default=RoleEnum.PARENT)
    date_creation = db.Column(db.DateTime, default=datetime.utcnow)

    # Relations (si un utilisateur interne crée un dossier)
    dossiers_crees = db.relationship('Enfant', foreign_keys='Enfant.utilisateur_createur_id', backref='createur_interne', lazy='dynamic')
    historiques_actions = db.relationship('HistoriqueDossier', backref='auteur_action', lazy='dynamic')
    documents_televerses = db.relationship('DocumentDossier', backref='televerseur', lazy='dynamic')


    def set_password(self, password):
        self.mot_de_passe_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.mot_de_passe_hash, password)

    def __repr__(self):
        return f'<User {self.nom} ({self.email})>'

class Enfant(db.Model):
    __tablename__ = 'enfants'
    id = db.Column(db.Integer, primary_key=True)
    nom_enfant = db.Column(db.String(100), nullable=False)
    prenom_enfant = db.Column(db.String(100), nullable=False)
    date_naissance = db.Column(db.Date, nullable=False)
    sexe = db.Column(db.String(10), nullable=False) # 'Masculin', 'Féminin'
    commune_residence = db.Column(db.String(255), nullable=True)
    etablissement_souhaite = db.Column(db.String(50), nullable=True) # 'WISI', 'TARII', 'Autre'

    nom_parent_tuteur = db.Column(db.String(255), nullable=False)
    telephone_parent_tuteur = db.Column(db.String(50), nullable=False)
    email_parent_tuteur = db.Column(db.String(255), nullable=False, index=True) # index pour recherche rapide

    statut_dossier = db.Column(db.Enum(StatutDossierEnum), nullable=False, default=StatutDossierEnum.NOUVEAU)
    diagnostic_bilan_observations = db.Column(db.Text, nullable=True)
    
    date_creation = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    derniere_mise_a_jour = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Clé étrangère vers l'utilisateur interne qui a créé le dossier (si applicable)
    utilisateur_createur_id = db.Column(db.Integer, db.ForeignKey('utilisateurs.id'), nullable=True)
    createur_role = db.Column(db.String(50), nullable=True) # 'parent' ou le rôle de l'utilisateur interne

    # Relations
    documents = db.relationship('DocumentDossier', backref='enfant', lazy='dynamic', cascade="all, delete-orphan")
    historique = db.relationship('HistoriqueDossier', backref='enfant_concerne', lazy='dynamic', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Enfant {self.prenom_enfant} {self.nom_enfant} (ID: {self.id})>'

class DocumentDossier(db.Model):
    __tablename__ = 'documents_dossier'
    id = db.Column(db.Integer, primary_key=True)
    enfant_id = db.Column(db.Integer, db.ForeignKey('enfants.id'), nullable=False)
    nom_fichier_original = db.Column(db.String(255), nullable=False)
    nom_fichier_stocke = db.Column(db.String(255), nullable=False, unique=True) # Nom unique (ex: UUID + ext)
    type_document = db.Column(db.String(100), nullable=True) # 'acte_naissance', 'bilan_ophtalmo', etc.
    date_televersement = db.Column(db.DateTime, default=datetime.utcnow)
    televerse_par_utilisateur_id = db.Column(db.Integer, db.ForeignKey('utilisateurs.id'), nullable=True)

    def __repr__(self):
        return f'<Document {self.nom_fichier_original} pour Enfant ID {self.enfant_id}>'

class HistoriqueDossier(db.Model):
    __tablename__ = 'historique_dossiers'
    id = db.Column(db.Integer, primary_key=True)
    enfant_id = db.Column(db.Integer, db.ForeignKey('enfants.id'), nullable=False)
    utilisateur_id = db.Column(db.Integer, db.ForeignKey('utilisateurs.id'), nullable=True) # Utilisateur interne ayant fait l'action
    action = db.Column(db.String(255), nullable=False)
    commentaire = db.Column(db.Text, nullable=True)
    ancien_statut = db.Column(db.String(50), nullable=True)
    nouveau_statut = db.Column(db.String(50), nullable=True)
    date_action = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Historique ID {self.id} pour Enfant ID {self.enfant_id} - Action: {self.action}>'