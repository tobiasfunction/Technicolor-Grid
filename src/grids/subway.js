import React, { Suspense } from "react";

export default function Subway(props) {

  // TODO: rework this column/row math. It currently does weird things at certain sizes.

  const tilesPerRow = Math.floor(props.windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(props.windowWidth / tilesPerRow);
  const targetRowCount = Math.ceil(props.windowHeight / tileSize);
  const rowCount = targetRowCount;
  const tiles = [];
  let counter = 1;
  const Tile = React.useMemo(() => {return React.lazy(props.mode.Tile);}, [props.mode])

  for (let i = 1; i <= rowCount; i++) {
    let tilesThisRow =
      i % 2 ? Math.ceil(tilesPerRow / 2) + 1 : Math.ceil(tilesPerRow / 2);
    for (let j = 1; j <= tilesThisRow; j++) {
      let gridColumn =
        i % 2 ? `${j * 2 - 1} / ${j * 2 + 1}` : `${j * 2} / ${j * 2 + 2}`;
      let gridRow = `${i * 2 - 1} / ${i * 2 + 1}`;

      let gridArea= i % 2 ? `${i} / ${j * 2 - 1} / ${i} / ${j * 2 + 1}` : `${i} / ${j * 2} / ${i } / ${j * 2 + 2}`
      tiles.push(
        <Suspense key={i + "/" + j}>
          <Tile
            row={i}
            column={j}
            gridArea={gridArea}
            mode={props.mode}
            size={tileSize}
            value={i + "/" + j}
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
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
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
