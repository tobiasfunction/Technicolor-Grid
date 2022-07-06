import "./App.css";
import * as Grids from "./Grids";
import * as Tiles from "./Tiles";
import React, { useState } from "react";

const modes = () => [
  // "Stratchpad" mode for testing ideas and isolating problems
  // {
  //   name: "Scratch",
  //   background: "#eee",
  //   targetSize: 100,
  //   Grid: Grids.Scratch,
  //   Tile: Tiles.Scratch,
  // },
  {
    name: "Classic",
    background: "#ccc",
    targetSize: 100,
    Grid: Grids.Stacked,
    Tile: Tiles.BasicTile,
  },
  {
    name: "Gems",
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
  {
    name: "Soft Plaid",
    targetSize: 60,
    Grid: Grids.Scratch,
    Tile: Tiles.SoftPlaid
  }
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
  return (
    <div className="App" style={{ backgroundColor: currentMode.background }}>
      <Menu />
      <currentMode.Grid mode={currentMode} />
    </div>
  );
};

export default App;
