# Graph Report - 20  (2026-11-02)

## Corpus Check
- 87 files · ~31,078 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 362 nodes · 727 edges · 49 communities (16 shown, 33 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d42b7561`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- package.json
- LoadingSpinner
- admin/Dashboard.jsx
- Changelog
- Supabase
- Changelog
- Writing Guidelines for Postgres References
- finance.js
- Section Definitions
- Malwanahinna Volleyball Ground Maintenance System
- Supabase Postgres Best Practices
- AuthContext.jsx
- advanced-full-text-search.md
- advanced-jsonb-indexing.md
- conn-idle-timeout.md
- conn-limits.md
- conn-pooling.md
- conn-prepared-statements.md
- data-batch-inserts.md
- data-n-plus-one.md
- data-pagination.md
- data-upsert.md
- lock-advisory.md
- lock-deadlock-prevention.md
- lock-short-transactions.md
- lock-skip-locked.md
- monitor-explain-analyze.md
- monitor-pg-stat-statements.md
- monitor-vacuum-analyze.md
- query-composite-indexes.md
- query-covering-indexes.md
- query-index-types.md
- query-missing-indexes.md
- query-partial-indexes.md
- schema-constraints.md
- schema-data-types.md
- schema-foreign-key-indexes.md
- schema-lowercase-identifiers.md
- schema-partitioning.md
- schema-primary-keys.md
- security-privileges.md
- security-rls-basics.md
- security-rls-performance.md
- _template.md
- mcp.json
- AdminSponsors
- InstallBanner
- Login

## God Nodes (most connected - your core abstractions)
1. `LoadingSpinner()` - 26 edges
2. `App()` - 25 edges
3. `useAuth()` - 24 edges
4. `formatLKR()` - 21 edges
5. `PageHeader()` - 19 edges
6. `formatDate()` - 19 edges
7. `react` - 16 edges
8. `EmptyState()` - 15 edges
9. `AdminCollections()` - 15 edges
10. `AdminExpenses()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `MonthlyFinanceChart()` --calls--> `formatLKR()`  [EXTRACTED]
  src/components/MonthlyFinanceChart.jsx → src/utils/format.js
- `PlayerCalendar()` --calls--> `AdminCalendar()`  [EXTRACTED]
  src/pages/player/Calendar.jsx → src/pages/admin/Calendar.jsx
- `App()` --calls--> `InstallBanner()`  [EXTRACTED]
  src/App.jsx → src/components/InstallBanner.jsx
- `App()` --calls--> `LoadingSpinner()`  [EXTRACTED]
  src/App.jsx → src/components/LoadingSpinner.jsx
- `App()` --calls--> `AuthProvider()`  [EXTRACTED]
  src/App.jsx → src/context/AuthContext.jsx

## Import Cycles
- None detected.

## Communities (49 total, 33 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.10
Nodes (30): react-router-dom, AdminCalendar, AdminCollections, AdminDashboard, AdminExpenses, AdminLayout, AdminPlayers, AdminSponsors (+22 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (35): dependencies, lucide-react, react, react-dom, react-router-dom, recharts, @supabase/supabase-js, devDependencies (+27 more)

### Community 2 - "LoadingSpinner"
Cohesion: 0.22
Nodes (20): lucide-react, react, ConfirmDialog(), DaySummaryPanel(), EmptyState(), LoadingSpinner(), buildCells(), MonthCalendar() (+12 more)

### Community 3 - "admin/Dashboard.jsx"
Cohesion: 0.28
Nodes (10): recharts, MonthlyFinanceChart(), SummaryCard(), AdminDashboard(), handleSaveOpening(), loadSummary(), MonthlyFinanceChart, RecentList() (+2 more)

### Community 4 - "Changelog"
Cohesion: 0.10
Nodes (20): [0.1.3](https://github.com/supabase/agent-skills/compare/v0.1.2...v0.1.3) (2026-06-02), [0.1.4](https://github.com/supabase/agent-skills/compare/v0.1.3...v0.1.4) (2026-06-05), [0.1.5](https://github.com/supabase/agent-skills/compare/v0.1.4...v0.1.5) (2026-07-10), [0.1.6](https://github.com/supabase/agent-skills/compare/v0.1.5...supabase-v0.1.6) (2026-07-30), [0.1.7](https://github.com/supabase/agent-skills/compare/v0.1.6...supabase-v0.1.7) (2026-08-12), [0.1.8](https://github.com/supabase/agent-skills/compare/v0.1.7...supabase-v0.1.8) (2026-09-24), [0.1.9](https://github.com/supabase/agent-skills/compare/v0.1.8...supabase-v0.1.9) (2026-09-28), Bug Fixes (+12 more)

### Community 5 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 6 - "Changelog"
Cohesion: 0.12
Nodes (16): [1.2.0](https://github.com/supabase/agent-skills/compare/v1.1.1...v1.2.0) (2026-06-02), [1.3.0](https://github.com/supabase/agent-skills/compare/v1.2.0...v1.3.0) (2026-06-05), [1.4.0](https://github.com/supabase/agent-skills/compare/v1.3.0...v1.4.0) (2026-07-10), [1.5.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.4.0...supabase-postgres-best-practices-v1.5.0) (2026-07-30), [1.6.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.5.0...supabase-postgres-best-practices-v1.6.0) (2026-07-30), Bug Fixes, Bug Fixes, Bug Fixes (+8 more)

### Community 7 - "Writing Guidelines for Postgres References"
Cohesion: 0.12
Nodes (15): 1. Concrete Transformation Patterns, 2. Error-First Structure, 3. Quantified Impact, 4. Self-Contained Examples, 5. Semantic Naming, Code Example Standards, Comments, Impact Level Guidelines (+7 more)

### Community 8 - "finance.js"
Cohesion: 0.15
Nodes (21): supabase, AdminCollections(), confirmDelete(), handleSubmit(), load(), AdminExpenses(), confirmDelete(), handleSubmit() (+13 more)

### Community 9 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 10 - "Malwanahinna Volleyball Ground Maintenance System"
Cohesion: 0.22
Nodes (8): Financial rules, First admin, Login model, Malwanahinna Volleyball Ground Maintenance System, Production deploy (required), PWA install, Setup, Stack

### Community 11 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 12 - "AuthContext.jsx"
Cohesion: 0.28
Nodes (12): AuthContext, AuthProvider(), fetchProfile(), AdminPlayers(), load(), setStatus(), listPlayers(), updatePlayerStatus() (+4 more)

### Community 46 - "AdminSponsors"
Cohesion: 0.42
Nodes (7): AdminSponsors(), confirmDelete(), handleSubmit(), load(), deleteSponsor(), listSponsors(), saveSponsor()

### Community 47 - "InstallBanner"
Cohesion: 0.39
Nodes (6): InstallBanner(), dismiss(), handleInstall(), isIos(), isStandalone(), wasDismissedRecently()

### Community 48 - "Login"
Cohesion: 0.83
Nodes (4): Login(), handleBootstrap(), handleSubmit(), routeAfterAuth()

## Knowledge Gaps
- **4 isolated node(s):** `@types/react`, `@types/react-dom`, `oxlint`, `tailwindcss`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 184 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `LoadingSpinner` to `App.jsx`, `package.json`, `admin/Dashboard.jsx`, `AuthContext.jsx`, `InstallBanner`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `@types/react`, `@types/react-dom`, `oxlint` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09595959595959595 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `LoadingSpinner` to `App.jsx`, `package.json`, `admin/Dashboard.jsx`, `InstallBanner`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05384615384615385 - nodes in this community are weakly interconnected._
- **Why does `useAuth()` connect `App.jsx` to `LoadingSpinner`, `admin/Dashboard.jsx`, `finance.js`, `AuthContext.jsx`, `AdminSponsors`, `Login`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `Changelog` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._