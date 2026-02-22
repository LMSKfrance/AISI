# AISI — Main Idea (MVP) for Cursor

## Core Product Thesis

AISI is a **professional astrology analysis workspace** that turns astrology from passive horoscope reading into a **structured visual system for timing, decisions, and relationship analysis**.

The MVP is centered on one breakthrough interaction:

**A guided node graph for astrology**, where users create nodes (natal planets, transits, aspects, houses, time windows, decisions), connect them with astrologically valid rules, and get readable results in a final output node.

This is not a mystical content app.
This is not a generic SaaS dashboard.

AISI should feel like:
- an **astrological instrument**
- a **decision analysis tool**
- a **clean editorial interface**
- a **modern professional workspace**

---

## MVP Goal (What must work end-to-end)

The MVP must be fully usable for one complete workflow:

1. User enters birth data (date, time, place)
2. App calculates natal chart (basic but accurate)
3. User opens **Nodes workspace**
4. User creates/connects nodes (guided rules)
5. App validates connections
6. App computes derived astrological outputs
7. User sees results in:
   - **Final Results Node**
   - **Right-side Analysis Panel**
   - **Footer Info Bar** (plain-language summary)

This must work on desktop first.
Mobile can be simplified later.

---

## Main User Problem AISI Solves

Astrology users currently face 3 problems:

1. **Horoscope apps are vague**  
   They give generic advice and no real timing logic.

2. **Professional chart tools are powerful but hard to use**  
   They are dense and outdated in UX.

3. **Relationship astrology apps are engaging but not analytical**  
   They rarely show clear chart logic, timing, or aspect structure.

### AISI solves this by:
- making chart logic visual (nodes)
- making timing practical (calendar + time window nodes)
- making outputs structured (scores, aspects, house activation, friction/support windows)

---

## MVP Scope (Must-Have Features Only)

### 1) Birth Data Input + Chart Calculation
Minimal form:
- Date of birth
- Time of birth (optional but supported)
- Place of birth (text input for MVP, geocoding can be mocked or added later)

MVP chart engine must calculate:
- Planet positions (at least Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn)
- Signs
- House placements (whole sign or Placidus — choose one for MVP)
- Basic aspects (conjunction, sextile, square, trine, opposition)
- Orb values

### 2) Nodes Workspace (Core)
A canvas with:
- node creation
- drag/move nodes
- zoom/pan
- connect/disconnect nodes
- typed ports (in/out)
- connection validation
- results recalculation

### 3) Right Analysis Panel
Shows current selected node / graph-derived analysis:
- Active aspects
- House activation
- Alignment/friction score
- Orb precision values
- Summary metrics

### 4) Footer Information Bar
A readable 1–2 paragraph explanation of what the user is currently analyzing in plain language.

### 5) Final Results Node
A special output node that aggregates analysis and provides:
- Full View
- Option A
- Option B

---

## MVP Astrology Model (Keep it Real, Keep it Constrained)

AISI must be astrologically valid enough for serious users and understandable for beginners.

### Source of Truth
The app should use a real astrology calculation layer (preferably Swiss Ephemeris eventually).
For MVP you can:
- use a JS astrology library if stable
- or stub some data for UI
- but architecture must support accurate calculation later

### Core Astrological Objects in MVP
Support only the essentials first:

#### Natal Objects
- Natal Planet Node (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn)
- House Node (1–12)
- Sign Node (optional for MVP if too much)

#### Dynamic Objects
- Transit Planet Node (same 7 planets minimum)
- Time Window Node (single date or date range)

#### Analysis Objects
- Aspect Node
- House Activation Node
- Decision Score Node

#### Outcome Objects
- Final Results Node

---

## Node System — Product Logic (Most Important Part)

### Why Nodes Work
Astrology is already a network:
- planets relate to planets (aspects)
- planets activate houses
- transits interact with natal placements
- timing changes meaning
- decisions depend on context + timing

Nodes make this visible and interactive.

### Critical Rule
This is **not a free-form node toy**.
Connections must be **astrologically constrained**.

---

## Node Types (MVP)

### A. Natal Planet Node
Represents a natal chart planet.

Fields:
- planet name
- sign
- degree
- house
- motion (optional)
- keywords (internal)

Ports:
- out: `planet`

Example:
Natal Moon -> outputs planet data for aspect/house analysis

---

### B. Transit Planet Node
Represents transit planet at selected time/date.

Fields:
- planet name
- sign
- degree
- date
- retrograde (optional)

Ports:
- out: `transitPlanet`

---

### C. House Node
Represents a natal house.

Fields:
- house number
- life domain label (ex: 10th = career)

Ports:
- in: `planet | aspectResult`
- out: `houseActivation`

