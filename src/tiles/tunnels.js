import React, { useState } from "react";

export default function (props) {
  const [colorOne, setColorOne] = useState("#222");
  const [colorTwo, setColorTwo] = useState("#222");

  const tiles = [];

  let key = 1;
  let size = 100;
  let delay = 0;
  let alternator = true;
  let zIndex = 0;

  while (size > 0) {
    tiles.push(
      <div
        className="tile"
        style={{
          backgroundColor: alternator ? colorTwo : colorOne,
          boxShadow: "2px 2px 2px #000 inset",
          gridColumn: props.column,
          gridRow: props.row,
          height: size + "%",
          opacity: "30%",
          transition: "all 1s",
          transitionDelay: delay + "ms",
          width: size + "%",
          zIndex: zIndex,
        }}
        key={key}
      />
    );
    key++;
    size -= 25;
    delay += 150;
    alternator = !alternator;
    zIndex += 10;
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
