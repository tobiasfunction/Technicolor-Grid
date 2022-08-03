import React, { useState, useMemo, useTransition, useEffect } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

export default function (props) {
  const [tileProps, setTileProps] = useState(new Map());

  const [lastActiveCoords, setLastActiveCoords] = useState();
  const activeCoords = props.activeCoords.join(" ");
  if (lastActiveCoords !== activeCoords) {
    if (activeCoords.indexOf(",") > -1) {
      const temp = activeCoords.split(",");
      click(activeCoords);

      setLastActiveCoords(activeCoords);
    }
  }

  const rows = props.numRows;
  const cols = props.numCols;

  useMemo(() => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        setTileProps(
          tileProps.set(`${i},${j}`, {
            coords: [i, j],
            key: [i, j],
            value: [i, j],
            className: "tile",
            style: {
              gridArea: `${i + 1} / ${j + 1} / ${i + 1} / ${j + 1}`,
              backgroundColor:`hsl(${(i + 1) * ( j + 1)} 100% 60%)`,
            },
          })
        );
      }
    }
  }, [props.numCols]);

  function click(coords) {
    const hue = Math.random() * 360;
    setTileProps(
        tileProps.set(coords, {
          ...tileProps.get(coords),
          style: {backgroundColor: `hsl(${hue} 100% 60%)`},
        }))
  }

  const tileArray = [...tileProps.values()].map((element) => (
    <div key={element.value} {...element}>
    </div>
  ));

  return <>{tileArray}</>;
}
