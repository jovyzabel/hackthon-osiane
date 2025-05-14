from flask import render_template, redirect, url_for, flash, request
from werkzeug.urls import url_parse
from flask_login import login_user, logout_user, current_user, login_required
from app import db
from app.auth import bp # bp est le Blueprint défini dans app/auth/__init__.py
from app.models import User
# from app.auth.forms import LoginForm # Si vous utilisez WTForms

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated: # current_user vient de Flask-Login
        return redirect(url_for('core.dashboard')) # Rediriger vers le dashboard du blueprint 'core'

    # Si vous n'utilisez pas WTForms, gérez les données POST directement
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember_me = True if request.form.get('remember_me') else False # Optionnel

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            flash('Email ou mot de passe invalide.', 'danger') # 'danger' est une catégorie Bootstrap pour les alertes
            return redirect(url_for('auth.login'))

        login_user(user, remember=remember_me)
        flash('Connexion réussie !', 'success')

        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '': # Sécurité: éviter redirection vers site externe
            next_page = url_for('core.dashboard')
        return redirect(next_page)

    return render_template('auth/login.html', title='Connexion')

@bp.route('/logout')
@login_required # S'assurer que l'utilisateur est connecté pour se déconnecter
def logout():
    logout_user()
    flash('Vous avez été déconnecté.', 'info')
    return redirect(url_for('core.index')) # Rediriger vers la page d'accueil du blueprint 'core'

# Route pour créer un premier utilisateur admin (à utiliser avec précaution ou via une commande CLI)
@bp.route('/register_admin_once', methods=['GET', 'POST']) # Sécurisez ou supprimez cette route après usage
def register_admin_once():
    if User.query.filter_by(role=RoleEnum.ADMIN).first():
         flash('Un admin existe déjà.', 'warning')
         return redirect(url_for('auth.login'))
    if request.method == 'POST':
        # ... logique pour récupérer nom, email, password ...
        nom = request.form.get('nom')
        email = request.form.get('email')
        password = request.form.get('password')
        if not nom or not email or not password:
            flash('Tous les champs sont requis.', 'danger')
            return render_template('auth/register_admin.html', title='Créer Admin')

        user = User(nom=nom, email=email, role=RoleEnum.ADMIN)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        flash('Compte Admin créé avec succès. Veuillez vous connecter.', 'success')
        return redirect(url_for('auth.login'))
    return render_template('auth/register_admin.html', title='Créer Admin') # Créez ce template