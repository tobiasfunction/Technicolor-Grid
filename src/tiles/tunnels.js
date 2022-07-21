import { useState } from "react";

export default function (props) {
  const [colorOne, setColorOne] = useState("#222");
  const [colorTwo, setColorTwo] = useState("#222");

  const tiles = [];

  let key = 1;
  let size = 100;
  let delay = 0;
  let alternator = true;

  while (size > 0) {
    tiles.push(
      <div
        className="tile tunnels"
        style={{
          backgroundColor: alternator ? colorTwo : colorOne,
          gridArea: props.gridArea,
          height: size + "%",
          transitionDelay: delay + "ms",
          width: size + "%",
        }}
        key={key}
      />
    );
    key++;
    size -= 25;
    delay += 150;
    alternator = !alternator;
  }

  return (
    <>
      {tiles}
      <div
        className="tile"
        style={{
          gridColumn: props.column,
          gridRow: props.row,
          zIndex: 200,
        }}
        onMouseEnter={mouseEnter}
      />
    </>
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `hsl(${hue + 20}, 100%, 60%)`;
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
}
