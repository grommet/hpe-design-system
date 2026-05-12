---
name: content-quality-review
description: Reviews and normalizes documentation copy for tone, clarity, and structure.
inputs:
  - Draft documentation
  - Writing standards
  - Project-specific terminology exceptions
outputs:
  - Revised documentation copy
  - Change log of applied edits
version: 1.0.0
---

## Purpose

Enforce consistent writing quality across generated and hand-authored content.

## Inputs

- Draft markdown or MDX content
- Style guide constraints
- Known vocabulary exceptions

## Outputs

- Improved copy with consistent style
- Explicit list of edits for review transparency

## Procedure

1. Scan headings, lists, and paragraphs for structure and voice violations.
2. Rewrite verbose or ambiguous lines into concise, imperative statements.
3. Normalize terminology and casing against approved vocabulary.
4. Preserve technical meaning while reducing redundancy.
5. Produce an edit summary categorized by issue type.

## Failure Handling

- If meaning is uncertain, leave original text and flag it for review.
- If style and technical accuracy conflict, prefer technical accuracy.
- If massive rewrite is required, split changes into small reviewable batches.

## Reuse Constraints

- Requires a stable writing standard reference.
- Must not silently change normative requirements.
- Should remain deterministic for repeated runs on unchanged input.
