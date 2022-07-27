import React, { useState, Suspense } from "react";

export default function Stacked(props) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const numCols = Math.round(windowWidth / props.mode.targetSize);
  const cellWidth = Math.ceil(windowWidth / numCols);
  const numRows = Math.round(windowHeight / props.mode.targetSize);
  const cellHeight = Math.ceil(windowHeight / numRows);

  const Tile = React.useMemo(() => {
    return React.lazy(props.mode.Tile);
  }, [props.mode]);

  const [activeCoords, setActiveCoords] = useState([]);

  const totalTiles = numCols * numRows;
  const modeTiles = [];
  const listenerTiles = [];

  let counter = 1;

  for (let i = 1; i <= numRows; i++) {
    for (let j = 1; j <= numCols; j++) {
      let coords = [i, j, i, j];
      modeTiles.push(
        <Tile // MODE TILE
          key={i + "/" + j}
          row={i}
          column={j}
          coords={coords}
          activeCoords={activeCoords}
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
    <div
      className="grid"
      style={{
        height: numRows * cellHeight + "px",
        width: numCols * cellWidth + "px",
        ...props.mode.gridStyle,
      }}
      onPointerEnter={(event) => pointerAction(event)}
      onPointerMove={(event) => pointerAction(event)}
    >
      <Suspense>
        {modeTiles} {listenerTiles}
      </Suspense>
    </div>
  );

  function pointerAction(event) {
    const activeElements = document.elementsFromPoint(
      event.clientX,
      event.clientY
    );
    const activeCoords = activeElements
      .map((element) => {
        if (element.attributes.coords) return element.attributes.coords.value;
      })
      .filter((element) => element);
    setActiveCoords(activeCoords);
  }
}
