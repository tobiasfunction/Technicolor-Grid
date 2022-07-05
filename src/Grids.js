import React, { useState, useLayoutEffect } from "react";

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
          row={i}
          column={j}
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

export { Stacked };
