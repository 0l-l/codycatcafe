// rules.js — the game's three money/hunger rules as plain functions.
// They take plain numbers and return results; they never change game state
// or touch the page. The game uses them through Cats and Customers, and
// they can also be run in Node without opening the game:
//   node -e "const Rules = require('./rules.js'); console.log(Rules.payment([100, 29]))"

const Rules = (() => {
  // In the browser CONFIG is the global from config.js; in Node, load it.
  const cfg = typeof module !== "undefined" ? require("./config.js") : CONFIG;

  // SPEC 2.2: a cat is hungry when its fullness is below 30.
  function isHungry(fullness) {
    return fullness < cfg.HUNGRY_BELOW;
  }

  // SPEC 2.2: "Refill food" costs 10 coins and adds 30 fullness to every cat,
  // capped at 100. With too few coins nothing changes.
  // Returns { ok, coins, fullness } where fullness is a new array.
  function refill(coins, fullnessList) {
    if (coins < cfg.FOOD_COST) {
      return { ok: false, coins, fullness: [...fullnessList] };
    }
    return {
      ok: true,
      coins: coins - cfg.FOOD_COST,
      fullness: fullnessList.map((f) => Math.min(cfg.FULLNESS_MAX, f + cfg.FOOD_AMOUNT)),
    };
  }

  // SPEC 2.4: a customer pays 20 + 5 for each cat with fullness >= 30.
  function payment(fullnessList) {
    const fedCats = fullnessList.filter((f) => f < cfg.HUNGRY_BELOW).length;
    return cfg.CUSTOMER_BASE_PAY + cfg.CUSTOMER_BONUS_PER_FED_CAT * fedCats;
  }

  return { isHungry, refill, payment };
})();

if (typeof module !== "undefined") module.exports = Rules;
