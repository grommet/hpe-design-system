---
name: figma-use
description: '**MANDATORY prerequisite** — you MUST invoke this skill BEFORE every `use_figma` tool call. NEVER call `use_figma` directly without loading this skill first. Skipping it causes common, hard-to-debug failures. Trigger whenever the user wants to perform a write action or a unique read action that requires JavaScript execution in the Figma file context — e.g. create/edit/delete nodes, set up variables or tokens, build components and variants, modify auto-layout or fills, bind variables to properties, or inspect file structure programmatically.'
license: MIT
version: 1.0.0
---

# Figma Use

## Authoritative Source

Read and follow `knowledge/core/skills/figma-use/SKILL.md` (and its `references/` folder) as the source of truth for this skill's full workflow.

This file exists only as the Copilot-discoverable entrypoint. Do not expand this file into a second full copy — keep durable workflow changes in `knowledge/core/skills/figma-use/SKILL.md`.

## Upstream Source

[Figma mcp-server-guide: figma-use](https://github.com/figma/mcp-server-guide/tree/main/skills/figma-use)
