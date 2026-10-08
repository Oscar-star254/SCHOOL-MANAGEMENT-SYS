from datetime import datetime,timezone
from io import BytesIO
from flask import Blueprint,g,request,send_file
from reportlab.lib import colors
from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle
from ..security import require_permission
from ..store import store
bp=Blueprint('payments',__name__,url_prefix='/payments')
def res(data=None,status=200,error=None):return ({'ok':error is None,'data':data,'error':error},status)
def reconcile(body):
    external=str(body.get('transaction_id') or body.get('TransID') or '')
    if not external:return res(error={'code':'validation','message':'transaction_id is required.'},status=422)
    existing=next((p for p in store.find('payments',g.school_id) if p['external_id']==external),None)
    if existing:return res(existing)
    admission=str(body.get('account') or body.get('BillRefNumber') or '').split('#')[-1];student=next((s for s in store.find('students',g.school_id) if s.get('admission_no')==admission),None)
    amount=float(body.get('amount') or body.get('TransAmount') or 0);status='reconciled' if student else 'unmatched'
    payment=store.insert('payments',{'school_id':g.school_id,'external_id':external,'student_id':student and student['_id'],'admission_no':admission,'amount':amount,'status':status,'method':'M-Pesa','created_at':datetime.now(timezone.utc).isoformat()})
    if student:
        receipt=store.insert('receipts',{'school_id':g.school_id,'payment_id':payment['_id'],'student_id':student['_id'],'number':f"RCT-{external}",'amount':amount,'created_at':payment['created_at']})
        store.insert('communications',{'school_id':g.school_id,'channel':'sms','status':'delivered','body':f"Payment received: KSh {amount:,.0f}. Student: {student['name']}. Receipt: {receipt['number']}"})
        payment['receipt_id']=receipt['_id'];store.update('payments',payment['_id'],g.school_id,{'receipt_id':receipt['_id']})
    return res(payment,status=201)
@bp.post('/mpesa/simulate')
@require_permission('records.create')
def simulate():return reconcile(request.get_json(silent=True) or {})
@bp.post('/mpesa/c2b/confirmation')
@require_permission('records.create')
def confirmation():return reconcile(request.get_json(silent=True) or {})
@bp.post('/stk-push')
@require_permission('records.create')
def stk():
    body=request.get_json(silent=True) or {};key=request.headers.get('Idempotency-Key')
    if not key:return res(error={'code':'idempotency_required','message':'Idempotency-Key header is required.'},status=422)
    return reconcile({'transaction_id':f'STK-{key}','account':body.get('account'),'amount':body.get('amount')})
@bp.get('/receipts/<receipt_id>.pdf')
@require_permission('records.read')
def receipt_pdf(receipt_id):
    receipt=store.get('receipts',receipt_id,g.school_id)
    if not receipt:return res(error={'code':'not_found','message':'Receipt not found.'},status=404)
    student=store.get('students',receipt['student_id'],g.school_id);buf=BytesIO();doc=SimpleDocTemplate(buf,pagesize=A5,rightMargin=18*mm,leftMargin=18*mm,topMargin=16*mm,bottomMargin=16*mm);styles=getSampleStyleSheet();story=[Paragraph('<b><font color="#4F46E5" size="20">EduNest</font></b>',styles['Title']),Paragraph('BARAKA HILLS ACADEMY',styles['Heading2']),Paragraph('OFFICIAL FEE RECEIPT',styles['Heading3']),Spacer(1,8*mm),Table([['Receipt',receipt['number']],['Student',student['name']],['Admission no.',student['admission_no']],['Amount',f"KSh {receipt['amount']:,.2f}"],['Method','M-Pesa']],colWidths=[38*mm,78*mm],style=TableStyle([('BACKGROUND',(0,0),(0,-1),colors.HexColor('#F1F5F9')),('TEXTCOLOR',(0,0),(0,-1),colors.HexColor('#64748B')),('GRID',(0,0),(-1,-1),.5,colors.HexColor('#E2E8F0')),('PADDING',(0,0),(-1,-1),8)])),Spacer(1,12*mm),Paragraph('Thank you. This receipt was generated securely by EduNest.',styles['BodyText']),Spacer(1,20*mm),Paragraph('<font color="#64748B" size="8">Powered by EduNest · The operating system for your school.</font>',styles['BodyText'])];doc.build(story);buf.seek(0);return send_file(buf,mimetype='application/pdf',download_name=f"{receipt['number']}.pdf")
