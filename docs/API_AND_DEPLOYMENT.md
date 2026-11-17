# MindSutra API & Deployment Specification

## REST API Endpoints (Spring Boot `/api/v1`)
- `POST /api/v1/auth/register` — Register user with BCrypt password hashing & default preferences.
- `POST /api/v1/auth/login` — Authenticate and return signed JWT token.
- `GET /api/v1/public/sessions?category=&lang=&level=` — Paginated meditation catalog.
- `POST /api/v1/ai/assistant` — Proxies validated user prompt to Python FastAPI AI service.
- `GET /api/v1/users/me/export` — GDPR/privacy-compliant JSON export of user profile, progress, and journal.
- `DELETE /api/v1/users/me` — Permanent cascading account deletion.
- `GET /api/v1/admin/analytics` — Aggregated platform metrics (`ROLE_ADMIN` required).

## Production Deployment Checklist
1. Terminate TLS/HTTPS via Nginx or AWS ALB.
2. Store audio assets in private S3/GCS buckets and serve via signed short-lived CDN URLs.
3. Rotate `JWT_SECRET` and `AI_INTERNAL_API_KEY` via secret manager (AWS Secrets Manager / Vault).
4. Enable MySQL automated daily backups and point-in-time recovery.
