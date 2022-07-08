import React, { useState } from "react";

export default function (props) {
  const [color, setColor] = useState();
  const [border, setBorder] = useState();

  return (
    <div
      className="tile"
      style={{
        border: "2px solid " + border,
        borderRadius: "0 0 50% 0",
        height: "200%",
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        transition: "color 500ms",
        transform: "rotate(15deg)",
        width: "200%",
        zIndex: - props.counter,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 25) + 70;
    const lightness = Math.floor(Math.random() * 15) + 83;
    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    setBorder(`hsl(${hue}, ${saturation}%, ${lightness-50}%)`)
  }
}
