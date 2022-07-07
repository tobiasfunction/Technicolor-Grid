import React, { useState } from "react";
export default function Scratch (props) {
  const [color, setColor] = useState();
  const size = "100%";

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        height: size,
        opacity: "100%",
        width: size,
        overflow: "hidden",
        // transition: "all 2s",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 20)+80;
    const l = Math.floor(Math.random() * 20) + 40;
    setColor(`hsl(${h}, ${s}%, ${l}%)`);
  }
};