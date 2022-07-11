import React, { Suspense } from "react";

export default function Subway(props) {

  const tilesPerRow = Math.floor(props.windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(props.windowWidth / tilesPerRow);
  const targetRowCount = Math.floor(props.windowHeight / tileSize);
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
        width: `calc(100vw + ${2 * tileSize}px)`,
        height: "100vh",
        marginLeft: `-${tileSize}px`,
        ...props.mode.gridStyle,
      }}
    >
      {tiles}
    </div>
  );
}
