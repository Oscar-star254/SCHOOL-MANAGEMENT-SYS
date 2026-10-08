def h(token):return {'Authorization':f'Bearer {token}'}
def test_school_cannot_read_another_school_records(client,token_a,token_b):
    created=client.post('/api/v1/resources/students',headers=h(token_a),json={'name':'Tenant A Learner','school_id':'school-lakeview'}).get_json()['data']
    assert created['school_id']=='school-baraka'
    names=[x['name'] for x in client.get('/api/v1/resources/students?q=Tenant+A',headers=h(token_b)).get_json()['data']]
    assert 'Tenant A Learner' not in names
def test_school_cannot_update_another_school_record(client,token_a,token_b):
    doc=client.post('/api/v1/resources/students',headers=h(token_a),json={'name':'Protected Learner'}).get_json()['data']
    response=client.patch(f"/api/v1/resources/students/{doc['_id']}",headers=h(token_b),json={'name':'Compromised'})
    assert response.status_code==404
