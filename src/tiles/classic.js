import { useState, useMemo } from "react";

export default function (props) {
  const [color, setColor] = useState();
  const [wasActive, setWasActive] = useState(false);
  const coordsString = props.coords.join(",");

  useMemo(() => {
    const active = props.activeCoords.includes(coordsString);
    if (active && wasActive) return;
    else if (wasActive) return setWasActive(false);
    else if (active) {
      changeColor();
      setWasActive(true);
    }
  }, [props.activeCoords.join(",")]);

  return (
    <div
      className="tile"
      coords={props.coords}
      style={{
        backgroundColor: color,
        gridArea: props.gridArea,
      }}
    ></div>
  );

  function changeColor() {
    setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
}
