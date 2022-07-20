import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState(randomColor());

  return (
    <div
      className="tile softPlaid"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
      }}
      onMouseEnter={() => setColor(randomColor())}
    />
  );

  function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 60%, 85%)`;
  }
}
