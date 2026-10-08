from __future__ import annotations
from copy import deepcopy
from datetime import datetime, timezone
from threading import RLock
from uuid import uuid4

TENANT_COLLECTIONS={'students','staff','classes','attendance','exams','marks','fees','payments','communications','admissions','library','transport','boarding','meals','inventory','health','activities','finance','settings','audit_logs','receipts'}
def now(): return datetime.now(timezone.utc).isoformat()
class MemoryStore:
    def __init__(self): self.data:dict[str,list[dict]]={}; self.lock=RLock()
    def clear(self): self.data.clear()
    def insert(self,collection:str,doc:dict):
        with self.lock:
            value=deepcopy(doc); value.setdefault('_id',str(uuid4())); self.data.setdefault(collection,[]).append(value); return deepcopy(value)
    def find(self,collection:str,school_id:str|None=None,query:str=''):
        rows=self.data.get(collection,[])
        if collection in TENANT_COLLECTIONS:
            if not school_id: return []
            rows=[x for x in rows if x.get('school_id')==school_id and not x.get('deleted_at')]
        q=query.lower().strip()
        if q: rows=[x for x in rows if q in ' '.join(str(v).lower() for v in x.values())]
        return deepcopy(rows)
    def get(self,collection:str,id_:str,school_id:str|None=None):
        return next((x for x in self.find(collection,school_id) if x['_id']==id_),None)
    def update(self,collection:str,id_:str,school_id:str,changes:dict):
        with self.lock:
            for doc in self.data.get(collection,[]):
                if doc['_id']==id_ and doc.get('school_id')==school_id and not doc.get('deleted_at'):
                    doc.update(deepcopy(changes)); return deepcopy(doc)
        return None
store=MemoryStore()
