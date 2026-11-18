# HW9 Prompt Log

Prompts 1, 2 and 4 went to Claude Opus 5.5 in claude.ai and were originally written in Chinese; they are translated into English here. Prompt 3 went to a separate, fresh Claude chat and is copied as sent.

## 1. Refactor

**Prompt:** Use https://github.com/0l-l/codycatcafe for HW9. On the `hw9-tests` branch, split the logic for deciding whether a cat is hungry, feeding, and calculating what a customer pays into three functions that can be imported on their own, and have the game keep calling them. Keep the existing gameplay and my changes. Commit this refactor on its own, and don't write tests yet.

**What it did:** Moved the three rules into `rules.js` (`isHungry`, `refill`, `payment`) and had the game call them. Gameplay stayed the same. Commit `36ac2c1`.

## 2. Tests, mutation experiments and CI

**Prompt:** Keep the first test and add more to reach at least 8, covering all three functions. Once they pass with `node --test`, commit the tests on their own and note the commit hash. Do five one-line mutation experiments: each time, change one line of a game rule, run the tests, save the diff and the actual result, then restore it. If a change goes undetected, record it, strengthen the tests, and run again. Set up GitHub Actions so tests run automatically on push and pull request. On `hw9-tests`, push one change that makes the tests fail, then restore it and push again. Keep the links and commit hashes for both the red and the green run. From the passing version, create a separate experiment branch and introduce a game-logic bug that makes the existing tests fail, keeping the test files unchanged. Push the experiment branch and give me the branch name, the starting commit hash, and the failure output.

**What it did:** Wrote 9 tests (`98b6342`) and ran 5 mutations. The tests missed one: Refill took the coins but didn't feed the cats. It added 3 tests that check the real game code (`67b77d5`), and after that all 5 mutations were caught. It also set up GitHub Actions, made the red (`cc8eb3c`) and green (`99f93f5`) commits, and made the experiment branch `exp/payment-bug`, where 3 tests fail. I did the pushing myself.

## 3. Fix the broken branch (fresh AI)

**Prompt:** Please work on branchexp/payment-bug in https://github.com/0l-l/codycatcafe. The test suite is failing. Make it pass.

**What it did:** Found the wrong line in `rules.js` and fixed it without changing any tests. All 12 tests passed. Its push failed because it had no access to my repo.

## 4. Bring the fix back

**Prompt:** Based on the fix conversation and Git diff I gave you, record what the other AI changed, whether it changed the tests, and the actual run results. Bring the reasonable fix back to `hw9-tests`, run the tests, push the final version, and give me the branch link.

**What it did:** Recorded the fix, checked it (12/12 passed), and added it to `hw9-tests` as `2729446`. Tests passed on GitHub.
