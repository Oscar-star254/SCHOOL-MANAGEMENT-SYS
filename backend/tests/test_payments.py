def h(token,extra=None):return {'Authorization':f'Bearer {token}',**(extra or {})}
def test_mpesa_reconciliation_is_idempotent(client,token_a):
    student=client.get('/api/v1/resources/students?page_size=1',headers=h(token_a)).get_json()['data'][0]
    payload={'transaction_id':'TEST123','account':f"BHA#{student['admission_no']}",'amount':10000}
    first=client.post('/api/v1/payments/mpesa/simulate',headers=h(token_a),json=payload)
    second=client.post('/api/v1/payments/mpesa/simulate',headers=h(token_a),json=payload)
    assert first.status_code==201 and second.status_code==200
    assert first.get_json()['data']['_id']==second.get_json()['data']['_id']
    assert first.get_json()['data']['status']=='reconciled'
def test_unmatched_payment_is_queued(client,token_a):
    response=client.post('/api/v1/payments/mpesa/simulate',headers=h(token_a),json={'transaction_id':'LOST1','account':'BHA#UNKNOWN','amount':8500})
    assert response.get_json()['data']['status']=='unmatched'
