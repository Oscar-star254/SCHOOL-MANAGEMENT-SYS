# EduNest Product Specification

## Product
EduNest is an all-in-one, multi-school SaaS operating system for Kenyan schools. It provides one identity system, one tenant-aware database, granular role-based dashboards, mobile-first school operations, a public marketing website, and a platform-owner Super Admin console.

## Delivery protocol
1. Maintain this specification and `PROGRESS.md`; tick work only after implementation and verification.
2. Implement in stages: scaffold/design/logo; backend core; frontend core; public/onboarding/platform; school operations; attendance/academics; fees/M-Pesa/SMS; portals; extended school modules; HR/finance/analytics/comms; seed/tests/hardening/containers/docs.
3. Verify relevant tests and production builds after broad changes. The Figma Make host owns the development server and hot reload.
4. No placeholder copy, lorem ipsum, inert primary actions, or external-service-only flows.
5. External integrations use environment configuration with offline mock modes.
6. Finish with a full verification pass across roles and core module flows.

## Technology
- Frontend: React, Vite, React Router Data Mode, Tailwind CSS, TanStack Query, React Hook Form, Zod, Recharts, Lucide, Motion, toast notifications, PWA/offline queues for attendance and marks.
- Backend target: Flask application factory and blueprints, JWT, Marshmallow, PyMongo, CORS, Limiter, Celery and Redis.
- Data: MongoDB, one database with tenant-scoped documents.
- Documents: ReportLab PDFs for report cards, receipts, statements, ID cards, and payslips.
- Integrations: Daraja C2B/STK, Africa's Talking, SMTP, and WhatsApp interface; all with local sandbox modes.
- Operations target: Docker Compose, production containers, Nginx, CI, environment templates.

## Architecture and security
- Every school-owned document has `school_id`, assigned from the authenticated identity and never accepted from client input. Central tenant enforcement and compound indexes are mandatory.
- Roles: Super Admin, School Admin, Principal, Deputy Principal, Accountant, Teacher, Class Teacher, Librarian, Nurse, Transport Manager, Parent, Student.
- Granular permissions use a permissions collection, endpoint permission decorators, and frontend `<Can permission>` guards. Teachers have no financial access by default.
- Audit every login and mutation with actor, IP, timestamp, and history. Support soft delete, creator/updater metadata, pagination, search, filters, sort, CSV/PDF export.
- Password hashing, short access plus refresh tokens, lockout/rate limiting, allow-listed CORS, validation, secure headers, OTP resets, optional admin 2FA, and encrypted school credentials.
- Versioned `/api/v1` REST envelopes, OpenAPI documentation, and payment idempotency keys.
- Enforce subscription limits for student counts and module access.

## Branding and design system
- Original logo: open-book pages forming a nest/roof arc with a small gold rising star; indigo-to-violet symbol, gold accent, EduNest wordmark and “The operating system for your school.”
- Deliver full, symbol, white versions, favicon, and PWA assets under `frontend/public/brand/` in the target monorepo; in the hosted scaffold assets live under `public/brand/`.
- Calm premium interface inspired by Linear/Stripe with educational warmth. Indigo/violet primary, gold accent, semantic success/danger/info, slate neutrals, saved light/dark preference, and school brand theming.
- Plus Jakarta Sans headings and Inter body. Rounded cards, layered shadows, gradient stats, badges, avatars, drawers, modals, tabs, breadcrumbs, toasts, command palette, subtle motion, consistent charts.
- Reusable primitives include Button, Input, Select, DataTable/responsive cards, Card, StatCard, Modal, Drawer, Tabs, Badge, Avatar, EmptyState, Skeleton, Stepper, chart wrappers, FileUpload, and DatePicker.
- Mobile bottom navigation, collapsible desktop sidebar, responsive list cards, WCAG AA contrast/focus, loading/empty/error states, and confirmation for destructive actions.

