import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState(randomColor());

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        height: "135%",
        mixBlendMode: "multiply",
        opacity: "100%",
        transition: "all 100ms",
        width: "135%",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    setColor(randomColor());
  }

  function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 60%, 85%)`;
  }
}
