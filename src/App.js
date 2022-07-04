import "./App.css";
// import { Basic, Neon, Pastel, Tunnels } from "./Modes.js";
import * as Tiles from "./Tiles";
import React, { useLayoutEffect, useState } from "react";

const modes = () => [
  { name: "Basic", background: "#ccc", Grid: BasicGrid, Tile: Tiles.BasicTile },
  { name: "Pastel", background: "#fff", Grid: BasicGrid, Tile: Tiles.Pastel },
  { name: "Tunnels", background: "#000", Grid: BasicGrid, Tile: Tiles.Tunnels },
  { name: "Neon", background: "#000", Grid: BasicGrid, Tile: Tiles.Neon },
];

const BasicGrid = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const tilesPerRow = Math.floor(windowWidth / 100);
  const tileDim = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(window.innerHeight / tileDim);
  const tiles = [];

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <props.mode.Tile
          key={i + "/" + j}
          value={i + "/" + j}
          row={i}
          column={j}
          mode={props.mode}
        />
      );
    }
  }
  return tiles;
};

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
      <div className="grid">
        <BasicGrid mode={currentMode} />
      </div>
    </div>
  );
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default App;
