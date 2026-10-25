# AI use log

The Congressional App Challenge allows AI tools if their use is fully disclosed. Each entry says what AI produced and what Shawn decided, wrote, or changed.

## Planning (before coding)
- Used Claude (claude.ai) to research NY-23 veteran resources and Rep. Langworthy's veterans record, and to draft the system design, guardrails, and form answers. Shawn picked the idea, the name, the tabs, the logo, and the GitHub Actions hosting, and rewrote the form answers in his own words.

## Build log
<!-- Claude Code appends an entry after each task: date, what it generated, what Shawn decided or changed. -->

### 2026-10-25 · Step 1, app shell
- **Claude Code generated:** the Vite + React + TypeScript app in `web/` (five tabs, header with logo and county chip, crisis banner, county/ZIP picker, resource cards, footer disclaimer, styles), and the seed `data/resources.json` with 8 made-up example records. It tested the app in a browser at phone and desktop widths and fixed a crash it found, where a page-scroll call broke the layout in newer browsers.
- **Shawn decided:** the tabs, brand colors, logo, screen layout, and card contents, all set in CLAUDE.md before coding. Review in the browser is up next.

## How the app uses AI at runtime
<!-- Fill in at the end: extraction in the pipeline, answers in the Ask tab, and the code checks around both. -->
