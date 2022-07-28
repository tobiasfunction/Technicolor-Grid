import React, { Suspense } from "react";

export default function Stacked(props) {
  const Tile = React.useMemo(() => {
    return React.lazy(props.mode.Tile);
  }, [props.mode]);

  const totalTiles = props.numCols * props.numRows;
  const modeTiles = [];
  const listenerTiles = [];

  let counter = 1;

  for (let i = 1; i <= props.numRows; i++) {
    for (let j = 1; j <= props.numCols; j++) {
      let coords = [i, j, i, j];

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
