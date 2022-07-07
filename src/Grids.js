import React, { useState, useLayoutEffect, Suspense } from "react";

const Scratch = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const tilesPerRow = Math.floor(windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(windowHeight / tileSize);
  const tiles = [];

  const Tile = React.lazy(props.mode.tile);

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <Suspense fallback={<div>...</div>}>
        <Tile
          key={i + "/" + j}
          value={i + "/" + j}
          row={i + " / " + i}
          column={j + " / " + j}
          size={tileSize}
          mode={props.mode}
        />
        </Suspense>
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

const Subway = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const tilesPerRow = Math.floor(windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.floor(windowHeight / tileSize);
  const rowCount = targetRowCount;
  const tiles = [];
  let counter = 1;

  for (let i = 1; i <= rowCount; i++) {
    let tilesThisRow =
      i % 2 ? Math.ceil(tilesPerRow / 2) : Math.ceil(tilesPerRow / 2);
    for (let j = 1; j <= tilesThisRow; j++) {
      let gridColumn =
        i % 2 ? `${j * 2 - 1} / ${j * 2 + 1}` : `${j * 2} / ${j * 2 + 2}`;
      let gridRow = `${i * 2 - 1} / ${i * 2 + 1}`;
      tiles.push(
        <props.mode.Tile
          column={gridColumn}
          row={`${i} / ${i}`}
          key={i + "/" + j}
          mode={props.mode}
          size={tileSize}
          value={i + "/" + j}
          counter={counter}
        />
      );
      counter++;
      if (counter > 360) counter -= 360
    }
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${props.mode.targetSize}px, 1fr))`,
        // marginLeft: "-" + Math.ceil(tileSize * 1) + "px",
        // marginTop: "-" + Math.ceil(tileSize * 0.5) + "px",
        width: `calc(100vw + ${2 * tileSize}px)`,
        height: "100vh",
        marginLeft: `-${tileSize}px`,
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

export { Stacked, Subway, Scratch };
