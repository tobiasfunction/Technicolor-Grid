import React, { useState, useMemo, useTransition, useEffect } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

export default function (props) {
  const [tileProps, setTileProps] = useState(new Map());

  const [lastActiveCoords, setLastActiveCoords] = useState();
  const activeCoords = props.activeCoords.join(" ");
  if (lastActiveCoords !== activeCoords) {
    setLastActiveCoords(activeCoords);
    console.log(lastActiveCoords);
  }

  const rows = props.numRows;
  const cols = props.numCols;
  // const rowsArray = new Array(rows).fill(0);
  // rowsArray.forEach(
  //   (element, index, array) => (array[index] = new Array(cols).fill({}))
  // );

  useMemo(() => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        setTileProps(
          tileProps.set([i, j], {
            coords: [i, j],
            key: [i, j],
            value: [i, j],
            className: "tile",
            style: {
              gridArea: `${i + 1} / ${j + 1} / ${i + 1} / ${j + 1}`,
              backgroundColor: `hsl(${(i+1) * (j+1)} 100% 60%)`,
            },
            onClick: () => click(i, j),
          })
        );
      }
    }
  }, [props.numCols]);

  function click(i, j) {
    // const hue = Math.random() * 360;
    // let shallowClone = tileParams.slice(); //creates the clone of the state
    // shallowClone[i][j].style = {
    //   ...shallowClone[i][j].style,
    //   backgroundColor: `hsl(${hue} 100% 50%)`,
    // };
    // setTileParams(shallowClone);
  }

  const tileArray = [...tileProps.values()].map((element) => (
    <div key={element.value} {...element}>
      {element.coords.join(", ")}
    </div>
  ));

  return <>{tileArray}</>;

  //   const baseTiles = [];

  //   let counter = 1;

  //   for (let i = 1; i <= props.numRows; i++) {
  //     for (let j = 1; j <= props.numCols; j++) {
  //       let coords = [i, j, i, j];
  //       const active = props.activeCoords.includes(coords.join(","));
  //       baseTiles.push(
  //         <BaseTile
  //           key={i + "/" + j}
  //           active={active}
  //           coords={coords}
  //           activeCoords={props.activeCoords}
  //           gridArea={coords.join(" / ")}
  //           mode={props.mode}
  //           counter={counter}
  //         ></BaseTile>
  //       );
  //       counter++;
  //     }
  //   }
  //   return <>{baseTiles}</>;
  // }

  // function BaseTile(props) {
  //   const [color, setColor] = useState("#fff");
  //   const [count, setCount] = useState(0);
  //   const [wasActive, setWasActive] = useState(false);
  //   const [droppedTiles, setDroppedTiles] = useState([]);
  //   const coordsString = props.coords.join(",");
  //   const activeCoordsString = props.activeCoords.join(",");
  //   useMemo(() => {
  //     const active = props.activeCoords.includes(coordsString);
  //     if (active && wasActive) return;
  //     else if (wasActive) return setWasActive(false);
  //     else if (active) {
  //       changeColor();
  //       setWasActive(true);
  //     }
  //   }, [activeCoordsString]);

  //   return (
  //     // <>
  //     <div
  //       // key="static"
  //       className="tile"
  //       coords={props.coords}
  //       style={{
  //         backgroundColor: color,
  //         // border: "4px solid " + color,
  //         gridArea: props.gridArea,
  //       }}
  //     >
  //       {color}
  //     </div>
  //   );

  //   function changeColor() {
  //     const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //     setColor(newColor);
  //   }
}
