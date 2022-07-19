import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState();

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        transition: "color 500ms",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 20) + 65;
    const lightness = Math.floor(Math.random() * 15) + 83;
    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setColor(newColor);
  }
}
