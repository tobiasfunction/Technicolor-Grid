import { useState, useMemo } from "react";

export default function (props) {
  const [color, setColor] = useState("#fff");
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
      className="tile moodRings"
      coords={props.coords}
      style={{
        backgroundColor: color,
        gridArea: props.gridArea,
      }}
    ></div>
  );

  function changeColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 5) + 20;
    const l = Math.floor(Math.random() * 30) + 70;
    setColor(`hsla(${h}, ${s}%, ${l}%, 1)`);
  }
}
