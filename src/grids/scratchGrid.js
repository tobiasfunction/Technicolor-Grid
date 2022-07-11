import React, { Suspense } from "react";

export default function ScratchGrid(props) {
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
          value={i + "/" + j}
          key={i + "/" + j}
          row={i + " / " + i}
          column={j + " / " + j}
          counter={counter}
          size={tileSize}
          mode={props.mode}
        />
      );
      counter++;
    }
  }

  return (
    <div
      key={0}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        ...props.mode.gridStyle,
        height: "100vh",
      }}
    >
      <Suspense>{tiles}</Suspense>
    </div>
  );
}
