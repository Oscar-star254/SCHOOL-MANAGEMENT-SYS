from functools import wraps
from flask import g, jsonify
from flask_jwt_extended import get_jwt, verify_jwt_in_request
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
ph=PasswordHasher()
def hash_password(value:str)->str:return ph.hash(value)
def verify_password(hashed:str,value:str)->bool:
    try:return ph.verify(hashed,value)
    except VerifyMismatchError:return False
def require_permission(permission:str):
    def decorator(fn):
        @wraps(fn)
        def wrapped(*args,**kwargs):
            verify_jwt_in_request(); claims=get_jwt(); permissions=claims.get('permissions',[])
            if '*' not in permissions and permission not in permissions:return jsonify({'ok':False,'error':{'code':'forbidden','message':'You do not have permission for this action.'}}),403
            g.school_id=claims.get('school_id');g.user_id=claims.get('sub');g.role=claims.get('role')
            return fn(*args,**kwargs)
        return wrapped
    return decorator
