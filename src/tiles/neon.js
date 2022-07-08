import React, { useState } from "react";

export default function (props) { const [active, setActive] = useState();
    const [colorOne, setColorOne] = useState();
    const [colorTwo, setColorTwo] = useState();
  
    let whiteNeon = {
      borderColor: "#fff",
      borderRadius: "15px",
      borderStyle: "solid",
      borderWidth: "2px",
      boxSizing: "border-box",
      color: "#fff",
      filter: active ? "blur(1px)" : "blur(0px)",
      gridColumn: props.column,
      gridRow: props.row,
      height: "76px",
      opacity: active ? "100%" : "0%",
      transition: "all 2s",
      width: "76px",
    };
    let colorNeon = {
      borderColor: colorOne,
      borderRadius: "15px",
      borderStyle: "solid",
      borderWidth: "6px",
      boxSizing: "border-box",
      filter: active ? "blur(1px)" : "blur(6px)",
      gridColumn: props.column,
      gridRow: props.row,
      height: "80px",
      opacity: active ? "100%" : "0%",
      transition: "all 5s, opacity 2s, filter 2s ease-out, border-color 1s",
      width: "80px",
    };
  
    return (
      //
      <>
        <div key={1} className="tile" style={colorNeon} />
        <div
          key={2}
          className="tile"
          style={whiteNeon}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        />
      </>
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
        setActive(0);
      }, 1000);
    }
  };