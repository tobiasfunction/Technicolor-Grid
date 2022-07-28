import { useState, useMemo } from "react";

export default function (props) {
  const [color, setColor] = useState("hsl( 215, 75%, 90%)");
  const [border, setBorder] = useState("hsl( 215, 60%, 70%)");
  const [wasActive, setWasActive] = useState(false);

  const coordsString = props.coords.join(",");
  
  useMemo(() => {
    const active = props.activeCoords[0] === coordsString;
    if (active && wasActive) return;
    else if (wasActive) return setWasActive(false);
    else if (active) {
      changeColor();
      setWasActive(true);
    }
  }, [props.activeCoords.join(",")]);

  return (
    <div
      className="tile mermaid"
      coords={props.coords}
      style={{
        backgroundColor: color,
        boxShadow: `-10px -10px 40px ${border} inset, 2px 2px 10px ${border} inset, -12px 4px 20px black inset, 4px 4px 16px black`,
        gridArea: props.gridArea,
        zIndex: 2000 - props.counter,
      }}
    />
  );
  function changeColor() {
    const hue = Math.floor(Math.random() * 120) + 150;
    const saturation = Math.floor(Math.random() * 20) + 60;
    const lightness = Math.floor(Math.random() * 20) + 70;
    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    setBorder(`hsl(${hue}, ${saturation / 2}%, ${lightness - 30}%)`);
  }
}
