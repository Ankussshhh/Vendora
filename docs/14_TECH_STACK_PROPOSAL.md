# Vendora technology stack proposal

Status: **Recommended default for a greenfield application — not yet an accepted implementation decision**

Prepared: 11 November 2026

This proposal applies only if there is no suitable existing Zappcarts application repository to preserve. Inspect any real application source before scaffolding. Exact dependency versions must be pinned and compatibility-tested at kickoff rather than copied blindly from this dated proposal.

## 1. Recommendation

Build Vendora as a **TypeScript modular monolith with two deployable processes and one transactional datastore**:

```text
Browser
   │
   ▼
Next.js web process ── thin HTTP/actions/webhooks ──┐
                                                    ├── domain modules ── PostgreSQL
Graphile Worker process ── jobs/reconciliation ─────┘
                                                    └── provider adapters (later)
```

- The web and worker import the same framework-independent domain packages.
- PostgreSQL is the authoritative store for merchants, customers, catalog, stock, reservations, orders, idempotency, inbound events, audit records and queued work.
- The initial worker queue also uses PostgreSQL, avoiding an early database/Redis dual-write problem.
- Next.js remains an interface adapter, not the home of inventory, order, tenancy or billing rules.

This is a modular monolith, not microservices. Modules have explicit boundaries but deploy together until measured scale, team ownership or compliance requirements justify separation.

## 2. Initial stack

| Concern | Recommended choice | Reason |
|---|---|---|
| Runtime | Node.js 26 LTS | Current LTS line as of this proposal; pin and verify package engine support |
| Language | TypeScript, strict mode | Shared types while retaining runtime validation at every boundary |
| Repository | pnpm workspaces | Lightweight monorepo without adding a build orchestrator immediately |
| Web/UI | Next.js App Router, Node/Docker deployment | Public site, auth screens and dashboard in one responsive application |
| Styling | Tailwind CSS plus a small reviewed shadcn/ui component set | Fast accessible UI composition while owning component source |
| Domain | Framework-free TypeScript modules | Keeps core rules testable and extractable from Next.js |
| Contracts | Zod schemas with explicit versions for events/jobs | Runtime validation for forms, HTTP, webhooks and job payloads |
| Database | PostgreSQL 18 or latest version supported by the selected managed host | Transactions, constraints, row locks, JSON where justified and strong operational tooling |
| SQL access | Drizzle ORM plus reviewed SQL migrations | Typed queries without hiding SQL, transactions, constraints or lock semantics |
| Background work | Graphile Worker in a separate Node process | Transactional PostgreSQL-backed jobs, retries and job-key deduplication without Redis |
| Authentication | Provisional: Clerk for pilot identity/session handling; application-owned merchant memberships and permissions in PostgreSQL | Reduces early password/session security burden while limiting authorization lock-in |
| Unit/integration tests | Vitest plus a real disposable PostgreSQL instance | Fast domain tests and real transaction/constraint/concurrency evidence |
| Browser E2E | Playwright | Critical signup, tenant-boundary and conversation-to-order flows |
| Logging | Pino structured JSON logs | Correlation IDs with controlled redaction; logs are not audit history |
| Telemetry | OpenTelemetry traces and metrics | Vendor-neutral observability; keep application logs separate while OTel JS logs remain less mature |
| Local development | Docker Compose for PostgreSQL; web and worker run with one documented command | Reproducible local dependencies with minimal infrastructure |
| Deployment | Docker-compatible Node platform plus managed PostgreSQL with backups/PITR | Hosting and region remain a gate; avoid platform-only application behavior |

### Authentication decision gate

Clerk is the recommended pilot default because authentication is security-sensitive and the team is small. Use it for identity, verification, sessions and recovery—not as the sole source of Vendora authorization truth. Maintain `UserIdentity`, `Merchant`, `Membership`, role and permission records in Vendora's database, keyed to the external identity. Every request derives the merchant context from a validated session plus an active application membership.

Before adoption, compare Clerk with:

