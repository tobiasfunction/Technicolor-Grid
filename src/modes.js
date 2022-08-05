// Basic layouts
const stacked = (i, j) => `${i} / ${j} / ${i} / ${j}`;
const subway = (i, j) =>
  (i % 2 ? [i, j * 2 - 1, i, j * 2 + 1] : [i, j * 2, i, j * 2 + 2]).join(" / ");

export const modes = [
  // {
  //   name: "Classic",
  //   alias: "classic",
  //   background: "#ccc",
  //   cellTargetSize: 80,
  //   Layout: Stacked,
  //   Tile: () => import("./tiles/classic"),
  // },
  // {
  //   name: "Gems",
  //   alias: "gems",
  //   background: "#fff",
  //   cellTargetSize: 50,
  //   Layout: Stacked,
  //   Tile: () => import("./tiles/gems"),
  //   gridStyle: { filter: "blur(1px)" },
  // },
  // {
  //   name: "Tunnels",
  //   alias: "tunnels",
  //   background: "#000",
  //   cellTargetSize: 120,
  //   Layout: Stacked,
  //   Tile: () => import("./tiles/tunnels"),
  //   gridStyle: {},
  // },
  // {
  //   name: "Neon",
  //   alias: "neon",
  //   background: "#000",
  //   cellTargetSize: 100,
  //   Layout: Stacked,
  //   Tile: () => import("./tiles/neon"),
  //   gridStyle: {},
  //   gridListen: true,
  // },
  // {
  //   name: "Soft Plaid",
  //   alias: "soft-plaid",
  //   cellTargetSize: 60,
  //   plusRows: 1,
  //   plusCols: 1,
  //   Layout: Stacked,
  //   Tile: () => import("./tiles/softPlaid"),
  // },
  // {
  //   name: "Spectrum",
  //   alias: "spectrum",
  //   background: "#000",
  //   cellTargetSize: 60,
  //   plusCols: 2,
  //   Layout: Subway,
  //   Tile: () => import("./tiles/spectrum"),
  // },
  // {
  //   name: "Mood Rings",
  //   alias: "mood-rings",
  //   background: "#000",
  //   cellTargetSize: 100,
  //   plusRows: 2,
  //   plusCols: 2,
  //   Layout: Stacked,
  //   Tile: () => import("./tiles/moodRings"),
  // },
  // {
  //   name: "Tile Drop",
  //   alias: "tile-drop",
  //   background: "#33c",
  //   cellTargetSize: 90,
  //   Tile: () => import("./tiles/tileDrop"),
  //   hidden: true,
  // },
  // {
  //   name: "Mermaid",
  //   alias: "mermaid",
  //   background: "hsl( 215, 75%, 90%)",
  //   cellTargetSize: 40,
  //   plusRows: 1,
  //   plusCols: 2,
  //   Layout: Subway,
  //   Tile: () => import("./tiles/mermaid"),
  // },
  {
    // "Stratchpad" mode for testing ideas and isolating problems
    // https://tobiasfunction.github.io/color-grid/?mode=scratch

    name: "Scratchpad",
    alias: "scratch",
    background: "#ccc",
    cellTargetSize: 80,
    tileClassName: "spectrum",
    // Layout: ScratchGrid,
    layout: stacked,
    Tile: () => import("./tiles/scratch"),
    hidden: true,
  },
];
