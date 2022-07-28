import React, { useState, Suspense } from "react";

export default function Subway(props) {
  const Tile = React.useMemo(() => {
    return React.lazy(props.mode.Tile);
  }, [props.mode]);

  const totalTiles = props.numCols * props.numRows;
  const modeTiles = [];
  const listenerTiles = [];

  let counter = 1;

  for (let i = 1; i <= props.numRows; i++) {
    for (let j = 1; j <= props.numCols/2; j++) {
      const coords =
        i % 2 ? [i, j * 2 - 1, i, j * 2 + 1] : [i, j * 2, i, j * 2 + 2];

      modeTiles.push(
        <Tile // MODE TILE
          key={i + "/" + j}
          coords={coords}
          activeCoords={props.activeCoords}
          gridArea={coords.join(" / ")}
          mode={props.mode}
          counter={counter}
          totalTiles={totalTiles}
        />
      );

      if (props.mode.gridListen) {
        listenerTiles.push(
          <div // LISTENER TILE (if needed)
            className="tile listen"
            key={"l" + i + "/" + j}
            coords={coords}
            style={{
              gridArea: coords.join(" / "),
            }}
          ></div>
        );
      }
      counter++;
    }
  }
  return (
    <Suspense>
      {modeTiles}
      {listenerTiles}
    </Suspense>
  );
}

// for (let i = 1; i <= rowCount; i++) {
//   let tilesThisRow =
//     i % 2 ? Math.ceil(tilesPerRow / 2) + 1 : Math.ceil(tilesPerRow / 2) + 1;
//   for (let j = 1; j <= tilesThisRow; j++) {
//     let gridColumn =
//       i % 2 ? `${j * 2 - 1} / ${j * 2 + 1}` : `${j * 2} / ${j * 2 + 2}`;
//     let gridRow = `${i * 2 - 1} / ${i * 2 + 1}`;

//     let gridArea= i % 2 ? `${i} / ${j * 2 - 1} / ${i} / ${j * 2 + 1}` : `${i} / ${j * 2} / ${i } / ${j * 2 + 2}`
//     tiles.push(
//       <Suspense key={i + "/" + j}>
//         <Tile
//           row={i}
//           column={j}
//           gridArea={gridArea}
//           mode={props.mode}
//           size={tileSize}
//           value={i + "/" + j}
//           counter={counter}
//         />
//       </Suspense>
//     );
//     counter++;
//   }
// }
