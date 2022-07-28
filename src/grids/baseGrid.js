import React, { useState } from "react";

export default function BaseGrid(props) {
  const [activeCoords, setActiveCoords] = useState([]);
  const [wasMode, setWasMode] = useState([]);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (wasMode !== props.mode.alias) {
    setActiveCoords([])
    setWasMode(props.mode.alias)
  }

  let numCols = Math.round(windowWidth / props.mode.targetSize);
  const cellWidth = Math.ceil(windowWidth / numCols);
  let numRows = Math.round(windowHeight / props.mode.targetSize);
  const cellHeight = Math.ceil(windowHeight / numRows);

  numCols = numCols + 2;
  numRows = numRows + 2;

  const Grid = (
    <div
      className="grid"
      style={{
        width: cellWidth * numCols + "px",
        height: cellHeight * numRows + "px",
        ...props.mode.gridStyle,
      }}
      onPointerEnter={(event) => pointerAction(event)}
      onPointerMove={(event) => pointerAction(event)}
    >
      <props.mode.Grid
        mode={props.mode}
        numCols={numCols}
        numRows={numRows}
        activeCoords={activeCoords}
      />
    </div>
  );
  return Grid;

  function pointerAction(event) {
    const activeElements = document.elementsFromPoint(
      event.clientX,
      event.clientY
    );
    const activeCoordinates = activeElements
      .map((element) => {
        if (element.attributes.coords) return element.attributes.coords.value;
      })
      .filter((element) => element);
    setActiveCoords(activeCoordinates);
  }
}
