import React, { useState, useEffect, useMemo } from "react";

export default function Grid(props) {
  const [windowWidth, windowHeight] = useWindowSize();
  const [activeCoords, setActiveCoords] = useState([]);

  const cellTargetHeight =
    props.mode.cellTargetHeight || props.mode.cellTargetSize;
  const cellTargetWidth =
    props.mode.cellTargetWidth || props.mode.cellTargetSize;

  // Make cell size responsive to screen size
  const cellSizeRatio = useMemo(() => {
    const smallerDimension = Math.min(windowHeight, windowWidth);

    if (smallerDimension < 600) return 0.75;
    else if (smallerDimension < 800) return smallerDimension / 800;
    else return 1;
  }, [windowHeight, windowWidth]);

  // Calculate the number of columns and the size of each cell
  let numCols = Math.round(windowWidth / (cellTargetWidth * cellSizeRatio));
  const cellWidth = Math.ceil(windowWidth / numCols);
  let numRows = Math.round(windowHeight / (cellTargetHeight * cellSizeRatio));
  const cellHeight = Math.ceil(windowHeight / numRows);

  // Some modes need off-screen grid cells to look right
  if (props.mode.plusCols) numCols += props.mode.plusCols;
  if (props.mode.plusRows) numRows += props.mode.plusRows;

  const Layout = props.mode.Layout || Passthrough;

  return (
    <div
      className="grid"
      style={{
        width: cellWidth * numCols + "px",
        height: cellHeight * numRows + "px",
        gridAutoColumns: cellWidth + "px",
        gridAutoRows: cellHeight + "px",
        ...props.mode.LayoutStyle,
      }}
      onPointerEnter={handlePointerEvent}
      onPointerMove={handlePointerEvent}
      onPointerLeave={() => setActiveCoords([])}
      onPointerDown={() => setActiveCoords([])}
      onPointerUp={handlePointerEvent}
    >
      <Layout
        mode={props.mode}
        numCols={numCols}
        numRows={numRows}
        activeCoords={activeCoords}
      />
    </div>
  );

  function handlePointerEvent(event) {
    const activeElements = document.elementsFromPoint(
      event.clientX,
      event.clientY
    );
    const activeCoordinates = activeElements
      .map((element) => {
        if (element.attributes.coords) return element.attributes.coords.value;
        else return [];
      })
      .filter((element) => element.length);
    setActiveCoords(activeCoordinates);
  }
}

function Passthrough(props) {
  const Tiles = useMemo(() => {
    return React.lazy(props.mode.Tile);
  }, [props.mode]);
  return (
    <React.Suspense>
      <Tiles
        mode={props.mode}
        numCols={props.numCols}
        numRows={props.numRows}
        activeCoords={props.activeCoords}
      />
    </React.Suspense>
  );
}

// Custom hook to keep track of window size
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
