import React, { useState } from "react";

const Simple = (props) => {
  const [color, setColor] = useState("#eee");

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const random = Math.floor(Math.random() * 16777215).toString(16);
    setColor("#" + random);
  }
};

const Pastel = (props) => {
  const [color, setColor] = useState("#eee");

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const random = Math.floor(Math.random() * 360);
    const color = `hsl(${random}, 100%, 80%)`;
    setColor(color);
  }
};

const Tunnels = (props) => {
  const [hue, setHue] = useState();
  const [colorOne, setColorOne] = useState("#fff");
  const [colorTwo, setColorTwo] = useState("#fff");
  const column = `${props.column} / ${props.column}`;
  const row = `${props.row} / ${props.row}`;

  const tiles = [];

  let side = 100;
  let margin = 0;
  let delay = 0;
  let alternator = 0;

  while (side > 0) {
    tiles.push(
      <div
        style={{
          backgroundColor: alternator ? colorTwo : colorOne,
          // borderRadius: "8px",
          borderStyle: "none",
          borderWidth: "6px",
          boxShadow: "2px 2px 2px #000 inset",
          height: side + "px",
          margin: margin + "px",
          opacity: "30%",
          position: "absolute",
          transition: "all 1s",
          transitionDelay: delay + "ms",
          width: side + "px",
        }}
      />
    );

    margin += 10;
    side -= 20;
    alternator = alternator ? 0 : 1;
    delay += 150;
  }

  return (
    <div
      className="tile"
      style={{
        backgroundColor: "#000",
        gridColumn: column,
        gridRow: row,
      }}
      onMouseEnter={mouseEnter}
    >
      {tiles}
    </div>
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 350);
    const newColorOne = `hsl(${hue}, 90%, 60%)`;
    const newColorTwo = `hsl(${(hue + 20)}, 90%, 60%)`;
    setHue(hue);
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
};

export { Simple, Pastel, Tunnels };
