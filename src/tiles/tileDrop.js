import React, { useState, useMemo, useTransition, useEffect } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

export default function (props) {
  const [fallingTiles, setFallingTiles] = useState([]);
  const [fallingTileKey, setFallingTileKey] = useState(0);
  const baseTiles = [];

  let counter = 1;

  for (let i = 1; i <= props.numRows; i++) {
    for (let j = 1; j <= props.numCols; j++) {
      let coords = [i, j, i, j];
      const active = props.activeCoords.includes(coords.join(","));
      baseTiles.push(
        <BaseTile
          key={i + "/" + j}
          active={active}
          coords={coords}
          activeCoords={props.activeCoords}
          gridArea={coords.join(" / ")}
          mode={props.mode}
          counter={counter}
          activate={(currentCoords, currentColor) =>
            activate(currentCoords, currentColor)
          }
        ></BaseTile>
      );
      counter++;
    }
  }
  return (
    <>
      {baseTiles} {fallingTiles}
    </>
  );

  function activate(currentCoords, currentColor) {
    setFallingTileKey(fallingTileKey + 1);
    const NewFallingTile = (
      <NewTile
        key={fallingTileKey}
        value={fallingTileKey}
        color={currentColor}
        style={{backgroundColor: {currentColor}}}
        coords={currentCoords}
      ></NewTile>
    );
    setFallingTiles([NewFallingTile, ...fallingTiles]);
  }
}

function BaseTile(props) {
  const [color, setColor] = useState("#fff");
  const [count, setCount] = useState(0);
  const [wasActive, setWasActive] = useState(false);
  const [droppedTiles, setDroppedTiles] = useState([]);
  const coordsString = props.coords.join(",");
  const activeCoordsString = props.activeCoords.join(",");
  useMemo(() => {
    const active = props.activeCoords.includes(coordsString);
    if (active && wasActive) return;
    else if (wasActive) return setWasActive(false);
    else if (active) {
      changeColor();
      setWasActive(true);

    }
  }, [activeCoordsString]);

  return (
    // <>
    <div
      // key="static"
      className="tile"
      coords={props.coords}
      style={{
        backgroundColor: color,
        // border: "4px solid " + color,
        gridArea: props.gridArea,
      }}
    >
      {color}
    </div>
    //     {droppedTiles}
    //   </>
  );

  function changeColor() {
    // setDroppedTiles([
    //   ...droppedTiles,
    //   <NewTile
    //     key={"d" + count}
    //     gridArea={tileProps.gridArea}
    //     count={count}
    //     color={color}
    //   />,
    // ]);

    props.activate(props.coords, color);

    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(newColor);
  }
}

function NewTile(props) {
  const [inProp, setInProp] = useState(true);

  const transitionStyles = {
    entering: { transform: "translate(0, 0)" },
    exiting: {
      transform: `translate(100px, ${window.innerHeight}px) rotate(20deg)`,
    },
  };

  return (
    <Transition
      in={inProp}
      appear={true}
      timeout={{
        appear: 500,
        enter: 2000,
        exit: 5000,
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={() => {
        setInProp(false);
      }}
    >
      {(state) => (
        <div
          className="tile"
          style={{
            border: "1px solid black",
            backgroundColor: props.color,
            transition: "transform 5s ease-in",
            gridArea: props.coords.join(" / "),

            ...transitionStyles[state],
          }}
        >{props.color}</div>
      )}
    </Transition>
  );
}
