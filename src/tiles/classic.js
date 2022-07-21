import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState();

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridArea: props.gridArea,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const random = Math.floor(Math.random() * 16777215).toString(16);
    setColor("#" + random);
  }
}
