import React, { useState, useEffect, useMemo } from "react";

export default function BaseGrid(props) {
  const [windowWidth, windowHeight] = useWindowSize();
  const [activeCoords, setActiveCoords] = useState([]);

  const modeAlias = props.mode.alias;

  const targetSize = useMemo(() => {
    if (windowHeight < 600 || windowWidth < 600) {
      const newSize = Math.ceil(props.mode.targetSize * 0.75);
      return newSize;
    } else if (windowHeight < 800 || windowWidth < 800) {
      const smallerDimension = Math.min(windowHeight, windowWidth);
      const newRatio = smallerDimension / 800;
      const newSize = Math.ceil(props.mode.targetSize * newRatio);
      return newSize;
    } else {
      return props.mode.targetSize;
    }
  }, [modeAlias, windowHeight, windowWidth]);

  let numCols = Math.round(windowWidth / targetSize);
  const cellWidth = Math.ceil(windowWidth / numCols);
  let numRows = Math.round(windowHeight / targetSize);
  const cellHeight = Math.ceil(windowHeight / numRows);


  if (props.mode.plusCols) numCols += props.mode.plusCols
  if(props.mode.plusRows) numRows += props.mode.plusRows
  // numCols = numCols + 2;
  // numRows = numRows + 2;

  const Grid = (
    <div
      className="grid"
      style={{
        width: cellWidth * numCols + "px",
        height: cellHeight * numRows + "px",
        gridAutoColumns: cellWidth + "px",
        gridAutoRows: cellHeight + "px",
        ...props.mode.gridStyle,
      }}
      onPointerEnter={pointerAction}
      onPointerMove={pointerAction}
      onPointerLeave={()=> setActiveCoords([])}
      onPointerDown={()=> setActiveCoords([])}
      onPointerUp={pointerAction}
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

// source: https://usehooks.com/useWindowSize/

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState([undefined, undefined]);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
