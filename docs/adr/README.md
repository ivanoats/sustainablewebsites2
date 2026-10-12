# Architecture Decision Log

This is the Architecture Decision Log (ADL) for Sustainable Websites 2.0. Each
entry links to an Architecture Decision Record (ADR) that captures one
significant decision: the context, the options weighed, what was chosen, and
what it costs us.

For how the system is structured today, see [Architecture Overview](../architecture.md),
[Data Flows](../data-flows.md), and [Component Architecture](../components.md).

## Decision log

| ADR                                           | Title                                   | Status                 | Date       |
| --------------------------------------------- | --------------------------------------- | ---------------------- | ---------- |
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions           | Accepted               | 2026-10-12 |
| [0002](0002-nextjs-static-generation.md)      | Next.js with static generation          | Accepted (retroactive) | 2026-10-12 |
| [0003](0003-pandacss-park-ui.md)              | PandaCSS and Park UI for styling        | Accepted (retroactive) | 2026-10-12 |
| [0004](0004-netlify-hosting-and-forms.md)     | Netlify hosting and Netlify Forms       | Accepted (retroactive) | 2026-10-12 |
| [0005](0005-markdown-content-source.md)       | Markdown as the content source of truth | Accepted               | 2026-10-12 |
| [0006](0006-evaluate-astro-framework.md)      | Evaluate Astro as the site framework    | Proposed               | 2026-10-12 |

## Statuses

- **Proposed** — written up and open for a decision. Nothing depends on it yet.
- **Accepted** — decided and in force.
- **Accepted (retroactive)** — the decision predates this log. The record was
  reconstructed from the repository, so the rationale is inferred. The owner
  should correct anything that does not match the original intent.
- **Rejected** — considered and decided against. The record stays so the
  question is not reopened without new information.
- **Deprecated** — no longer relevant, nothing replaced it.
- **Superseded by ADR-NNNN** — replaced. The old record stays, unedited except
  for its status line.

## Adding or changing a decision

1. Copy [`template.md`](template.md) to `NNNN-short-title.md` using the next
   free number.
2. Write it with status **Proposed** and add a row to the table above.
3. When the decision is made, set the status to **Accepted** and update the
   table. If it replaces an earlier ADR, mark that one **Superseded by
   ADR-NNNN** and keep its body as it was.
4. Update the affected architecture docs in the same pull request.

ADRs are append-only history. Do not rewrite an accepted ADR to match a later
change of mind; write a new one that supersedes it.

## When to write one

Write an ADR when a choice is expensive to reverse or shapes how others work:
the framework, the styling system, the hosting and form handling, where content
lives, a new runtime dependency with architectural weight. Routine
implementation choices do not need one.
