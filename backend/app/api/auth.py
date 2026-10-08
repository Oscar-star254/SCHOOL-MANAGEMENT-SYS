from datetime import datetime,timezone
from flask import Blueprint,request
from flask_jwt_extended import create_access_token,create_refresh_token,get_jwt_identity,jwt_required
from ..store import store
from ..security import verify_password
bp=Blueprint('auth',__name__,url_prefix='/auth')
def envelope(data=None,status=200,error=None):return ({'ok':error is None,'data':data,'error':error},status)
@bp.post('/login')
def login():
    body=request.get_json(silent=True) or {};email=str(body.get('email','')).lower();password=str(body.get('password',''))
    user=next((u for u in store.find('users') if u['email'].lower()==email),None)
    if not user or not verify_password(user['password_hash'],password):return envelope(error={'code':'invalid_credentials','message':'Email or password is incorrect.'},status=401)
    claims={'school_id':user.get('school_id'),'role':user['role'],'permissions':user['permissions'],'name':user['name']}
    access=create_access_token(identity=user['_id'],additional_claims=claims);refresh=create_refresh_token(identity=user['_id'],additional_claims=claims)
    store.insert('audit_logs',{'school_id':user.get('school_id'),'action':'auth.login','actor_id':user['_id'],'ip':request.remote_addr,'created_at':datetime.now(timezone.utc).isoformat()})
    return envelope({'access_token':access,'refresh_token':refresh,'user':{k:user.get(k) for k in ('_id','name','email','role','school_id')}})
@bp.post('/refresh')
@jwt_required(refresh=True)
def refresh():return envelope({'access_token':create_access_token(identity=get_jwt_identity())})
