import ScratchGrid from "./grids/scratchGrid";
import Stacked from "./grids/stacked";
import Subway from "./grids/subway";

export const modes = [
  {
    name: "Classic",
    alias: "classic",
    background: "#ccc",
    targetSize: 80,
    Grid: Stacked,
    Tile: () => import("./tiles/classic"),
  },
  {
    name: "Gems",
    alias: "gems",
    background: "#fff",
    targetSize: 50,
    Grid: Stacked,
    Tile: () => import("./tiles/gems"),
    gridStyle: { filter: "blur(1px)" },
  },
  {
    name: "Tunnels",
    alias: "tunnels",
    background: "#000",
    targetSize: 120,
    Grid: Stacked,
    Tile: () => import("./tiles/tunnels"),
    gridStyle: {},
  },
  {
    name: "Neon",
    alias: "neon",
    background: "#000",
    targetSize: 100,
    Grid: Stacked,
    Tile: () => import("./tiles/neon"),
    gridStyle: {},
  },
  {
    name: "Soft Plaid",
    alias: "soft-plaid",
    targetSize: 60,
    Grid: Stacked,
    Tile: () => import("./tiles/softPlaid"),
  },
  {
    name: "Spectrum",
    alias: "spectrum",
    background: "#000",
    targetSize: 60,
    Grid: Subway,
    Tile: () => import("./tiles/spectrum"),
  },
  {
    name: "Mood Rings",
    alias: "mood-rings",
    background: "#000",
    targetSize: 100,
    Grid: Stacked,
    Tile: () => import("./tiles/moodRings"),
  },
  // {
  //   name: "Tile Drop",
  //   alias: "tile-drop",
  //   background: "#33c",
  //   targetSize: 90,
  //   Grid: Stacked,
  //   Tile: () => import("./tiles/tileDrop"),
  //   hidden: true,
  // },
  {
    name: "Mermaid",
    alias: "mermaid",
    background: "hsl( 215, 75%, 90%)",
    targetSize: 40,
    Grid: Subway,
    Tile: () => import("./tiles/mermaid"),
  },
  {
    // "Stratchpad" mode for testing ideas and isolating problems
    // https://tobiasfunction.github.io/color-grid/?mode=scratch

    name: "Scratchpad",
    alias: "scratch",
    background: "#ccc",
    targetSize: 80,
    Grid: ScratchGrid,
    Tile: () => import("./tiles/scratch"),
    hidden: true,
  },
];
