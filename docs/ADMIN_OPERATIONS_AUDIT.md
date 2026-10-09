# Rawaj Admin & Operations Audit — Phase 1

**Branch:** `audit/admin-operations`  
**Scope:** Repository `skandermahyoub/rawaj-os` + Supabase project `jidrhknvrctqzquyurxl`  
**Date:** 2026-10-09  
**Status:** Discovery and architecture review; not a completed end-to-end runtime test.

## Deployment safety

- Work is isolated from `main`.
- `netlify.toml` on this branch now includes a build-ignore rule that exits successfully for branches other than `main`; production builds on `main` remain enabled.
- The currently published production deploy was inspected and remains the `main` deploy for commit `cb9cb6c3bc5ed740182dcb6b76b4c03138ca71c9`, state `ready`.
- No production deploy was triggered by this audit. Netlify's build-ignore behavior for the new branch rule has not yet been independently confirmed by a branch build.
- No production database schema or records were changed.

## Verified current admin capabilities

1. **Storefront/CMS:** services, packages, templates, taxonomy, portfolio, blog, media, FAQs, client logos/testimonials, home slides, marquee, promotional module, hero/header, footer, appearance, organization settings.
2. **Sales intake:** quote requests with reference number, customer details, requested items/specifications, deadline, general notes, status, assigned salesperson, internal/supplier notes and an embedded timeline.
3. **Design work:** design tasks with client contact details, quote/service/department references, designer assignment, deadline, priority, status, brief file, proof versions and comments.
4. **Contact inbox:** public contact submission and staff status management.
5. **Staff access:** roles `owner`, `admin`, `editor`, `sales`, `designer`; view access is also checked in the UI.
6. **Supabase integration:** the legacy-looking `cloudDb.ts` is a compatibility adapter over Supabase, not Firebase. It translates collection/document-style calls to Supabase table reads/writes and realtime subscriptions. The app imports Supabase Auth for login and privileged user management.

## Current database inventory

The public schema currently contains these 23 tables:

`blog`, `categories`, `client_logos`, `contact_messages`, `departments`, `design_tasks`, `faq`, `features`, `home_slides`, `industry_sectors`, `marquee`, `media`, `owner_bootstrap_tokens`, `packages`, `portfolio`, `profiles`, `quotes`, `services`, `settings`, `subcategories`, `templates`, `testimonials`.

The current schema does **not** expose dedicated tables for CRM/customer accounts, quotations as versioned commercial documents, contracts, invoices, payments, receivables, production orders/stages, stock movements, purchase orders, suppliers, delivery records, or a general audit-event log. This supports the conclusion that Rawaj currently has an intake/design/CMS core rather than a complete commercial operations system.

## Important implementation details

- `quotes` stores `customer`, `items`, and `timeline` as structured fields in one quote record. Quote statuses cover intake, review, pricing, sent, negotiation, won/lost, and archive.
- `design_tasks.quote_id` links design work back to a quote, but there is no separate production-order lifecycle.
- Quote status/assignment changes append entries to the quote's embedded timeline; this is useful history but not a centralized, immutable audit log.
- Admin dashboard indicators are mainly counts derived from quote/design-task statuses. They do not represent actual revenue, collected cash, margin, inventory, or production throughput.
- Most exposed tables have RLS enabled and staff write policies call `private.has_any_role(...)`. Public read policies exist for storefront data. The security advisor currently reports leaked-password protection disabled (warning); performance advisor reports 14 unused-index observations (informational). Do not remove indexes solely on this basis without workload evidence.
- Runtime build/lint/smoke tests have not yet been run against this branch's final commit. No claim of a passing release build is made.

## Audit matrix — current phase

| Area | Code/schema evidence | Current assessment | Next verification |
|---|---|---|---|
| Authentication | Supabase Auth + active profile role check | Present | Exercise login, logout, inactive users, session expiry |
| Role authorization | `adminAccess.ts` + RLS helper policies | Good layered foundation | Test each role against every protected mutation |
| Quote intake | `quotes` table + quote-cart submission | Present | Verify persistence, duplicate-submit behavior, error rollback and reference uniqueness |
| Quote handling | status, assignment, notes, embedded timeline | Operational but limited | Verify every status transition, concurrent updates and assignment restrictions |
| Design tasks | `design_tasks` + proof/comment operations | Present | Test designer isolation, upload/replace/delete and proof approval transitions |
| Contact inbox | `contact_messages` | Present | Test public insert validation, staff updates and deletion permissions |
| CMS and storefront | settings + catalog/content tables | Broad coverage | Cross-browser persistence and each CRUD/upload path |
| Customer CRM | no dedicated customer/opportunity/follow-up schema found | Missing as a unified module | Design after sales workflow is confirmed |
| Commercial documents | no invoice/payment/receivable tables found | Missing | Design linked quote → approval → invoice → payment |
| Production and delivery | no production-order/stage/delivery schema found | Missing | Design work orders, stage owners, QC, deadlines and delivery |
| Inventory and purchasing | no inventory/supplier/purchase-order tables found | Missing | Add only after costing/material requirements are defined |
| Management reporting | counts from operational statuses | Insufficient for financial decisions | Define KPIs from trusted source records |
| Audit trail | quote-local timeline only; no general audit table found | Partial | Add actor, action, entity, before/after and timestamp |

