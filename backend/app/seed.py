from random import Random
from .store import store,now
from .security import hash_password
ROLES=['School Admin','Principal','Deputy Principal','Accountant','Teacher','Class Teacher','Librarian','Nurse','Transport Manager','Parent','Student']
def seed(reset=False):
    if store.data and not reset:return
    if reset:store.clear()
    schools=[{'_id':'school-baraka','name':'Baraka Hills Academy','code':'BHA','county':'Kajiado','plan':'Professional','status':'active'},{'_id':'school-lakeview','name':'Lakeview Junior School','code':'LJS','county':'Kisumu','plan':'Standard','status':'trial'}]
    for x in schools:store.insert('schools',x)
    users=[{'_id':'user-super','email':'superadmin@edunest.co.ke','name':'Amina Hassan','role':'Super Admin','school_id':None,'permissions':['*']}]
    for school in schools:
        slug=school['code'].lower()
        for role in ROLES:
            key=role.lower().replace(' ','')
            users.append({'email':f'{key}@{slug}.demo','name':f'Demo {role}','role':role,'school_id':school['_id'],'permissions':['*'] if role in ('School Admin','Principal') else ['records.read','records.create','records.update']})
    for user in users:store.insert('users',{**user,'password_hash':hash_password('Demo@123'),'failed_logins':0,'created_at':now()})
    first=['Amani','Baraka','Imani','Taji','Zuri','Jabali','Malaika','Nia','Kamau','Wangari'];last=['Wanjiku','Otieno','Kiptoo','Mwangi','Kamau','Oduor','Hassan','Njeri','Omondi','Chebet'];rng=Random(2026)
    for school in schools:
        for i in range(1,161):
            name=f'{rng.choice(first)} {rng.choice(last)}';store.insert('students',{'school_id':school['_id'],'name':name,'admission_no':f"ADM-2026-{i:04d}",'class':f"Grade {rng.randint(4,9)}{rng.choice('AB')}",'guardian':f'{rng.choice(first)} {rng.choice(last)}','status':'Active','created_at':now()})
    return {'schools':len(schools),'users':len(users),'students':320}
