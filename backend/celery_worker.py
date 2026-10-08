from celery import Celery
from app.config import Config
celery=Celery('edunest',broker=Config.REDIS_URL,backend=Config.REDIS_URL)
@celery.task
def deliver_message(message_id):return {'message_id':message_id,'status':'delivered'}
