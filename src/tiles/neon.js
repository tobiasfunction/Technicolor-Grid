import "./neon.css";
import { useState , useMemo} from "react";
import { CSSTransition } from "react-transition-group";

export default function (props) {
  const [mainColor, setMainColor] = useState();
  const [auraColor, setAuraColor] = useState();
  const [wasActive, setWasActive] = useState(false);

  const coordsString = props.coords.join(",");
  const active = props.activeCoords.includes(coordsString);

  useMemo(() => {
    if (active && wasActive) return;
    else if (wasActive) return setWasActive(false);
    else if (active) {
      changeColor();
      setWasActive(true);
    }
  }, [props.activeCoords.join(",")]);

  return (
    <>
      <CSSTransition // DIFFUSE BACKGROUND GLOW
        key={props.value + "a"}
        in={active}
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
        in={active}
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
        in={active}
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
    </>
  );

  function changeColor() {
    const hue = Math.floor(Math.random() * 330) + 30;
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `hsl(${hue - 30}, 100%, 60%)`;
    setMainColor(newColorOne);
    setAuraColor(newColorTwo);
  }
}