---

### D. Time Window Node
Represents the selected analysis time.

Fields:
- start date
- end date (optional)
- mode: single day / range

Ports:
- out: `timeContext`

---

### E. Aspect Node (multi-input)
Calculates aspect relationship between two planets (or transit+natal).

Inputs:
- in A: `planet | transitPlanet`
- in B: `planet | transitPlanet`
- in C (optional): `timeContext`

Output:
- out: `aspectResult`

Produces:
- aspect type (conj/square/trine/etc)
- orb value
- intensity
- interpretation tags (support/tension/etc)

This is the key computational node.

---

### F. House Activation Node (multi-input)
Maps planets/aspects into life domains.

Inputs:
- in A: `planet | transitPlanet`
- in B: `houseActivation | house`
- in C (optional): `aspectResult`

Output:
- out: `domainImpact`

Produces:
- activated house(s)
- intensity score
- domain labels (career, relationships, etc)

---

### G. Decision Score Node (multi-input)
MVP differentiator.

Inputs:
- in A: `aspectResult` (multiple)
- in B: `domainImpact` (multiple)
- in C: `timeContext`

Output:
- out: `decisionAnalysis`

Produces:
- alignment score (0–100)
- volatility score
- dominant influence
- friction/support labels
- best/worst windows (if range selected)

This makes AISI useful beyond chart display.

---

### H. Final Results Node (multi-input)
Aggregates everything and presents final UI-friendly outputs.

Inputs:
- `aspectResult`
- `domainImpact`
- `decisionAnalysis`

Outputs (internal UI states):
- Full View
- Option A
- Option B

This node should be visually larger and act like the “conclusion terminal”.

---

## Connection Rules (Typed and Constrained)

This is essential for UX and astrology validity.

### Valid connections (examples)
- Natal Planet -> Aspect Node ✅
- Transit Planet -> Aspect Node ✅
- Time Window -> Aspect Node ✅ (optional)
- Natal Planet -> House Activation Node ✅
- House Node -> House Activation Node ✅
- Aspect Node -> Decision Score Node ✅
- House Activation Node -> Decision Score Node ✅
- Time Window -> Decision Score Node ✅
- Decision Score Node -> Final Results Node ✅
- Aspect Node -> Final Results Node ✅

### Invalid connections (examples)
- Natal Planet -> Final Results Node ❌ (too raw)
- Time Window -> House Node ❌
- House Node -> Aspect Node ❌
- Random node type to any input ❌

### UX behavior
- Valid ports highlight softly on drag
- Invalid ports remain muted
- On invalid drop show tooltip:  
  `"Invalid connection: House nodes cannot feed Aspect calculations directly."`

---

## Result Logic (MVP, Practical and Honest)

### AISI should not pretend to “predict destiny”
Outputs must be structured and readable.

### What MVP results should show

#### In Final Results Node
- **Alignment Score** (0–100)
- **Volatility** (Low / Medium / High)
- **Dominant Factors** (ex: Saturn square Moon, 10th house activation)
- **Context Summary**
- Tabs:
  - Full View
  - Option A
  - Option B (if user compares dates/ranges)

#### In Right Panel
- Selection Analysis
- Active Aspects (sorted by orb)
- House Activation (simple bars)
- Aspect concentration
- Orb precision
- Recommended interpretation language (neutral)
  - Support window
  - Friction window
  - Timing sensitivity

#### In Footer Info Bar
1–2 short paragraphs max in plain language.

Example:
> You are analyzing a decision scenario through natal Moon and transit Saturn during the selected time window. A tight square aspect (orb 1.1°) increases friction and emotional pressure, with strongest activation in the 10th house (career), suggesting higher resistance around commitments and authority structures.

---

## UX Principles (MVP)

### 1) Guided complexity
Beginners must not be overwhelmed.
Professionals must not feel constrained.

For MVP:
- include **node templates**
- include **suggested connections**
- include **tooltips for every action**

### 2) Explain every action
Every node connection/disconnection should trigger a small tooltip:
- what user did
- what it means astrologically

Example:
- UI: “Connected Transit Saturn to Natal Moon via Aspect Node”
- Astro meaning: “This checks current pressure/responsibility themes against emotional regulation patterns.”

### 3) Keep visual design calm
- no mystical visuals
- no old astrology website look
- no generic SaaS cards
- no shadows
- soft neutral palette
- precise lines and typography

---

## MVP Screens (Cursor Build Priority)

### Screen 1 — Onboarding / Birth Data
- form inputs
- calculate button

### Screen 2 — Main Workspace (Nodes)
Main layout:
- Left sidebar: node library
- Center: node canvas (with faint natal wheel background)
- Right panel: analysis results
- Bottom footer: info bar / telemetry
- Top bar: controls (auto layout, add node, run calculation)

