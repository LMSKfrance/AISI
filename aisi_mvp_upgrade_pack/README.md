# AISI MVP Upgrade Pack

This pack contains patch-ready files/snippets to add:

- Person node (`person` / `personProfile`)
- Detailed Final Results node
- Connection validation patch
- Node factory defaults patch
- Example final-results evaluator
- Astro wheel background style tweaks
- Cursor implementation prompt

## How to use

1. Extract this zip into your project root (or inspect files first).
2. Merge the files into your existing codebase (paths are examples and may differ).
3. Use `docs/IMPLEMENT_IN_CURSOR_PROMPT.md` in Cursor to automate the integration.

## Notes

- These files are designed as patches, not guaranteed drop-in replacements for every project structure.
- Your repo already has existing node components and evaluator logic. Merge carefully.
- The `evaluateFinalResults.example.ts` file is a reference implementation, not a full evaluator.
