import "./App.css";
// import { Basic, Neon, Pastel, Tunnels } from "./Modes.js";
import * as Grids from "./Grids";
import * as Tiles from "./Tiles";
import React, { useLayoutEffect, useState } from "react";

const modes = () => [
  {
    name: "Classic",
    background: "#ccc",
    targetSize: 100,
    Grid: Grids.Stacked,
    Tile: Tiles.BasicTile,
  },
  {
    name: "Pastel",
    background: "#fff",
    targetSize: 50,
    Grid: Grids.Stacked,
    Tile: Tiles.Pastel,
    gridStyle: { filter: "blur(1px)" },
  },
  {
    name: "Tunnels",
    background: "#000",
    targetSize: 120,
    Grid: Grids.Stacked,
    Tile: Tiles.Tunnels,
    gridStyle: {},
  },
  {
    name: "Neon",
    background: "#000",
    targetSize: 100,
    Grid: Grids.Stacked,
    Tile: Tiles.Neon,
    gridStyle: {},
  },
];

const App = () => {
  const [currentMode, setCurrentMode] = useState(modes()[0]);
  const modeList = modes();
  const menuOptions = modeList.map((mode) => (
    <button
      onClick={() => setCurrentMode(mode)}
      disabled={currentMode.name === mode.name}
      key={mode.name}
    >
      {mode.name}
    </button>
  ));

  const Menu = (props) => {
    return (
      <div id="buttons">
        <div>{menuOptions}</div>
        <div>
          View on{" "}
          <a href="https://github.com/tobiasfunction/color-grid">Github</a>.
        </div>
      </div>
    );
  };
  //   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  // grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  return (
    <div className="App" style={{ backgroundColor: currentMode.background }}>
      <Menu />
      <currentMode.Grid mode={currentMode} />
    </div>
  );
};

export default App;
