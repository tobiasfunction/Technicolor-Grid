import { useState, useMemo } from "react";

export default function (props) {
  const [colorOne, setColorOne] = useState("#222");
  const [colorTwo, setColorTwo] = useState("#222");
  const [wasActive, setWasActive] = useState(false);

  const coordsString = props.coords.join(",");

  useMemo(() => {
    const active = props.activeCoords.includes(coordsString);
    if (active && wasActive) return;
    else if (wasActive) return setWasActive(false);
    else if (active) {
      changeColor();
      setWasActive(true);
    }
  }, [props.activeCoords.join(",")]);

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
        coords={props.coords}
      />
    );
    key++;
    size -= 25;
    delay += 150;
    alternator = !alternator;
  }

  return <>{tiles}</>;

  function changeColor() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `hsl(${hue + 20}, 100%, 60%)`;
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
}
