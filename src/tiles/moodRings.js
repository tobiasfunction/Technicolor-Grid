import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState("#fff");
  const size = "170%";

  return (
    <>
      <div
        className="tile"
        style={{
          backgroundColor: color,
          borderRadius: "50%",
          boxShadow: "0 0 6px #fff inset, 0 0 8px #fff inset",
          gridColumn: props.column,
          gridRow: props.row,
          height: size,
          mixBlendMode: "difference",
          opacity: "100%",
          width: size,
          zIndex: "100",
        }}
      />
      <div // Listener tile
        className="tile"
        onMouseEnter={mouseEnter}
        style={{
          gridColumn: props.column,
          gridRow: props.row,
          zIndex: "200",
        }}
      />
    </>
  );

  function mouseEnter() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 5) + 20;
    const l = Math.floor(Math.random() * 30) + 70;
    setColor(`hsla(${h}, ${s}%, ${l}%, 1)`);
  }
}
