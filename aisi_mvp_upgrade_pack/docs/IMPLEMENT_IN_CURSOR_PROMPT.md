# Cursor Prompt — Implement AISI Node Upgrades

Use this in Cursor at the project root.

---

Implement the following upgrades in my existing React + TypeScript + React Flow project (AISI) without changing the current visual language.

Goals:
1) Add a new **Person** node type to the Nodes page
2) Make **Final Results** node detailed and reactive to computed graph outputs
3) Increase visibility of the background astrological wheel slightly (still subtle)
4) Keep connection logic astrologically constrained with typed ports

Important constraints:
- Do not break existing node types or templates
- Preserve current minimal UI style
- Keep line-based and soft-color design
- Use my current store/state architecture if possible
- If a file/path differs, search for the equivalent and patch it there

## Tasks

### A. Add Person node type
- Add node type `person`
- Add port type `personProfile`
- Add `PersonNode` React Flow custom component
- Register it in the nodeTypes map
- Add it to the left Add Node library
- Add default data in createNode factory:
  - name
  - birthDate
  - birthTime
  - birthPlace

### B. Connection validation
- Update connection validation to support `personProfile`
- Allow `personProfile -> finalInput` for MVP
- Keep invalid connections blocked and show current invalid tooltip behavior

### C. Final Results node upgrade
- Replace the current thin Final Results node with a detailed version:
  - Tabs: Full / Option A / Option B
  - Full mode shows: Alignment, Volatility, Dominant Aspect, Dominant House, Window, Support, Friction
  - Option A/B show compare score blocks
- Keep only one input handle on the left (`finalInput`)
- Use existing style tokens if available, otherwise add CSS variables safely

### D. Graph evaluator hookup
- Update graph evaluation so Final Results node receives aggregated summary data from upstream nodes
- If no upstream data exists, show sensible defaults (not blank)
- If a Person node is connected, append person name in final summary text/hint

### E. Astro wheel background
- Increase wheel ring/spoke visibility slightly
- Keep it in the background
- Do not let it overpower node readability

### F. Nice-to-have template (optional)
- Add a "Relationship Check" template that drops:
  Person + Natal Planet + Transit Planet + Aspect + Decision Score + Final Results

## Patch source files
Use the files in `aisi_mvp_upgrade_pack/src/features/nodes/...` as the implementation reference and merge them into the existing codebase.
If my project already has these files, patch rather than overwrite blindly.

## Acceptance criteria
- I can add a Person node from the left sidebar
- I can connect nodes and invalid connections are blocked
- Final Results node shows detailed results, not just a placeholder
- The background wheel is slightly more visible
- Existing graph behavior still works

---

If you need to choose between changing architecture or shipping quickly, prefer the smallest safe patch that works end-to-end.
