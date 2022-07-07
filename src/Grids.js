import React, { useState, useLayoutEffect } from "react";

const Scratch = (props) => {
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
          row={i + " / " + i}
          column={j + " / " + j}
          size={tileSize}
          mode={props.mode}
        />
      );
    }
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        ...props.mode.gridStyle,
        height: "100vh",
      }}
    >
      {tiles}
    </div>
  );
};

const Stacked = (props) => {
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
          row={i + " / " + i}
          column={j + " / " + j}
          size={tileSize}
          mode={props.mode}
        />
      );
    }
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        height: "100vh",
        ...props.mode.gridStyle,
      }}
    >
      {tiles}
    </div>
  );
};

const Diagonal = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const tilesPerRow = Math.floor(windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(windowHeight / tileSize);
  const rowCount = targetRowCount + 1;
  const tiles = [];

  for (let i = 1; i <= rowCount; i++) {
    let tilesThisRow =
      i % 2 ? Math.ceil(tilesPerRow / 2) : Math.ceil(tilesPerRow / 2);
    for (let j = 1; j <= tilesThisRow; j++) {
      let gridColumn =
        i % 2 ? `${j * 2 - 1} / ${j * 2 + 1}` : `${j * 2} / ${j * 2 + 2}`;
      tiles.push(
        <props.mode.Tile
          column={j}
          gridColumn={gridColumn}
          gridRow={`${i} / ${i}`}
          key={i + "/" + j}
          mode={props.mode}
          row={i}
          size={tileSize}
          value={i + "/" + j}
        />
      );
    }
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        marginLeft: "-" + Math.ceil(tileSize * 1) + "px",
        marginTop: "-" + Math.ceil(tileSize * 0.5) + "px",
        width: tilesPerRow * tileSize + "px",
        height: targetRowCount * tileSize + "px",
        ...props.mode.gridStyle,
      }}
    >
      {tiles}
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

export { Stacked, Diagonal, Scratch };
