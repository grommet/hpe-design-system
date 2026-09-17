---
name: git-commit
description: Analyze changes, stage intelligently, and create a Conventional Commit with safe git guardrails.
agent: agent
tools: [read, search, execute]
argument-hint: Optional commit intent or constraints (for example: "scope=tokens, type=fix, split by package")
---

# Prompt: Git Commit

Create one or more high-quality Conventional Commits from the current repository changes.

## Inputs

- Commit intent or constraints: `${input:commitIntent:Optional. Example: "type=fix scope=button refs=#123"}`
- Current file context: `${file}`
- Selected code context: `${selection}`

If `${input:commitIntent}` is empty, infer type, scope, and grouping from the diff.

## Safety Rules

- Never modify git config.
- Never run destructive commands (`reset --hard`, force push, checkout discard).
- Never use `--no-verify` unless explicitly requested.
- Never commit secrets (`.env`, credentials, private keys).
- If there are no changes to commit, stop and explain what is missing.

## Required Workflow

1. Inspect repository state with `git status --porcelain`.
2. Determine whether staged changes exist.
3. Inspect the relevant diff:
   - If staged changes exist, inspect `git diff --staged`.
   - Otherwise inspect `git diff`.
4. Detect logical commit groups:
   - Keep one logical change per commit.
   - If changes are unrelated, split into multiple commits.
5. Stage files intentionally:
   - Stage exact files or hunks required for the current commit group.
   - Avoid broad staging unless all changes belong together.
6. Generate a Conventional Commit message:
   - Format: `<type>[optional scope]: <description>`
   - Description in imperative mood, present tense, under 72 characters.
   - Add body/footer only when needed (context, refs, breaking change).
7. Create the commit.
8. Confirm result by showing the new commit summary (`git log -1 --oneline`) and the files included.

## Commit Message Rules

- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Scope should be the smallest meaningful subsystem (for example: `button`, `tokens`, `storybook`, `styles`).
- Use `!` and `BREAKING CHANGE:` footer when behavior is intentionally breaking.
- Include issue references when provided (`Refs #123`, `Closes #123`).

## Optional Overrides

Apply user-provided intent from `${input:commitIntent}` when present:

- `type=<value>` forces commit type
- `scope=<value>` forces scope
- `desc="..."` forces description
- `refs=#123` adds issue footer
- `split=true` enforces multiple logical commits when applicable

If an override conflicts with the actual diff, explain the mismatch and use the closest truthful commit message.

## Output Expectations

Return a concise commit report with:

- Commit hash and subject for each commit created
- Files included per commit
- Final `git status --short` summary
- Any skipped files and why they were excluded

If commit hooks fail, report the hook error and stop after suggesting the smallest fix path.
