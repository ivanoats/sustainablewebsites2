# ADR-0001: Record architecture decisions

**Status:** Accepted
**Date:** 2026-10-12
**Deciders:** Ivan Storck

## Context

The architecture is documented as a snapshot in `docs/architecture.md`,
`docs/data-flows.md`, and `docs/components.md`. Those describe what the system
is, but not why it is that way or what was rejected. As the site grows and
alternatives come up, such as moving to another framework, there is no
record of the reasoning to build on.

## Decision

Keep an Architecture Decision Log in `docs/adr/`. Each significant decision gets
a numbered ADR in a lightweight format (context, decision, options,
consequences), indexed in `docs/adr/README.md`. ADRs are append-only: a changed
decision gets a new ADR that supersedes the old one.

Decisions made before this log existed are recorded retroactively and labeled
as such.

## Options considered

### Option A: ADRs in the repository

Markdown files next to the code, reviewed in pull requests.

Pros: versioned with the code, reviewed like code, found by anyone who clones
the repo, and work with the existing MarkdownLint and CI setup.
Cons: a little ceremony per decision.

### Option B: Notes in an external tool

Pros: easier to edit casually.
Cons: drifts from the code, easy to lose, not covered by review.

### Option C: Keep only the descriptive docs

Pros: no extra work.
Cons: the reasoning behind decisions is lost, and the same debates repeat.

## Consequences

- Decisions have a durable home and a clear history.
- Changes that affect architecture should update the ADR index and the
  descriptive docs in the same pull request.
- The architecture-docs agent instructions point at this log so generated docs
  stay consistent with it.
