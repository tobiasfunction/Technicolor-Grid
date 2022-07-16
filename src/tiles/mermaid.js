import React, { useState } from "react";

export default function (props) {
  const [color, setColor] = useState("hsl( 215, 75%, 90%");
  const [border, setBorder] = useState("hsl( 215, 60%, 40%");

  return (
    <div
      className="tile"
      style={{
        // border: "2px solid " + border,
        boxShadow: `0 0 20px ${border} inset`,
        borderRadius: "0 0 70% 0",
        height: "100px",
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        transition: "color 500ms",
        transform: "rotate(.25rad)",
        width: "100px",
        zIndex: 1000 - props.counter,
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
    setBorder(`hsl(${hue}, ${saturation - 10}%, ${lightness - 20}%)`);
  }
}