## Recommended implementation order

### Phase A — stabilize existing functions
- Verify cloud-sync behavior and all existing CRUD/upload actions.
- Test quote status transitions, assignment, notes, and design proof flow.
- Verify each role against UI access and database RLS.
- Fix persistence/concurrency/error-handling defects before adding modules.

### Phase B — make sales a real workflow
- Add unified customer profiles and interaction/follow-up history.
- Add quote versions and line-item cost/pricing breakdowns.
- Add due dates, ownership, reminders and explicit next actions.
- Link quote, customer and design task using stable foreign keys.

### Phase C — commercial and production operations
- Add approval/contract, invoices, payments and outstanding balance.
- Add production work orders with stages, owners, due dates, QC and delivery confirmation.
- Add material usage and actual-vs-estimated cost once production data is trustworthy.

### Phase D — management intelligence and customer experience
- Add role-specific dashboards, overdue alerts and auditable management KPIs.
- Add client-facing request status, quote/proof approval, documents and repeat orders.
- Add inventory/procurement only when the operating model is defined.

## Non-negotiable design principles

- A single project/work item must connect the customer, quote, approvals, design, production, payment and delivery.
- Every important mutation must have a server-enforced permission and an attributable history.
- Never show financial KPI figures unless they derive from saved commercial records.
- No fake/demo counters or inert buttons.
- Keep the storefront/CMS as one admin domain, not the entire admin product.
- Keep production data safe; schema migrations should be tested on a development database branch before production application.


## Development log — 2026-10-09

### Implemented on `audit/admin-operations`

- Added a live **Daily Operations Follow-up** section to `AdminDashboardHome.tsx`, based on current quote and design-task records:
  - new quotes requiring first review;
  - quotes awaiting missing customer details;
  - design proofs awaiting a decision;
  - overdue design tasks.
- Each card navigates to the relevant existing admin module. No mock/demo counts or new database records were introduced.
- Corrected the open-design-task KPI to include all nonterminal design states (`new`, `assigned`, `in_progress`, `proof_submitted`, `feedback_requested`).
- Corrected overdue design-task logic so date-only deadlines remain due through the end of the specified day, and approved/sent-to-print/completed tasks are not mislabeled as overdue design work.
- Added `.github/workflows/quality-checks.yml` to run `npm ci`, `npm run lint`, and `npm run build` on branch pushes and pull requests targeting `main`. This workflow checks code only and does not deploy to Netlify.

### Verification status

- Changes are committed to the isolated branch; `main` has not been changed.
- No Supabase data or schema was changed by these dashboard improvements.
- A local build could not be executed from this environment because GitHub network access was unavailable. The new GitHub Actions workflow is the next verification path; the build is **not yet claimed to pass**.

- Updated `updateQuoteStatus` and `updateQuoteNotes` in `AppContext.tsx` to persist only the fields changed by the action and merge those fields into current client state. This reduces the risk that an edit based on an older in-memory quote overwrites unrelated, newer fields. Explicitly saving an empty internal note now clears it rather than silently retaining the previous value.
- **Remaining concurrency limitation:** quote history is still stored as an embedded `timeline` array. Two simultaneous actions can still race while writing that array. A durable fix requires an append-only quote-event table or a server-side atomic operation; this was not silently treated as solved in this phase.


### Follow-up hardening — 2026-10-09

