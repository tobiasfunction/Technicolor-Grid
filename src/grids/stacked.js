import React, { useState, Suspense } from "react";

export default function Stacked(props) {
  const numCols = Math.floor(props.windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(props.windowWidth / numCols);
  const numRows = Math.ceil(props.windowHeight / tileSize);
  const Tile = React.useMemo(() => {
    console.log(props.mode.gridListen);
    return React.lazy(props.mode.Tile);
  }, [props.mode]);

  const totalTiles = numCols * numRows;
  const modeTiles = [];
  const listenerTiles = [];
  const [activeRow, setActiveRow] = useState();
  const [activeCol, setActiveCol] = useState();

  let counter = 1;

  for (let i = 1; i <= numRows; i++) {
    for (let j = 1; j <= numCols; j++) {
      modeTiles.push(
        <Tile // MODE TILE
          key={i + "/" + j}
          value={i + "/" + j}
          row={i}
          column={j}
          gridArea={`${i} / ${j} / ${i} / ${j}`}
          mode={props.mode}
          counter={counter}
          totalTiles={totalTiles}
          activeRow={activeRow}
          activeCol={activeCol}
        />
      );

      if (props.mode.gridListen) {
        listenerTiles.push(
          <div
            className="tile listen"
            key={"l" + i + "/" + j}
            style={{
              gridArea: `${i} / ${j} / ${i} / ${j}`,
            }}
            onMouseMove={() => {
              setActiveRow(i);
              setActiveCol(j);
            }}
            onTouchMove={() => {
              setActiveRow(i);
              setActiveCol(j);
            }}
          />
        );
      }
      counter++;
    }
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        height: "100vh",
        ...props.mode.gridStyle,
      }}
    >
      <Suspense>
        {modeTiles} {listenerTiles}
      </Suspense>
    </div>
  );
}
