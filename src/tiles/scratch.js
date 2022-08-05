import { useState, useEffect } from "react";
import { deepmerge } from "deepmerge-ts";

export default function (props) {
  const [tileProps, setTileProps, clearTileProps] = useStateMap();
  const [lastActiveCoords, setLastActiveCoords] = useState();

  const rows = props.numRows;
  const cols = props.numCols;

  useEffect(clearTileProps, [props.mode.alias])

  // layout: stacked
  // order: ascending

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      const key = `${i},${j}`;
      if (!tileProps.has(key)) {
        setTileProps(key, {
          key: key,
          coords: key,
          className: props.mode.tileClassName
            ? "tile " + props.mode.tileClassName
            : "tile",
          style: {
            gridArea: props.mode.layout(i, j),
          },
        });
      }
    }
  }

  const activeCoords = props.activeCoords[0] || "";
  if (lastActiveCoords !== activeCoords) {
    if (activeCoords.indexOf(",") > -1) click(activeCoords);
    setLastActiveCoords(activeCoords);
  }

  function click(coords) {
    const hue = Math.floor(Math.random() * 360);
    setTileProps(coords, {
      style: { backgroundColor: `hsl(${hue} 100% 60%)` },
    });
  }

  const tileArray = [...tileProps.values()].map((element) => (
    <div {...element} />
  ));

  return <>{tileArray}</>;
}

function useStateMap() {
  const [stateMap, setStateMap] = useState(new Map());

  function setter(key, value) {
    setStateMap(
      new Map(stateMap.set(key, deepmerge(stateMap.get(key), value)))
    );
  }

  function clear() {
    setStateMap(new Map());
  }

  return [stateMap, setter, clear];
}
