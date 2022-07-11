import React, { Suspense } from "react";

export default function Stacked(props) {
  const tilesPerRow = Math.floor(props.windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(props.windowWidth / tilesPerRow);
  const targetRowCount = Math.floor(props.windowHeight / tileSize);
  const tiles = [];
  const Tile = React.lazy(props.mode.Tile);

  let counter = 1;

  for (let i = 1; i <= targetRowCount; i++) {
    for (let j = 1; j <= tilesPerRow; j++) {
      tiles.push(
        <Tile
          key={i + "/" + j}
          value={i + "/" + j}
          row={i + " / " + i}
          column={j + " / " + j}
          size={tileSize}
          mode={props.mode}
          counter={counter}
        />
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
        // height: targetRowCount * tileSize + "px",
        height: "100vh",
        ...props.mode.gridStyle,
      }}
    >
      <Suspense>{tiles}</Suspense>
    </div>
  );
}
