import pytest
from app import create_app
from app.seed import seed
@pytest.fixture()
def app():
    app=create_app({'TESTING':True,'JWT_SECRET_KEY':'tests','RATELIMIT_ENABLED':False});seed(reset=True);return app
@pytest.fixture()
def client(app):return app.test_client()
def login(client,email):return client.post('/api/v1/auth/login',json={'email':email,'password':'Demo@123'}).get_json()['data']['access_token']
@pytest.fixture()
def token_a(client):return login(client,'schooladmin@bha.demo')
@pytest.fixture()
def token_b(client):return login(client,'schooladmin@ljs.demo')