- Restricted the admin quote workspace in the UI to owner/admin/sales. Designers continue to use the design-task workspace instead of viewing sales quote records.
- Completed the quote-status filter so staff can directly filter requests awaiting customer details, negotiation, and archived requests; previously these statuses existed in the workflow but were missing from the filter.
- Added a mobile-number fallback when generating the WhatsApp contact link, preventing a runtime error when a quote has no separate WhatsApp value.
- Changed `updateDesignTask` to persist only explicitly changed fields plus `updated_at`, instead of writing an entire task assembled from a potentially stale client snapshot.
- Live Supabase policy inspection found that `quotes_staff_read` also allowed the designer role to select full quote rows, including private sales/supplier notes. Added migration `supabase/migrations/20261009150000_restrict_quote_read_to_sales.sql` to remove that database-level access.
- **Migration is staged only on this branch and has not been applied to Supabase.** Before production application, test it against the expected designer workflow and confirm that design-task screens do not require direct quote-table reads.
- The existing design-task proof/comment arrays are still embedded in the task row. Concurrent submissions can still race; a normalized append-only proof/comment/event model is the durable follow-up.


- Client-logo CRUD now attempts to remove the previous Rawaj Storage object after a successful replacement or record deletion; storage-cleanup failure does not roll back the saved database change.
- One client-logo row referenced a generic legacy upload while the other listed rows had no image. Added guarded migration `supabase/migrations/20261009150500_clear_unverified_client_logo_asset.sql` to clear only that matching URL and preserve the client record.
- The two new SQL migrations remain staged on this branch and have not been applied to the live Supabase database.


- Extended partial-write hardening to service, template, package, blog-post, and portfolio updates. These functions now persist only the supplied fields (plus the service timestamp), avoiding accidental replacement of unrelated values from an older in-memory object.
- Additional persistence risk confirmed in `cloudDb.ts`: settings are stored as JSONB and merge writes currently read the current JSON value, merge in the browser, then upsert it. Two nearly simultaneous writes to the same settings key can still race. The durable fix is an atomic server-side JSONB merge operation; it is not introduced here because it requires a coordinated database migration and runtime verification.

### Follow-up hardening — admin usability and assignment scope — 2026-10-09

- Designer workspace now scopes its visible task list, selected task, and status counters to tasks assigned to the signed-in designer. Sales/operations roles retain the complete queue. This is a UI-level privacy improvement; it does **not** replace a server-enforced Supabase RLS policy for design_tasks.
- Contact inbox now normalizes Yemeni phone numbers before constructing WhatsApp links: local leading zero is removed, 967 is preserved when already present, and 00 international prefixes are handled. If no usable phone is present, the interface shows a clear fallback instead of linking to an empty WhatsApp destination.
- Contact inbox now supports filtering and explicitly marking messages as replied, using the existing replied status supported by the data model.
- Quote workspace uses the same Yemeni number normalization and does not offer a WhatsApp link when the quote has no valid phone number.
- GitHub Actions previously passed npm run lint and npm run build at commit 4f2e16acfa7d614979b8202ffc490267722f0730. The latest UI-hardening commits triggered a new quality run; its result is pending at the time of this update. Earlier runs triggered by each rapid push were cancelled by the workflow concurrency behavior and should not be interpreted as failures of the code itself.
- Remaining important server-side check: ensure designers can only select/update design tasks assigned to them, and verify that the designer workflow does not require reading quote rows. Do not apply the staged quote-policy migration or any new migration to production without testing against a development database.

- Proof upload now validates the allowed file extensions and rejects files larger than 50 MB before transfer. If the file uploads but saving its proof record fails, the app attempts to remove the orphaned Storage object and reports when cleanup also fails.
- GitHub Actions passed both the TypeScript/lint command and production build at code commit 62f898e6d08a031c745627825d380b09e072f879: https://github.com/skandermahyoub/rawaj-os/actions/runs/37962232856
- Live read-only Supabase Advisor check: leaked-password protection is still disabled (security warning); 11 indexes are currently reported as unused (informational only). No auth setting was changed and no indexes were removed. Review the password-protection setting here: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

- Fixed a stale-state regression in `updateSiteSettings`: settings writes now send only changed fields through the existing merge path, and local state merges those fields into the latest React state after persistence. This prevents a delayed write from replacing unrelated, newer local/realtime settings in the same browser. It does not eliminate the separately documented cross-browser race in JSONB read/merge/upsert; that still requires an atomic database-side operation.

- Hardened the admin settings editor's realtime synchronization: remote updates now refresh fields that are still untouched while preserving locally edited fields. This avoids losing unsaved company/contact edits when a logo upload or another administrator updates settings during the same editing session.

- Added defensive normalization at the Supabase data boundary for legacy design-task rows: missing or malformed `proof_versions` and `comments` values are exposed as empty arrays. This prevents the task workspace and proof/comment actions from crashing when older/imported rows lack those JSON arrays.
