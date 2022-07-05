import React, { useState } from "react";
import { isPropertyAccessChain } from "typescript";

const BasicTile = (props) => {
  const [color, setColor] = useState();

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
  const [color, setColor] = useState();

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        transition: "all 500ms",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 25) + 70;
    const lightness = Math.floor(Math.random() * 15) + 83;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setColor(color);
  }
};

const Neon = (props) => {
  const [active, setActive] = useState();
  const [colorOne, setColorOne] = useState();
  const [colorTwo, setColorTwo] = useState();
  const column = `${props.column} / ${props.column}`;
  const row = `${props.row} / ${props.row}`;

  let whiteNeon = {
    borderColor: "#fff",
    borderRadius: "15px",
    borderStyle: "solid",
    borderWidth: "2px",
    boxSizing: "border-box",
    color: "#fff",
    filter: active ? "blur(1px)" : "blur(0px)" ,
    height: "76px",
    margin: "12px",
    opacity: active ? "100%" : "0%",
    position: "absolute",
    transition: "all 2s",
    width: "76px",
  };
  let colorNeon = {
    borderColor: colorOne,
    borderRadius: "15px",
    borderStyle: "solid",
    borderWidth: "6px",
    boxSizing: "border-box",
    filter: active ? "blur(1px)" : "blur(6px)" ,
    height: "80px",
    margin: "10px",
    opacity: active ? "100%" : "0%",
    position: "absolute",
    transition: "all 5s, opacity 2s, filter 2s ease-out, border-color 1s",
    width: "80px",
  };

  return (
    <div
      key={1}
      className="tile"
      style={{
        gridColumn: column,
        gridRow: row,
      }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div key={3} style={colorNeon} />
      <div key={2} style={whiteNeon}/>
    </div>
  );

  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `#fff`;
    setActive(1);
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
  function mouseLeave() {
    setTimeout(() => {
      setActive(0)
    }, 1000);
  }
};

const Tunnels = (props) => {
  const [colorOne, setColorOne] = useState("#222");
  const [colorTwo, setColorTwo] = useState("#222");
  const column = `${props.column} / ${props.column}`;
  const row = `${props.row} / ${props.row}`;

  const tiles = [];

  let key = 1;
  let side = props.size;
  let sideIncrement = Math.ceil(side / 5);
  let margin = 0;
  let marginIncrement = Math.ceil(sideIncrement / 2);
  let delay = 0;
  let alternator = true;

  while (side > 0) {
    tiles.push(
      <div
        style={{
          backgroundColor: alternator ? colorTwo : colorOne,
          // borderRadius: "8px",
          boxShadow: "2px 2px 2px #000 inset",
          height: side + "px",
          margin: margin + "px",
          opacity: "30%",
          position: "absolute",
          transition: "all 1s",
          transitionDelay: delay + "ms",
          width: side + "px",
        }}
        key={key}
      />
    );
    margin += marginIncrement;
    side -= sideIncrement;
    alternator = !alternator;
    delay += 150;
    key++;
  }

  return (
    <div
      className="tile"
      style={{
        gridColumn: column,
        gridRow: row,
      }}
      onMouseEnter={mouseEnter}
    >
      {tiles}
    </div>
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `hsl(${hue + 20}, 100%, 60%)`;
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
};

export { BasicTile, Neon, Pastel, Tunnels };
