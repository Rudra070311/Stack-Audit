# Automated Tests

These are the automated tests currently covering the audit engine and related sharing flows.

## Audit Engine Coverage

| File | What it covers | How to run |
| --- | --- | --- |
| `src/tests/audit-engine/audit-engine.test.ts` | Core audit engine calculations, plan recommendations, savings totals, and classification behavior. | `npx vitest run src/tests/audit-engine/audit-engine.test.ts` |
| `src/tests/audit-engine/savings.test.ts` | Monthly, annual, per-developer, and cumulative savings math across common scenarios. | `npx vitest run src/tests/audit-engine/savings.test.ts` |
| `src/tests/audit-engine/edgecases.test.ts` | Boundary cases for spend, team size, use cases, and invalid or empty inputs. | `npx vitest run src/tests/audit-engine/edgecases.test.ts` |
| `src/tests/audit-engine/cursor.test.ts` | Cursor-specific pricing and overlap/consolidation logic. | `npx vitest run src/tests/audit-engine/cursor.test.ts` |
| `src/tests/audit-engine/claude.test.ts` | Claude-specific pricing tiers and recommendations. | `npx vitest run src/tests/audit-engine/claude.test.ts` |
| `src/tests/audit-engine/benchmark.test.ts` | Benchmark-style comparisons and savings thresholds for audit recommendations. | `npx vitest run src/tests/audit-engine/benchmark.test.ts` |

## Other Automated Coverage

| File | What it covers | How to run |
| --- | --- | --- |
| `src/tests/integration/api-flow.test.ts` | API payload validation and share URL construction. | `npx vitest run src/tests/integration/api-flow.test.ts` |
| `src/tests/e2e/share-flow.spec.ts` | Share flow behavior, public share checks, and copy-link scenarios. | `npm run test:e2e -- src/tests/e2e/share-flow.spec.ts` |
| `src/tests/e2e/audit-flow.spec.ts` | End-to-end audit flow, result rendering, and navigation. | `npm run test:e2e -- src/tests/e2e/audit-flow.spec.ts` |

## Full Test Run

- Unit and integration tests: `npm test -- --run`
- Lint: `npm run lint`
- E2E tests: `npm run test:e2e`
