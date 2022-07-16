import ScratchGrid from "./grids/scratchGrid";
import Stacked from "./grids/stacked";
import Subway from "./grids/subway";



export const modes = [
  // {
  //   // "Stratchpad" mode for testing ideas and isolating problems
  //   name: "Scratchpad",
  //   background: "#ccc",
  //   targetSize: 80,
  //   Grid: ScratchGrid,
  //   Tile: () => import("./tiles/gems"),
  // },
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
  //   name: "Mermaid",
  //   background: "#eee",
  //   targetSize: 40,
  //   Grid: Grids.Subway,
  //   Tile: () => import("./tiles/mermaid"),
  // },
];

