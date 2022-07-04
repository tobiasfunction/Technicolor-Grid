import "./App.css";
import { Simple, Pastel, Tunnels } from "./Modes.js";
import React, { useLayoutEffect, useState } from "react";

const Tile = (props) => {
  const mode = props.mode;
  if (mode === "Simple")
    return <Simple row={props.row} column={props.column} />;
  if (mode === "Pastel")
    return <Pastel row={props.row} column={props.column} />;
    if (mode === "Tunnels")
    return <Tunnels row={props.row} column={props.column} />;
  else return <div>Oops</div>;
};

const Grid = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const tilesPerRow = Math.floor(windowWidth / 100);
  const tileDim = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(window.innerHeight / tileDim);
  const tiles = [];

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <Tile
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
  const [currentMode, setCurrentMode] = useState("Simple");

  const Menu = (props) => {
    const simpleBtn = (
      <button onClick={() => setCurrentMode("Simple")}>Simple</button>
    );
    const pastelBtn = (
      <button onClick={() => setCurrentMode("Pastel")}>Pastel</button>
    );
    const tunnelsBtn = (
      <button onClick={() => setCurrentMode("Tunnels")}>Tunnels</button>
    );

    return (
      <div id="buttons">
        <div>
          {simpleBtn} {pastelBtn} {tunnelsBtn}
        </div>
        <div>Current Mode: {currentMode}</div>
        <div>
          View on
          <a href="https://github.com/tobiasfunction/color-grid">Github</a>.
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Menu />
      <div className="grid">
        <Grid mode={currentMode} />
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
