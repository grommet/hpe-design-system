---
name: git-commit-quick
description: Create one fast, safe Conventional Commit for a small, coherent set of changes.
agent: agent
tools: [read, search, execute]
argument-hint: Optional override (example: "type=docs scope=readme refs=#42")
---

# Prompt: Git Commit Quick

Create exactly one Conventional Commit from the current changes when they represent a single logical update.

## Inputs

- Optional override: `${input:commitIntent:Optional. Example: "type=fix scope=button desc='fix keyboard focus state'"}`
- Current file context: `${file}`
- Selected code context: `${selection}`

## Fast Path Rules

1. Run `git status --porcelain`.
2. If there are no changes, stop and report that nothing can be committed.
3. If staged changes exist, use `git diff --staged`; otherwise use `git diff`.
4. Confirm changes are one logical unit.
5. Stage only the files needed for that unit.
6. Generate commit subject: `<type>[optional scope]: <description>`.
7. Create one commit.
8. Report commit hash, subject, and final `git status --short`.

## Safety Guardrails

- Do not change git config.
- Do not use destructive git commands.
- Do not bypass hooks unless the user explicitly requests it.
- Do not include secrets in commits.
- If changes are clearly unrelated, stop and recommend using `git-commit` prompt instead.

## Message Rules

- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Use imperative, present-tense wording.
- Keep subject under 72 characters.
- Add issue references when provided, for example: `Refs #123`.

## Override Support

When `${input:commitIntent}` includes these tokens, apply them if truthful to the diff:

- `type=<value>`
- `scope=<value>`
- `desc="..."`
- `refs=#123`

If an override is inaccurate for the actual changes, explain briefly and use the closest accurate commit subject.
