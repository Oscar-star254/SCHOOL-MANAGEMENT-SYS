# Production deployment guide

## Domain and TLS
Point `app.example.ac.ke` to the load balancer, set `CORS_ORIGINS` to the exact HTTPS origins, and terminate TLS with a managed certificate or Let's Encrypt. Redirect HTTP to HTTPS and enable HSTS after validating every subdomain.

## Secrets and integrations
Generate independent random Flask and JWT secrets. Store Daraja, Africa's Talking, SMTP, Sentry and credential-encryption keys in the deployment secret manager, never in images or Git. Start integrations in sandbox mode, verify callbacks, then rotate to production credentials.

## MongoDB Atlas
Use a dedicated Atlas project, private networking where available, least-privilege database credentials and IP allow lists. Enable continuous cloud backups, point-in-time restore and weekly restore drills. Create compound indexes beginning with `school_id` for tenant-owned query paths.

## Redis and workers
Use a persistent managed Redis service with TLS and authentication. Run at least two Celery worker replicas, configure dead-letter monitoring, and alert on queue age and repeated retries.

## Observability
Set `SENTRY_DSN` in API, worker and frontend deployments. Scrub passwords, tokens, health records and payment credentials. Monitor request errors, worker failures, callback latency, database saturation and tenant boundary denials. Retain immutable audit records according to school policy.

## Releases
Build immutable images in CI, run frontend and backend suites, scan dependencies and images, apply database/index migrations, deploy to staging, exercise login and payment sandbox flows, then use a rolling production deployment with an explicit rollback image.
