import React, { useState, useLayoutEffect, useEffect, Suspense, useTransition } from "react";

const Scratch = (props) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const tilesPerRow = Math.floor(windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(windowHeight / tileSize);
  const tiles = [];
  const Tile = React.lazy(props.mode.tile);

  let counter = 1;

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <Suspense
        key={i + "/" + j}>
          <Tile
            value={i + "/" + j}
            row={i + " / " + i}
            column={j + " / " + j}
            counter={counter}
            size={tileSize}
            mode={props.mode}
          />
        </Suspense>
      );
      counter++;
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
  const Tile = React.lazy(props.mode.Tile);

  let counter = 1;

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <Suspense>
        <Tile
          key={i + "/" + j}
          value={i + "/" + j}
          row={i + " / " + i}
          column={j + " / " + j}
          size={tileSize}
          mode={props.mode}
          counter={counter}
        />
      </Suspense>
      );
      counter++;
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
  const Tile = React.lazy(props.mode.Tile);

  for (let i = 1; i <= rowCount; i++) {
    let tilesThisRow =
      i % 2 ? Math.ceil(tilesPerRow / 2) : Math.ceil(tilesPerRow / 2);
    for (let j = 1; j <= tilesThisRow; j++) {
      let gridColumn =
        i % 2 ? `${j * 2 - 1} / ${j * 2 + 1}` : `${j * 2} / ${j * 2 + 2}`;
      let gridRow = `${i * 2 - 1} / ${i * 2 + 1}`;
      tiles.push(
        <Suspense key={i + "/" + j}>
        <Tile
          column={gridColumn}
          row={`${i} / ${i}`}
          
          mode={props.mode}
          size={tileSize}
          value={i + "/" + j}
          counter={counter}
        />
        </Suspense>
      );
      counter++;
      if (counter > 360) counter -= 360;
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
  const [size, setSize] = useState([0,0]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    function updateSize() {
      startTransition(() => {
      setSize([window.innerWidth, window.innerHeight]); })
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export { Stacked, Subway, Scratch };
