import { useState, useMemo } from "react";

export default function (props) {
  const [color, setColor] = useState();
  const [wasActive, setWasActive] = useState(false);
  const active = props.activeCoords.some(
    (element) => element == props.coords.join(",")
  );

  useMemo(() => {
    if (active && wasActive) return;
    else if (wasActive) return setWasActive(false);
    else if (active) {
      setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
      setWasActive(true);
    }
  }, [props.activeCoords.join(",")]);
  return (
    <div
      className="tile"
      value="a value"
      coords={props.coords}
      style={{
        backgroundColor: color,
        gridArea: props.gridArea,
        border: "1px solid gray",
      }}
    ></div>
  );
}