- **Better Auth:** self-hosted and supports email/password plus organizations, but shifts security operations and library/schema churn to Vendora.
- **WorkOS AuthKit:** strong B2B organization path and future enterprise features; may be premature for the pilot.
- **Supabase Auth:** credible if Supabase is also selected as the managed PostgreSQL platform and RLS model.

Do not choose Auth.js v5 merely for framework affinity while its official installation remains beta-tagged. A short auth spike must prove signup, email verification, login, recovery, session revocation, invitation, logout and safe `/dashboard` redirects.

## 3. Repository layout

```text
apps/
  web/                 # Next.js public site, dashboard, thin route handlers
  worker/              # Graphile Worker tasks and reconciliation loops
packages/
  domain/              # tenancy, catalog, inventory, CRM, orders, audit
  db/                  # Drizzle schema, migrations, tenant-scoped repositories
  contracts/           # Zod HTTP/event/job schemas and structured errors
  ui/                  # only shared Vendora components that actually recur
  config/              # lint, TypeScript and test configuration
```

Turborepo can be added only when workspace build/test caching becomes useful. Do not create packages for imagined future reuse.

## 4. Application boundaries

### Next.js web process

- Renders the landing page, authentication entry, onboarding and dashboard.
- Uses Server Components for suitable reads and thin route handlers/server actions for mutations.
- Validates inputs, resolves the authenticated merchant context and calls domain services.
- For provider webhooks: reads the raw request body, verifies the provider signature, durably records/deduplicates the inbound event, schedules processing in the same database transaction where possible, and acknowledges quickly.
- Avoids placing inventory/order rules directly in React components, route files or Server Actions.

### Domain modules

- Own state machines, permission checks, server-calculated totals, idempotency semantics and audit intent.
- Depend on narrow repository and provider interfaces rather than Next.js or vendor SDK globals.
- Use deterministic services for money, stock, permissions and order state; AI supplies drafts only.

### Database layer

- Every merchant-owned table contains `merchant_id`.
- Cross-record references include tenant scope through composite keys/constraints where feasible.
- All queries enter through repositories requiring an explicit merchant context, except narrowly reviewed system/reconciliation paths.
- Append-only inventory/credit/audit records are protected from casual update/delete.
- Reservations use explicit transaction and locking rules with consistent lock order and retry handling.
- Consider PostgreSQL row-level security as defense in depth only after proving connection-pool behavior; do not use it as a substitute for application authorization.

### Worker

- Runs webhook normalization, outbox delivery, reservation expiry, reconciliation and later AI/transcription work.
- Treats Graphile Worker as at-least-once: every task is idempotent and records external attempt/outcome references.
- Uses job keys for deduplication but never assumes queue deduplication alone guarantees a single business effect.
- Has bounded retries, terminal/reconciliation states and visible failed-job operations.
- Uses a direct PostgreSQL connection if the selected pooler does not support the session behavior required for `LISTEN/NOTIFY`.

## 5. Testing baseline

From the first stateful milestone:

- unit tests for state transitions, permissions, money/currency rules and validation;
- integration tests against real PostgreSQL migrations and constraints;
- concurrent last-unit reservation tests, including retry/deadlock behavior;
- cross-tenant negative tests for every implemented read/write endpoint;
- idempotency tests for order creation, stock confirmation, webhooks and worker retries;
- Playwright flows for public → signup/login → dashboard and the milestone demo;
- production Docker-image smoke test rather than relying only on the development server.

No test may claim a concurrency, database or signature guarantee using only mocks.

## 6. What not to add initially

- NestJS or another separate API service.
- Redis/BullMQ, Kafka or another event bus.
- Kubernetes, microservices, multi-region writes or microfrontends.
- GraphQL, tRPC, a public SDK or a public API before a real consumer exists.
- Elasticsearch/vector databases, an analytics warehouse or a feature-flag vendor.
- A broad internal design-system package beyond recurring accessible primitives.
- Multiple AI/payment/messaging providers before one adapter is measured in sandbox.
- Platform-specific caching/edge behavior that makes the Docker deployment behave differently.

## 7. Escalation triggers

### Add Redis/BullMQ only when measured evidence shows one of these

