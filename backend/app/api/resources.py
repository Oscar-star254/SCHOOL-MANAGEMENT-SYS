from datetime import datetime,timezone
from flask import Blueprint,g,request
from ..security import require_permission
from ..store import TENANT_COLLECTIONS,store
bp=Blueprint('resources',__name__,url_prefix='/resources')
ALLOWED=TENANT_COLLECTIONS-{'audit_logs','payments','receipts'}
def response(data=None,status=200,error=None,meta=None):return ({'ok':error is None,'data':data,'meta':meta or {},'error':error},status)
def audit(action,resource,id_):store.insert('audit_logs',{'school_id':g.school_id,'action':action,'resource':resource,'resource_id':id_,'actor_id':g.user_id,'created_at':datetime.now(timezone.utc).isoformat()})
def valid(resource):return resource in ALLOWED
@bp.get('/<resource>')
@require_permission('records.read')
def list_records(resource):
    if not valid(resource):return response(error={'code':'not_found','message':'Unknown resource.'},status=404)
    page=max(int(request.args.get('page',1)),1);size=min(max(int(request.args.get('page_size',25)),1),100);rows=store.find(resource,g.school_id,request.args.get('q',''));start=(page-1)*size
    return response(rows[start:start+size],meta={'page':page,'page_size':size,'total':len(rows)})
@bp.post('/<resource>')
@require_permission('records.create')
def create_record(resource):
    if not valid(resource):return response(error={'code':'not_found','message':'Unknown resource.'},status=404)
    body=request.get_json(silent=True) or {};body.pop('school_id',None);body.update({'school_id':g.school_id,'created_by':g.user_id,'created_at':datetime.now(timezone.utc).isoformat(),'updated_at':datetime.now(timezone.utc).isoformat()});doc=store.insert(resource,body);audit('record.create',resource,doc['_id']);return response(doc,status=201)
@bp.patch('/<resource>/<id_>')
@require_permission('records.update')
def update_record(resource,id_):
    body=request.get_json(silent=True) or {};body.pop('school_id',None);body.update({'updated_by':g.user_id,'updated_at':datetime.now(timezone.utc).isoformat()});doc=store.update(resource,id_,g.school_id,body)
    if not doc:return response(error={'code':'not_found','message':'Record not found.'},status=404)
    audit('record.update',resource,id_);return response(doc)
@bp.delete('/<resource>/<id_>')
@require_permission('records.delete')
def delete_record(resource,id_):
    doc=store.update(resource,id_,g.school_id,{'deleted_at':datetime.now(timezone.utc).isoformat(),'deleted_by':g.user_id})
    if not doc:return response(error={'code':'not_found','message':'Record not found.'},status=404)
    audit('record.delete',resource,id_);return response({'id':id_,'deleted':True})
