# Graph Report - 20  (2026-11-02)

## Corpus Check
- 85 files · ~21,446 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .example 1, (none) 1, .css 1)

## Summary
- 330 nodes · 677 edges · 46 communities (13 shown, 33 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `568315c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- package.json
- LoadingSpinner
- admin/Expenses.jsx
- Changelog
- Supabase
- Changelog
- Writing Guidelines for Postgres References
- AdminCollections
- Section Definitions
- Village Volleyball Ground Management System
- Supabase Postgres Best Practices
- Players.jsx
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

## God Nodes (most connected - your core abstractions)
1. `LoadingSpinner()` - 24 edges
2. `useAuth()` - 24 edges
3. `App()` - 23 edges
4. `PageHeader()` - 19 edges
5. `formatLKR()` - 19 edges
6. `formatDate()` - 19 edges
7. `AdminCollections()` - 17 edges
8. `AdminExpenses()` - 17 edges
9. `AdminSponsors()` - 17 edges
10. `EmptyState()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `AdminCalendar()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Calendar.jsx
- `App()` --calls--> `AdminCollections()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Collections.jsx
- `App()` --calls--> `AdminDashboard()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Dashboard.jsx
- `App()` --calls--> `AdminExpenses()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Expenses.jsx
- `App()` --calls--> `AdminPlayers()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Players.jsx

## Import Cycles
- None detected.

## Communities (46 total, 33 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.13
Nodes (24): react-router-dom, App(), RedirectIfAuth(), RequireAdmin(), RequireAuth(), RequirePlayer(), AuthContext, AuthProvider() (+16 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (33): dependencies, lucide-react, react, react-dom, react-router-dom, recharts, @supabase/supabase-js, devDependencies (+25 more)

### Community 2 - "LoadingSpinner"
Cohesion: 0.21
Nodes (21): lucide-react, react, DaySummaryPanel(), EmptyState(), LoadingSpinner(), buildCells(), MonthCalendar(), PageHeader() (+13 more)

### Community 3 - "admin/Expenses.jsx"
Cohesion: 0.18
Nodes (18): ConfirmDialog(), AdminExpenses(), confirmDelete(), handleSubmit(), load(), emptyForm, AdminSponsors(), confirmDelete() (+10 more)

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

### Community 8 - "AdminCollections"
Cohesion: 0.16
Nodes (18): @supabase/supabase-js, supabase, AdminCalendar(), AdminCollections(), confirmDelete(), handleSubmit(), load(), PlayerCalendar() (+10 more)

### Community 9 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 10 - "Village Volleyball Ground Management System"
Cohesion: 0.29
Nodes (6): Financial rules, First admin, Login model, Setup, Stack, Village Volleyball Ground Management System

### Community 11 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 12 - "Players.jsx"
Cohesion: 0.54
Nodes (6): AdminPlayers(), load(), setStatus(), listPlayers(), updatePlayerStatus(), displayMobile()

## Knowledge Gaps
- **4 isolated node(s):** `@types/react`, `@types/react-dom`, `oxlint`, `tailwindcss`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 178 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `LoadingSpinner` to `App.jsx`, `package.json`, `admin/Expenses.jsx`, `Players.jsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `@types/react`, `@types/react-dom`, `oxlint` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13360323886639677 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `LoadingSpinner` to `App.jsx`, `package.json`, `admin/Expenses.jsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.057057057057057055 - nodes in this community are weakly interconnected._
- **Should `Changelog` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Supabase` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._