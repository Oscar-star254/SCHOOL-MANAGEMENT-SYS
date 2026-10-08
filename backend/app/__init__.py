from flask import Flask,jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .config import Config
from .seed import seed
jwt=JWTManager();limiter=Limiter(key_func=get_remote_address,default_limits=['300 per hour'])
def create_app(config=None):
    app=Flask(__name__);app.config.from_object(Config)
    if config:app.config.update(config)
    jwt.init_app(app);limiter.init_app(app);CORS(app,origins=app.config['CORS_ORIGINS'])
    from .api.auth import bp as auth
    from .api.resources import bp as resources
    from .api.payments import bp as payments
    app.register_blueprint(auth,url_prefix='/api/v1/auth');app.register_blueprint(resources,url_prefix='/api/v1/resources');app.register_blueprint(payments,url_prefix='/api/v1/payments')
    @app.get('/api/v1/health')
    @limiter.exempt
    def health():return {'ok':True,'data':{'service':'edunest-api','status':'healthy'}}
    @app.after_request
    def secure(response):
        response.headers['X-Content-Type-Options']='nosniff';response.headers['X-Frame-Options']='DENY';response.headers['Referrer-Policy']='strict-origin-when-cross-origin';response.headers['Permissions-Policy']='camera=(), microphone=(), geolocation=()';return response
    @app.errorhandler(404)
    def not_found(_):return jsonify({'ok':False,'error':{'code':'not_found','message':'Endpoint not found.'}}),404
    seed()
    return app
