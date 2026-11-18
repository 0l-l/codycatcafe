// tests/rules.test.js — run with: node --test
// Expected numbers come from SPEC.md (not from config.js), so a wrong
// number in config.js is caught too.
const test = require("node:test");
const assert = require("node:assert");
const Rules = require("../rules.js");

// ---- isHungry (SPEC 2.2: hungry below 30) ----

test("isHungry: a cat is hungry only when fullness is below 30", () => {
  assert.strictEqual(Rules.isHungry(0), true);
  assert.strictEqual(Rules.isHungry(29), true);
  assert.strictEqual(Rules.isHungry(30), false); // exactly 30 is NOT hungry
  assert.strictEqual(Rules.isHungry(100), false);
});

// ---- refill (SPEC 2.2: costs 10, +30 to every cat, max 100) ----

test("refill: costs 10 coins and adds 30 fullness to every cat", () => {
  const r = Rules.refill(50, [0, 40]);
  assert.deepStrictEqual(r, { ok: true, coins: 40, fullness: [30, 70] });
});

test("refill: fullness never goes above 100", () => {
  const r = Rules.refill(50, [80, 100]);
  assert.deepStrictEqual(r.fullness, [100, 100]);
});

test("refill: exactly 10 coins is enough and leaves 0", () => {
  const r = Rules.refill(10, [50]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.coins, 0);
});

test("refill: with 9 coins nothing changes", () => {
  const r = Rules.refill(9, [5, 20]);
  assert.deepStrictEqual(r, { ok: false, coins: 9, fullness: [5, 20] });
});

test("refill: does not change the array it was given", () => {
  const before = [10, 20];
  Rules.refill(50, before);
  assert.deepStrictEqual(before, [10, 20]);
});

// ---- payment (SPEC 2.4: 20 + 5 per cat with fullness >= 30) ----

test("payment: no cats pays the base 20", () => {
  assert.strictEqual(Rules.payment([]), 20);
});

test("payment: each fed cat adds 5", () => {
  assert.strictEqual(Rules.payment([100, 100, 100]), 35);
});

test("payment: a cat at 30 counts as fed, a cat at 29 does not", () => {
  assert.strictEqual(Rules.payment([30]), 25);
  assert.strictEqual(Rules.payment([29]), 20);
  assert.strictEqual(Rules.payment([29, 30, 0]), 25);
});
