# Building Waypoint with Claude Code

Deadline: **Monday Oct 26, 12:00 PM ET.** Aim to finish prompts 1 to 6 tonight, record the video, and submit Monday morning with time to spare.

## Before you open Claude Code

- [ ] Create a **public** GitHub repo called `waypoint`, clone it, and unzip this starter into it. Check that `CLAUDE.md` is at the top level; Claude Code reads it automatically.
- [ ] **Anthropic API key:** console.anthropic.com → API Keys. Add a little credit and set a monthly spend limit.
- [ ] **VA API key:** developer.va.gov, for the Facilities API. If it isn't ready tonight, skip it; the pipeline uses its fallback.
- [ ] Copy `.env.example` to `.env` and paste in both keys. `.env` is already in `.gitignore`.
- [ ] A Netlify account connected to your GitHub.
- [ ] Open a terminal in the repo folder and start Claude Code.

## Prompts (paste one at a time)

Wait for each one to finish, and check the result in your browser before pasting the next.

### 1. App shell
```
Read CLAUDE.md fully. Do build step 1: scaffold the Vite + React + TypeScript app in web/ with the five tabs (Home, Health, Education, Work, Ask), the crisis banner, the header with the logo, wordmark, and county chip, the county/ZIP picker, the ResourceCard, and the footer disclaimer, following the Brand section exactly. Use a tiny seed data/resources.json with 2 records per tab, clearly marked as example data. Ask can be a placeholder for now. Run it, fix any errors, commit, and tell me how to open it.
```

### 2. Real data
```
Do build step 2. Build data/zip_county.json with pipeline/build_zip_county.py from the Census file listed in pipeline/sources.yaml. Then replace the seed records in data/resources.json with real ones: the 9 county veterans service agencies, the VA medical centers, clinics, and Vet Centers located in the 9 counties, and every program in the "Tab content" section of CLAUDE.md, plus the HESC and NYS Career Center office records that program cards point to with who_to_ask. Open every source page yourself and use only facts that are on it; open any URL marked verify: true before trusting it. Set last_verified to today. Finish with a table of every record and its source, and a list of anything you couldn't verify. Commit.
```

### 3. Assistant
```
Do build step 3: netlify/functions/ask.ts and the Ask tab, following "Assistant flow" in CLAUDE.md exactly, with web/src/lib/crisis.ts and web/src/lib/scrub.ts shared by the browser and the function. Write Vitest tests for crisis detection, PII scrubbing, the hand-off check, and the cite check, and make them pass. Run it with netlify dev using my .env and show me the actual responses for checks 1, 3, 6, and 8. Commit.
```

### 4. Pipeline
```
Do build step 4: write pipeline/models.py, va_facilities.py, fetch.py, extract.py, and validate.py so they match .github/workflows/update-resources.yml exactly (same commands, validate.py --report writes markdown, non-zero exit on hard errors), plus a pytest test for validate.py. Run the whole pipeline locally once and show me report.md. Explain any change it makes to data/resources.json. Commit.
```

### 5. Deploy
```
Do build step 5: add netlify.toml (build web/, functions in netlify/functions, include data/** in the function bundle) and a README with setup and run steps, then push to GitHub. Give me the exact clicks for Netlify (import repo, ANTHROPIC_API_KEY env var) and GitHub (ANTHROPIC_API_KEY and VA_API_KEY secrets, workflow permissions set to read/write with "Allow GitHub Actions to create and approve pull requests").
```
Then do those clicks yourself. On GitHub, go to Actions → Update resources → **Run workflow**, check the pull request's Netlify preview, and merge.

### 6. Run every check
```
Do build step 6: run all 11 checks in CLAUDE.md against the live site at [paste your Netlify URL]. Give me a pass/fail table, fix any failures, redeploy, and re-run until all pass. Then do an accessibility pass at 375px width: text size, contrast, tap targets, keyboard focus. Commit.
```

### 7. Wrap up
```
Finish AI_USE.md so it's complete and honest: what you generated, what I wrote or decided, and how the app uses Claude at runtime. Then list the 3 hardest technical problems in this build and how we solved them, in plain words, so I can pick one for my submission form.
```

## After Claude Code (only you can do these)

- [ ] **Form doc, technical difficulty:** rewrite it from prompt 7's list in your own words. Keep it in your voice, with no dashes.
- [ ] **Form doc, inspiration:** fill in your own real moment.
- [ ] **Form doc, AI disclosure:** fill it in from `AI_USE.md`.
- [ ] **Form doc, matching the build:** if you cut anything (like the pipeline), remove it from the answers so they match what you actually built.
- [ ] Record the 1 to 3 minute demo using the outline in the form doc, and upload it to YouTube as unlisted.
- [ ] Submit at congressionalappchallenge.us under NY-23 before noon, and save your Submission ID.

**If time runs short:** cut prompt 4 (the pipeline) before anything else. The app works on the verified data from prompt 2. Never skip prompt 6.
