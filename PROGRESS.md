# EduNest Build Progress

Checked items are implemented and verified. Unchecked items remain outstanding.

## A. Foundation
- [x] Repository scaffold and architecture
- [x] Token-based light/dark design system
- [x] Reusable UI component library
- [x] Full logo, symbol, monochrome, favicon, PWA artwork
- [x] Router and responsive app shells
- [x] Stage verification and commit

## B. Backend core
- [x] Flask application factory and `/api/v1`
- [ ] Mongo tenant middleware and indexes
- [ ] JWT access/refresh, lockout, password reset, 2FA option
- [x] Central RBAC permission decorator
- [x] CRUD foundations, envelopes, validation, pagination/export
- [x] Audit and soft-delete foundations
- [ ] Celery/Redis jobs, OpenAPI and secure headers
- [ ] Tenant-isolation tests
- [ ] Stage verification and commit

## C. Frontend core
- [x] Query/API/auth providers
- [x] Permission-aware routing and `<Can>`
- [x] Command palette and global search
- [x] Notifications/toasts and dialogs
- [x] Offline queue for attendance and marks
- [x] Responsive table/card patterns and accessible states
- [x] Stage verification and commit

## D. Public, onboarding and platform
- [x] Marketing landing and SEO/Open Graph
- [x] Pricing toggle, FAQs and demo/contact form
- [x] Privacy, terms and Kenya data-protection pages
- [x] Login, forgot/reset password
- [x] Multi-step school registration and trial
- [x] Platform overview and charts
- [x] School management, suspension and impersonation
- [ ] Plans, billing, users, support, settings, announcements, feature flags
- [x] Stage verification and commit

## E. Core school operations
- [x] School admin dashboard
- [ ] Students and 360° profiles
- [ ] Admissions numbering, guardians, siblings, transfers
- [ ] Bulk import/promotion/graduation and student IDs
- [ ] Staff profiles and allocation
- [ ] Classes, streams, subjects and timetable clash detection
- [ ] Stage verification and commit

## F. Attendance and academics
- [ ] Student/staff daily and lesson attendance
- [ ] Mobile tap attendance and absence communication
- [ ] Exams and offline marks grid
- [ ] Grade/rank/analysis engine
- [ ] Publish controls and comments
- [ ] Branded report-card PDF and bulk generation
- [ ] Stage verification and commit

## G. Fees, M-Pesa and messaging
- [ ] Fee structures, aid, invoices and balances
- [ ] Payments, cancellations, receipts and statements
- [ ] Arrears, carry-forward, reminders and defaulters
- [ ] Daraja C2B/STK adapter and encrypted configuration
- [ ] Idempotent reconciliation and unmatched queue
- [ ] Local Daraja simulator, receipt and mock SMS
- [ ] Communication center across SMS/email/in-app
- [ ] Stage verification and commit

## H. Role portals
- [ ] Parent portal and child switching
- [ ] Parent results, fees/STK, attendance, notices and messaging
- [ ] Student portal
- [ ] Teacher workspace
- [ ] Stage verification and commit

## I. Extended school modules
- [ ] Admissions
- [ ] Library
- [ ] Transport
- [ ] Boarding
- [ ] Meals
- [ ] Inventory
- [ ] Health with restricted access
- [ ] Activities and events
- [ ] Stage verification and commit

## J. Business operations
- [ ] HR leave, attendance and payroll
- [ ] Payslip PDFs
- [ ] Finance, budgets, vendors and petty cash
- [ ] Analytics with filters and export
- [ ] Security, permission editor and audit views
- [ ] School academic/brand/notification/data settings
- [ ] Stage verification and commit

## K. Data, testing and operations
- [x] Two-school 300+ student seed
- [x] One seeded login per role
- [ ] Backend pytest suite
- [x] Frontend Vitest suite
- [x] Dockerfiles, Compose, Mongo, Redis, worker, Nginx
- [x] CI and `.env.example`
- [x] README quick start and credentials
- [x] Deployment/backup/SSL/Sentry guide
- [x] User manual outline
- [ ] Production hardening pass
- [ ] Stage verification and commit

## Final verification
- [ ] `docker compose up` cleanly boots the full stack
- [ ] Seed and every role login verified
- [ ] Every module manually exercised
- [ ] Full sandbox M-Pesa flow verified
- [ ] Report cards and receipts PDFs verified
- [ ] Pytest, Vitest, isolation, reconciliation and frontend build pass
- [ ] 375px layout, dark mode and PWA installability verified
- [ ] Clean-clone README quick start verified
