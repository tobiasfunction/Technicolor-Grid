import "./App.css";
// import { Basic, Neon, Pastel, Tunnels } from "./Modes.js";
import * as Tiles from "./Tiles";
import React, { useLayoutEffect, useState } from "react";

const modes = () => [
  { name: "Classic", background: "#ccc", targetSize: 100, Grid: BasicGrid, Tile: Tiles.BasicTile },
  { name: "Pastel", background: "#fff", targetSize: 50, Grid: BasicGrid, Tile: Tiles.Pastel, gridStyle: {filter: "blur(1px)"} },
  { name: "Tunnels", background: "#000", targetSize: 120, Grid: BasicGrid, Tile: Tiles.Tunnels, gridStyle:{} },
  { name: "Neon", background: "#000", targetSize: 100, Grid: BasicGrid, Tile: Tiles.Neon, gridStyle:{} },
];

const BasicGrid = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const tilesPerRow = Math.floor(windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(windowHeight / tileSize);
  const tiles = [];

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <props.mode.Tile
          key={i + "/" + j}
          value={i + "/" + j}
          row={i}
          column={j}
          size={tileSize}
          mode={props.mode}
        />
      );
    }
  }
  return (
    <div className="grid"
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
      gridTemplateRows: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
      ...props.mode.gridStyle
      }}
    >
      {tiles}
    </div>
  )
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
//   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
 // grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  return (
    <div className="App" style={{ backgroundColor: currentMode.background }}>
      <Menu />
        <BasicGrid mode={currentMode} />
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
