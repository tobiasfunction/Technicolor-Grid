import { useState, useMemo } from "react";

export default function (props) {
  const [hue, setHue] = useState(props.counter);
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
      className="tile spectrum"
      coords={props.coords}
      style={{
        backgroundColor: `hsl(${hue}, 70%, 60%)`,
        gridArea: props.gridArea,
      }}
    ></div>
  );

  function changeColor() {
   setHue(hue + 8);
  }
}
