// sprites.js — pixel art for the shop props (door, food bowl, seats).
// Each sprite is a grid of letters; one letter = one pixel, "." = transparent.
// Letters map to the color variables in style.css, so recolor them there.

const SPRITES = {
  PIXEL_SIZE: 3, // screen pixels per art pixel

  COLORS: {
    o: "--ink",       // outline
    w: "--wood",
    d: "--wood-dark",
    p: "--panel",     // window glass
    a: "--accent",    // door knob, bowl
  },

  door: [
    "..oooooooo..",
    ".owwwwwwwwo.",
    "owwwwwwwwwwo",
    "owppppppwwwo",
    "owpppppdwwwo",
    "owddddddwwwo",
    "owwwwwwwwwwo",
    "owddddddwwwo",
    "owdwwwwdwwwo",
    "owdwwwwdwawo",
    "owdwwwwdwawo",
    "owdwwwwdwwwo",
    "owddddddwwwo",
    "owwwwwwwwwwo",
    "owddddddwwwo",
    "owdwwwwdwwwo",
    "owddddddwwwo",
    "oooooooooooo",
  ],

  bowl: [
    "....d.dd.d....",
    "..dwddwdwdd...",
    "oooooooooooooo",
    "oappaaaaaaaaao",
    ".oaaaaaaaaaao.",
    "..oaaaaaaaao..",
    "...oooooooo...",
  ],

  seat: [
    "..oooooooo..",
    "..owwwwwwo..",
    "..owddddwo..",
    "..owwwwwwo..",
    "..owddddwo..",
    "..owwwwwwo..",
    "oooooooooooo",
    "oaaaaaaaaaao",
    "owwwwwwwwwwo",
    "oooooooooooo",
    ".ow......wo.",
    ".ow......wo.",
    ".ow......wo.",
    ".od......do.",
    ".oo......oo.",
  ],
};

// Turn a sprite grid into an inline SVG string (runs of one color become one rect).
function pixelSprite(rows, label) {
  const size = SPRITES.PIXEL_SIZE;
  const w = rows[0].length;
  const h = rows.length;
  let rects = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < w) {
      const ch = row[x];
      let end = x + 1;
      while (end < w && row[end] === ch) end++;
      if (ch !== ".") {
        rects += `<rect x="${x}" y="${y}" width="${end - x}" height="1" style="fill: var(${SPRITES.COLORS[ch]})"/>`;
      }
      x = end;
    }
  });
  return `<svg class="sprite" viewBox="0 0 ${w} ${h}" width="${w * size}" height="${h * size}" shape-rendering="crispEdges" role="img" aria-label="${label}">${rects}</svg>`;
}
