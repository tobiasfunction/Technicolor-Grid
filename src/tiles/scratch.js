import React, { useState } from "react";

export default function (props) {
  const [color, setColor] = useState("#fff");
  const [zIndex, setZIndex] = useState();
  const size = "170%";

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        boxShadow: "0px 0px 6px #fff inset",
        gridColumn: props.column,
        gridRow: props.row,
        height: size,
        mixBlendMode: "difference",
        opacity: "100%",
        width: size,
        overflow: "hidden",
        // zIndex: zIndex,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 5) + 20;
    const l = Math.floor(Math.random() * 10) + 70;
    setZIndex(Math.floor(Math.random() * 200));
    setColor(`hsla(${h}, ${s}%, ${l}%, 1)`);
  }
}