### Screen 3 — Optional Simple Calendar Panel (MVP-lite)
If time allows:
- a small date picker / range picker linked to Time Window Node
- no full astrology calendar heatmap yet
- just enough to drive transit calculations

---

## MVP Node Templates (Strongly Recommended)

To help adoption, ship with 3 templates:

### Template A — Decision Check
Auto-creates:
- Natal Planet (selected)
- Transit Planet
- Aspect Node
- House Node
- House Activation Node
- Time Window Node
- Decision Score Node
- Final Results Node

### Template B — Transit Impact
Auto-creates:
- Transit Planet
- Natal Planet
- Aspect Node
- Final Results Node

### Template C — Career Timing
Auto-creates:
- Natal Sun (or Saturn)
- 10th House
- Transit Saturn/Mars
- Aspect Node
- House Activation Node
- Decision Score Node
- Final Results Node

Templates make the app feel smart immediately.

---

## MVP Technical Architecture (Recommended)

### Frontend
- React + TypeScript
- Zustand (or Redux Toolkit) for graph/app state
- React Flow (recommended) for node graph canvas
- Tailwind CSS (or clean CSS modules)
- date-fns / dayjs for time handling

### Graph Engine (Core)
Build a small internal evaluation engine:
- node registry (type definitions)
- port type system
- connection validator
- topological graph evaluation
- result cache
- recompute only affected downstream nodes

### Astrology Engine
For MVP:
- use an astrology JS library if reliable
- or mock chart + transit data and build architecture cleanly
- but design interfaces to later swap in Swiss Ephemeris backend

Suggested abstraction:
- `AstroService.calculateNatalChart()`
- `AstroService.calculateTransits(dateRange)`
- `AstroService.calculateAspect(objA, objB)`
- `AstroService.getHouseActivation(...)`

This keeps the product future-proof.

---

## Data Model (MVP-Level)

### UserProfile
- id
- name
- birthDate
- birthTime
- birthLocation
- timezone
- natalChartData

### GraphProject
- id
- userProfileId
- name
- nodes[]
- edges[]
- createdAt
- updatedAt

### NodeInstance
- id
- type
- position
- config
- computedOutput
- uiState

### EdgeInstance
- id
- sourceNodeId
- sourcePort
- targetNodeId
- targetPort

---

## Scoring Logic (MVP, Simple but Defensible)

Keep scoring transparent and adjustable later.

### Decision Alignment Score (0–100)
Derived from:
- aspect weights (supportive vs challenging)
- orb tightness (tighter = stronger)
- house relevance (especially if user tags decision category)
- transit intensity concentration

### Volatility
Derived from:
- number of challenging aspects
- intensity clustering
- Saturn/Mars/Uranus emphasis (if included later)
- tight orb concentration

Do not overclaim precision.
Show it as a **decision support index** not an absolute truth.

---

## Category Mapping (Useful for Decisions MVP)

When user selects a decision category, weight relevant houses:

- Career → 10th, 6th, 2nd
- Relationship → 7th, 5th, 8th
- Money → 2nd, 8th, 10th
- Travel → 3rd, 9th
- Health → 6th, 1st
- Personal → 1st, 4th, 12th

This immediately makes the app feel thoughtful and useful.

---

## What Makes AISI Different (Brand-Level)

AISI should become the first astrology app that feels like:
- a **visual analysis OS**
- a **timing and decision workspace**
- a **professional but human-readable instrument**

Most astrology products are:
- horoscope feeds
- dense chart calculators
- social compatibility apps

AISI is:
**chart logic + timing + decisions + graph-based interpretation**

That is the “god idea.”

---

## MVP Success Criteria

The MVP is successful if a user can:

1. Enter birth data
2. Create a node graph with at least 4–6 nodes
3. Connect valid astrological nodes
4. See invalid connections blocked clearly
5. Run calculation
6. Get readable results (score + aspects + house activation + summary text)
7. Understand what they just did astrologically from tooltips/footer

If this works smoothly and looks clean, AISI already has a strong unique product identity.

---

## Future Extensions (Not MVP, but architecture should allow)

- Full astrology calendar heatmap
- Synastry / Compare workspace
- Progressions
- Solar return / lunar return
- Composite charts
- Report exports (PDF)
- Beginner/Pro mode toggle
- Saved templates marketplace
- AI-assisted explanation layer (optional, later)

---

## Final Product Principle

AISI must never feel like fake certainty.

It should feel like:
**“A precise system for exploring timing and patterns through astrology.”**

Clarity over mysticism.
Structure over content fluff.
Professional depth with beginner guidance.