import React, { useState, Suspense } from "react";

export default function Stacked(props) {
  const numCols = Math.floor(props.windowWidth / props.mode.targetSize);
  const tileSize = Math.floor(props.windowWidth / numCols);
  const numRows = Math.ceil(props.windowHeight / tileSize);
  const Tile = React.useMemo(() => {
    return React.lazy(props.mode.Tile);
  }, [props.mode]);

  const [activeCoords, setActiveCoords] = useState([]);

  const move = React.useMemo(() => {
    return activeCoords.join(" ");
  }, [activeCoords[0]]);

  const totalTiles = numCols * numRows;
  const modeTiles = [];
  const listenerTiles = [];
  const [activeRow, setActiveRow] = useState();
  const [activeCol, setActiveCol] = useState();

  let counter = 1;

  for (let i = 1; i <= numRows; i++) {
    for (let j = 1; j <= numCols; j++) {
      let coords = [i, j, i, j];
      modeTiles.push(
        <Tile // MODE TILE
          key={i + "/" + j}
          value={i + "/" + j}
          row={i}
          column={j}
          coords={coords}
          activeCoords={activeCoords}
          gridArea={coords.join(" / ")}
          mode={props.mode}
          counter={counter}
          totalTiles={totalTiles}
          activeRow={activeRow}
          activeCol={activeCol}
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
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fill, minmax(${props.mode.targetSize}px, 1fr))`,
        height: "100vh",
        ...props.mode.gridStyle,
      }}
      onPointerEnter={event => pointerAction(event)}
      onPointerMove={event => pointerAction(event)}
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
        if (element.attributes.coords)
          return element.attributes.coords.value;
      })

      .filter((element) => element);

    setActiveCoords(activeCoords);

  }
}
