import React, { useState } from "react";

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

const Neon = (props) => {
  const [active, setActive] = useState(false);
  const [colorOne, setColorOne] = useState();
  const [colorTwo, setColorTwo] = useState();
  const column = `${props.column} / ${props.column}`;
  const row = `${props.row} / ${props.row}`;

  let whiteNeon = {
    borderColor: colorTwo,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "2px",
    boxSizing: "border-box",
    filter: "blur(0px)",
    height: "76px",
    margin: "12px",
    position: "absolute",
    transition: "all 2s",
    width: "76px",
  };
  let colorNeon = {
    borderColor: colorOne,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "6px",
    boxSizing: "border-box",
    filter: "blur(2px)",
    height: "80px",
    margin: "10px",
    position: "absolute",
    transition: "all 1s",
    width: "80px",
  };

  return (
    <div
      className="tile"
      style={{
        gridColumn: column,
        gridRow: row,
      }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div style={whiteNeon} />
      <div style={colorNeon} />
    </div>
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `#fff`;
    setActive(true)
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
  function mouseLeave() {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!')
    }, 1000)
    .then( () => {
      setActive(false)
      setColorOne("#000");
      setColorTwo("#000");
    })

  }
};

const Tunnels = (props) => {
  const [colorOne, setColorOne] = useState("#222");
  const [colorTwo, setColorTwo] = useState("#222");
  const column = `${props.column} / ${props.column}`;
  const row = `${props.row} / ${props.row}`;

  const tiles = [];

  let key = 1;
  let side = 100;
  let margin = 0;
  let delay = 0;
  let alternator = true;

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
        key = {key}
      />
    );
    margin += 10;
    side -= 20;
    alternator = !alternator;
    delay += 150;
    key ++
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
