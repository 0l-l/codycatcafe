# HW9 Prompt Log — Cozy Cat Café tests

The important prompts I actually sent for HW9, with the tools, model and result for each. Prompts 1, 2 and 4 were written in Chinese and are translated directly into English here; prompt 3 was sent in English and is copied word for word (typo included). Short follow-ups (pasting terminal output back, asking for a branch name) are left out.

## Tools and models

| | Main session | Fix session (prompt 3) |
|---|---|---|
| Model | Claude Opus 5.5 (`claude-opus-5-5`) | Claude, in a separate claude.ai chat (model not shown in the screenshot) |
| Where | claude.ai Project "cmu coding with AI", desktop app linked to my Windows 11 PC | claude.ai |
| Tools it used | Attached and cloned the GitHub repo; a Linux shell with git and Node 22 (`node --test`); file access to my local `codycatcafe` folder (read the repo, wrote patches/bundles/notes back); `gh` CLI to read GitHub Actions runs and logs | Add repo + 5 shell commands (per the chat UI) |
| Could it push? | No: GitHub returned 403 (Claude's GitHub App isn't installed for this repo). It gave me git bundles and I pushed from PowerShell. | No, same reason |

Test stack: Node's built-in `node:test` + `node:assert`, no npm packages. CI: GitHub Actions (`.github/workflows/test.yml`).

---

## 1. Refactor the rules into importable functions

**Tool / model:** main session, Claude Opus 5.5

**Prompt:**
> Use https://github.com/0l-l/codycatcafe for HW9. On the `hw9-tests` branch, split the logic for deciding whether a cat is hungry, feeding, and calculating what a customer pays into three functions that can be imported on their own, and have the game keep calling them. Keep the existing gameplay and my changes. Commit this refactor on its own, and don't write tests yet.

**What happened:** GitHub had no `hw9-tests` branch, so Claude read my local repo and found my unpushed pixel-art commit `709fa94` (the "my changes" to keep). It created `hw9-tests` on top of it.

**Result:** `36ac2c1` "Move hunger, feeding and payment rules into rules.js". New `rules.js` with `Rules.isHungry(fullness)`, `Rules.refill(coins, fullnessList)` and `Rules.payment(fullnessList)`; `Cats` and `Customers` call them. Works in the browser and with `require()` in Node. Checked that the old and new code give identical results on 20,000 random states. No tests in this commit.

---

## 2. Grow the tests, mutation experiments, CI, red/green runs, experiment branch

**Tool / model:** main session, Claude Opus 5.5

**Prompt:**
> Keep the first test and add more to reach at least 8, covering all three functions. Once they pass with `node --test`, commit the tests on their own and note the commit hash. Do five one-line mutation experiments: each time, change one line of a game rule, run the tests, save the diff and the actual result, then restore it. If a change goes undetected, record it, strengthen the tests, and run again. Set up GitHub Actions so tests run automatically on push and pull request. On `hw9-tests`, push one change that makes the tests fail, then restore it and push again. Keep the links and commit hashes for both the red and the green run. From the passing version, create a separate experiment branch and introduce a game-logic bug that makes the existing tests fail, keeping the test files unchanged. Push the experiment branch and give me the branch name, the starting commit hash, and the failure output.

**Result:**
- `98b6342`: `rules.test.js`, 9 tests over the three functions (the first `isHungry` test kept).
- Five one-line mutations: 4 caught, **1 missed**. Commenting out the line in `Cats.refillAll` that writes fullness back still passed all 9 tests.
- `67b77d5`: `game.test.js`, 3 tests that load the game scripts together and check the real state. Re-ran all five mutations: all caught.
- `d0a1510`: GitHub Actions on `push` and `pull_request`.
- Red `cc8eb3c` / green `99f93f5`. Experiment branch `exp/payment-bug` from `99f93f5`, bug commit `b21b76c`, tests untouched, 3 of 12 tests fail.
- Claude's push got a 403, so it gave me `hw9.bundle` and the commands; I pushed from PowerShell. Runs:
  - Red: https://github.com/0l-l/codycatcafe/actions/runs/44211276526 (failure)
  - Green: https://github.com/0l-l/codycatcafe/actions/runs/44211285695 (success)
  - Experiment: https://github.com/0l-l/codycatcafe/actions/runs/44211299183 (failure)

Details of every mutation are in `TESTING.md`.

---

## 3. Hand the failing branch to a fresh AI

**Tool / model:** a separate claude.ai chat (fresh context, no access to the main session)

**Prompt:**
> Please work on branchexp/payment-bug in https://github.com/0l-l/codycatcafe. The test suite is failing. Make it pass.

**What it did:** Read the failing tests and SPEC 2.4, decided the code was wrong (not the tests), and changed one line in `rules.js`:

```diff
-    const fedCats = fullnessList.filter((f) => f < cfg.HUNGRY_BELOW).length;
+    const fedCats = fullnessList.filter((f) => !isHungry(f)).length;
```

**Tests changed?** No. It reported 3 failures before and 12/12 passing after. Its push also got a 403, so nothing reached GitHub (`exp/payment-bug` is still `b21b76c`).

---

## 4. Record the fix and bring it back to `hw9-tests`

**Tool / model:** main session, Claude Opus 5.5

**Prompt:**
> Based on the fix conversation and Git diff I gave you, record what the other AI changed, whether it changed the tests, and the actual run results. Bring the reasonable fix back to `hw9-tests`, run the tests, push the final version, and give me the branch link.

**What happened:** Claude reproduced the fix on `exp/payment-bug` (12/12) and checked that `!isHungry(f)` matches `f >= 30` at 0, 29, 30, 31 and 100. `hw9-tests` never had the bug, so only the improvement came back, not the bug commit.

**Result:** `2729446` "Payment uses isHungry for the fed-cat bonus" (one line in `rules.js`, tests unchanged). I pushed it from `hw9-final.bundle`.
- Final run: https://github.com/0l-l/codycatcafe/actions/runs/44213577621 (success)
- Branch: https://github.com/0l-l/codycatcafe/tree/hw9-tests
