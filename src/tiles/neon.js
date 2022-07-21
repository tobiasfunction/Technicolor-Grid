import "./neon.css";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function (props) {
  const [inProp, setInProp] = useState(false);
  const [mainColor, setMainColor] = useState();
  const [auraColor, setAuraColor] = useState();

  return (
    <>
      <CSSTransition // DIFFUSE BACKGROUND GLOW
        key={props.value + "a"}
        in={inProp}
        timeout={{ exit: 3000 }}
        classNames="neon-aura"
      >
        <div
          className="tile neon neon-aura"
          style={{
            borderColor: auraColor,
            gridArea: props.gridArea,
          }}
        ></div>
      </CSSTransition>

      <CSSTransition // MAIN BOLD COLOR
        key={props.value + "m"}
        in={inProp}
        timeout={{ exit: 2500 }}
        classNames="neon-main"
      >
        <div
          className="tile neon neon-main"
          style={{
            borderColor: mainColor,
            gridArea: props.gridArea,
          }}
        ></div>
      </CSSTransition>

      <CSSTransition // THIN WHITE BORDER
        key={props.value + "w"}
        in={inProp}
        timeout={{ exit: 3000 }}
        classNames="neon-white"
      >
        <div
          className="tile neon neon-white"
          style={{
            gridArea: props.gridArea,
          }}
        ></div>
      </CSSTransition>

      <div // LISTENER TILE
        key={props.value + "l"}
        className="tile"
        style={{
          gridArea: props.gridArea,
        }}
        onMouseEnter={mouseEnter}
        onMouseLeave={() => setInProp(false)}
      />
    </>
  );

  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330) + 30;
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `hsl(${hue - 30}, 100%, 60%)`;
    setMainColor(newColorOne);
    setAuraColor(newColorTwo);
    setInProp(true);
  }
}
