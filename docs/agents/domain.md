# Domain Docs

**Layout**: Multi-context

## Structure

- `CONTEXT-MAP.md` — Root file pointing to per-area contexts
- `*/CONTEXT.md` — Per-area domain context (e.g., `frontend/CONTEXT.md`, `backend/CONTEXT.md`)
- `docs/adr/` — Architecture Decision Records

## Consumer Rules

Skills read domain docs in this order:
1. `CONTEXT-MAP.md` for area routing
2. Area-specific `CONTEXT.md` for domain language
3. `docs/adr/` for past decisions