- PostgreSQL queue load measurably harms commerce transaction latency after connection and worker tuning.
- Provider-specific rate limiting, complex job flows/dependencies or delayed-job volume cannot be handled cleanly.
- Redis is already justified for another production requirement, reducing marginal operational cost.
- Queue throughput/latency targets are repeatedly missed in representative load tests.

The transactional outbox and idempotent handlers remain required after migration; Redis does not make cross-system delivery exactly once.

### Split an API service only when one of these becomes real

- A mobile, partner or public client needs the same backend with an independent release contract.
- Separate teams require independent deployment ownership.
- Webhook/API traffic needs independent security or scaling boundaries that separate processes in the same repository cannot provide.
- Compliance requires network isolation of the data/API tier.

Do not split solely for architectural neatness.

## 8. Material risks

| Risk | Mitigation before pilot |
|---|---|
| Tenant leakage from a missed filter or unsafe system path | Mandatory tenant context, composite constraints, negative tests and optionally verified RLS |
| Oversell/deadlock from naive stock updates | Explicit locked-row strategy, consistent lock order, database constraints and concurrency tests |
| Duplicate/lost side effects | Persist-before-ack, transactional job/outbox creation, provider idempotency and reconciliation |
| Next.js/hosting coupling | Framework-free domain, Node/Docker production tests and no vendor-only correctness dependency |
| Auth vendor/library lock-in | Application-owned memberships/permissions, external-identity mapping, export/offboarding plan |
| PostgreSQL queue competing with OLTP | Separate worker connections, queue/DB telemetry and defined Redis migration triggers |

## 9. Decisions required before scaffolding

1. Confirm there is no existing application source that must be preserved.
2. Confirm the team's strongest production experience is TypeScript rather than Laravel/PHP; experienced Laravel ownership could reasonably change the choice.
3. Select hosting region and managed PostgreSQL after data-residency, backup, PITR and budget review.
4. Run the auth provider spike and approve the provider/cost/data-export tradeoff.
5. Approve the tenant-enforcement strategy and prove any RLS/pooler combination.
6. Approve the inventory balance/reservation locking design after a hot-variant concurrency spike.
7. Test raw-body signature verification and fast acknowledgement in the actual Next.js production container.
8. Test Graphile Worker retry/restart behavior and connection compatibility with the selected host/pooler.

## 10. Official references checked

- [Next.js App Router](https://nextjs.org/docs/app) and [deployment modes](https://nextjs.org/docs/app/getting-started/deploying)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
- [PostgreSQL current transaction/locking documentation](https://www.postgresql.org/docs/current/xact-locking.html)
- [Drizzle transactions](https://orm.drizzle.team/docs/transactions) and [PostgreSQL guide](https://orm.drizzle.team/docs/get-started-postgresql)
- [Graphile Worker introduction](https://worker.graphile.org/docs), [requirements](https://worker.graphile.org/docs/requirements) and [task behavior](https://worker.graphile.org/docs/tasks)
- [Better Auth basic usage](https://better-auth.com/docs/basic-usage) and [organization plugin](https://better-auth.com/docs/plugins/organization)
- [Clerk organizations](https://clerk.com/docs/nextjs/guides/organizations/getting-started), [WorkOS organizations](https://workos.com/docs/authkit/users-organizations) and [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Vitest guide](https://vitest.dev/guide/), [Playwright tests](https://playwright.dev/docs/writing-tests) and [OpenTelemetry JavaScript status](https://opentelemetry.io/docs/languages/js/)
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs) and [shadcn/ui installation](https://ui.shadcn.com/docs/installation)

## 11. Claude consultation and Codex review

Claude independently selected the same TypeScript modular-monolith shape and emphasized its strongest property: commerce state and background-job intent can share one PostgreSQL transaction, while a Redis queue would require a dual-write/outbox solution anyway. Codex accepted the framework-free domain boundary, Graphile Worker default, direct worker connection warning, at-least-once/idempotency requirements and measured escalation triggers.

Codex changed Claude's provisional Better Auth default to managed pilot authentication (Clerk) because identity/session/recovery security is not Vendora's differentiator and the initial team is small. Authorization remains application-owned to reduce lock-in. This remains an explicit provider gate rather than an accepted vendor decision.
