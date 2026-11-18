// tests/game.test.js — checks that the game code (Cats, Customers) really uses
// the rules on the game state. tests/rules.test.js alone can't see this: if
// Cats.refillAll took the coins but forgot to feed the cats, every rules
// test would still pass.
//
// cats.js and customers.js are browser scripts (they use globals), so we
// load them the way index.html does: all scripts into one shared scope.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function loadGame() {
  const files = ["config.js", "rules.js", "cats.js", "customers.js"];
  const code = files.map((f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n;\n");
  const scope = vm.createContext({ window: { location: { search: "" } }, URLSearchParams });
  vm.runInContext(code + "\n;this.Cats = Cats; this.Customers = Customers;", scope);
  return scope;
}

function stateWith(coins, fullnessList) {
  return { coins, cats: fullnessList.map((fullness) => ({ fullness })) };
}

test("game: Refill takes 10 coins and feeds every cat in the state", () => {
  const { Cats } = loadGame();
  const state = stateWith(50, [0, 80]);
  assert.strictEqual(Cats.refillAll(state), true);
  assert.strictEqual(state.coins, 40);
  assert.deepStrictEqual(state.cats.map((c) => c.fullness), [30, 100]);
});

test("game: Refill with too few coins changes nothing", () => {
  const { Cats } = loadGame();
  const state = stateWith(9, [5]);
  assert.strictEqual(Cats.refillAll(state), false);
  assert.strictEqual(state.coins, 9);
  assert.strictEqual(state.cats[0].fullness, 5);
});

test("game: Cats.isHungry and Customers.paymentFor read the cats' fullness", () => {
  const { Cats, Customers } = loadGame();
  assert.strictEqual(Cats.isHungry({ fullness: 29 }), true);
  assert.strictEqual(Cats.isHungry({ fullness: 30 }), false);
  assert.strictEqual(Customers.paymentFor(stateWith(0, [29, 30, 100])), 30);
});
