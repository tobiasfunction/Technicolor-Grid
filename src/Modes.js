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
    const color = `hsl(${random}, 100%, 80%)`
    setColor(color);
  }
};

export {Simple, Pastel}