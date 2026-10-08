import os
class Config:
    SECRET_KEY=os.getenv('SECRET_KEY','dev-only-change-me')
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY','dev-jwt-change-me')
    JWT_ACCESS_TOKEN_EXPIRES=900
    JWT_REFRESH_TOKEN_EXPIRES=2_592_000
    MONGO_URI=os.getenv('MONGO_URI','mongodb://mongo:27017/edunest')
    REDIS_URL=os.getenv('REDIS_URL','redis://redis:6379/0')
    CORS_ORIGINS=os.getenv('CORS_ORIGINS','http://localhost:5173,http://localhost:8443').split(',')
    RATELIMIT_STORAGE_URI=os.getenv('RATELIMIT_STORAGE_URI','memory://')
    TESTING=False
    USE_MEMORY_STORE=os.getenv('USE_MEMORY_STORE','true').lower()=='true'
