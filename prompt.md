
## 1. Write the game spec

**Commit:** `1e44f5b` "Add game spec" (Oct 28, 13:13)

**Request (summary):** Write a full spec for a companion-style cat café game with a top-down shop, a starting cat, feeding, random strays, and customers who pay coins. There should be no game over. Give exact numbers for every rule, a feature list split into P0, P1 and P2, and numbered acceptance criteria.

**Result:** `SPEC.md` (148 lines), including 100 starting coins, room for 3 cats, fullness that drops 1 every 10 seconds, a stray check every 60 seconds at 50%, and customers every 20 seconds who pay 20 coins plus 5 per fed cat.

Written by: [me / AI / both: fill in]

---

## 2. Build the core loop

**Commit:** `5bab70b` "Build core loop: cats, feeding, customers" (Oct 28, 13:25)

**Request (summary):** Build the core of the P0 version from the spec in plain HTML, CSS and JavaScript, with no build step. Cover cats that wander, pause and sleep; fullness and hunger; the Refill food button; clicking a cat for its name, fullness and a heart; and customers who sit, stay 30 seconds and pay once. Pause the game when the tab is in the background, with no catch-up. Add a way to speed up time for testing. Emoji are fine as temporary art.

**Result:** `index.html`, `style.css`, `config.js`, `cats.js`, `customers.js`, `ui.js` and `main.js` (632 lines). Logic files only change the state, and `UI.render` draws it. A `?speed=10` URL option speeds up time.

**Not built in this step:** Strays (criteria 9 to 14).

---

## 3. Write the handoff README

**Commit:** `6a904d9` "Add README" (Oct 28, 13:30)

**Request (summary):** Write a README so another person can take over: how to run it, controls, art direction, status of each acceptance criterion, a code map, and a priority-ordered list of what to do next.

**Result:** `README.md` (121 lines). It records criteria 1 to 8 and 15 to 20 as done, 10 and 21 as partial, and 9, 11 to 14 and 22 to 29 as not started. It says the logic went through a 10-minute automated simulation, and recommends a manual browser check with `?speed=10`.

**Next step it hands over:** Stray cats, the last missing P0 feature, with a suggested design.

---

## Corrections

[Add any follow-up prompts or fixes you remember here.]