## Public experience
- Landing page with product dashboard preview, free-trial/demo CTAs, module feature grid, role sections, M-Pesa highlight, monthly/termly pricing, FAQ, demo/contact form, and legal footer.
- Pricing: Starter KSh 1,500/month (100 students), Standard KSh 4,000 (500), Professional KSh 8,000 (1,500), Enterprise custom.
- Privacy, Terms, and Kenya Data Protection Act 2019-aligned data protection content. SEO and Open Graph metadata.
- School self-registration: school identity, branding, terms/grading template, first admin, plan, and 14-day trial.

## Platform console
- KPIs for active/trial/suspended schools, students, teachers, MRR, growth, usage and revenue.
- School create/edit/suspend/impersonation with audit; plans, subscription billing, users, support, platform settings, announcements, and plan feature flags.

## School dashboard
- Time-aware greeting; student, teacher, fee collection and attendance KPIs; enrollment, fee target and attendance charts; events, activity, quick actions, approvals, and defaulters.

## School modules
1. Authentication and onboarding: sign in, reset, registration wizard, 14-day trial.
2. Students: tabbed 360° profile, ADM-YYYY-#### numbers, guardians/siblings, transfers, promotion, graduation, import validation, ID PDF.
3. Staff/HR: profiles, roles, subjects, workload, attendance, leave approval, payroll, payslips.
4. Classes: classes/streams/subjects, teacher allocation, clash-aware timetable.
5. Academics: term exams, offline marks grid, totals/averages/grades/points/positions/ranks, comments, publish controls, analysis, branded bulk report cards.
6. Attendance: daily/lesson student and staff attendance, touch controls, absentee reports, configurable parent SMS.
7. Fees: structures, discounts/aid, invoices, partial payments, receipts/statements, balances/arrears/carry-forward, reminders, defaulters, cash/bank, approval-based cancellation.
8. M-Pesa: C2B callbacks and STK, SCHOOLCODE#ADMNO account format, automatic idempotent reconciliation, unmatched queue, receipts and SMS, encrypted tenant configuration, local simulator.
9. Communication: SMS, email, in-app, announcements, variable templates, scheduled sends, delivery status, SMS balance.
10. Parent portal: child switcher, results/reports, fees/STK, attendance, timetable, assignments, notices, teacher messaging, events.
11. Student portal: results, timetable, assignments, notices, library status.
12. Teacher portal: lessons, classes, attendance, marks, assignments, lesson plans, messages.
13. Admissions: public application, documents, interviews, decisions, student conversion.
14. Library: catalogue/copies/barcodes, lending, due dates, fines, reminders.
15. Transport: vehicles, drivers, routes/stops, allocations, fees.
16. Boarding: dorms/beds, allocation, records, exeat.
17. Meals: plans, meal records, reports, fee links.
18. Inventory: assets and consumables, stock movements, low-stock alerts.
19. Health: restricted medical records, incidents, sick bay, vaccination, parent notifications.
20. Activities: sports, clubs, competitions, events, participation, calendar.
21. Finance: income, expenses, budgets, vendors, petty cash, income statement, reports/export.
22. Analytics: enrollment, collections, attendance, performance and demographics with date filters/export.
23. Security/settings: permission editor, audit/login history, profile, academic setup, grading, notifications, data export and retention.

## Seed data
- Super Admin plus two realistic Kenyan demo schools.
- 300+ students, Grade 7A-style classes, Mathematics/English/Kiswahili/Science, KSh fee structures, guardians, payments, marks, attendance, books, buses, and one account per role.
- Demo credentials documented.

## Required deliverables
Monorepo target with frontend/backend/docs, compose stack, environment example, quick-start README, decisions, specification, progress, deployment guide, user manual outline, tests including tenant isolation and M-Pesa reconciliation.

## Final acceptance
- One-command stack boots frontend, backend, Mongo, Redis and worker.
- Seed and all role logins work.
- Every listed module is exercised.
- Sandbox STK/C2B reconciles, updates balance, generates receipt and mock SMS.
- Branded report cards/receipts render as polished PDFs.
- Backend/frontend suites, tenant tests, reconciliation tests, and frontend production build pass.
- 375px layout, dark mode, and installable PWA verified.
- Clean-clone quick start is accurate.
