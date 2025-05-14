# Dans create_app() après app.register_blueprint(core_bp)
@app.context_processor
def inject_current_year():
    return {'current_year': datetime.utcnow().year}
@app.context_processor
def inject_site_name(): # Pour accéder à config.SITE_NAME dans les templates
    return {'config': app.config}