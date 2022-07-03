import React, { useLayoutEffect, useState } from "react";
import "./App.css";

const Tile = (props) => {
  const [color, setColor] = useState("#eee");

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const random = Math.floor(Math.random() * 16777215).toString(16);
    setColor("#" + random);
  }
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
        <Tile key={i + "/" + j} value={i + "/" + j} row={i} column={j} />
      );
    }
  }
  return tiles;
};

const App = (props) => {
  return (
    <div className="App">
      <div className="grid">
        <Grid />
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
