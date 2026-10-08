FROM python:3.13-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
RUN addgroup --system edunest && adduser --system --ingroup edunest edunest
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn==23.0.0
COPY . .
USER edunest
EXPOSE 5000
CMD ["gunicorn","--bind","0.0.0.0:5000","--workers","2","--threads","4","wsgi:app"]
