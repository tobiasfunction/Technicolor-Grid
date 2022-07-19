import { useState } from "react";

export default function (props) {
  const [hue, setHue] = useState(props.counter);
  const size = "100%";
  let i = 10;

  return (
    <div
      className="tile"
      style={{
        backgroundColor: `hsl(${hue}, 70%, 60%)`,
        borderBottom: "6px solid rgba( 0, 0, 0, .3 )",
        borderLeft: "6px solid rgba( 255, 255, 255, .4 )",
        borderRight: "6px solid rgba( 0, 0, 0, .4 )",
        borderTop: "6px solid rgba( 255, 255, 255, .3 )",
        gridColumn: props.column,
        gridRow: props.row,
        height: size,
        opacity: "100%",
      }}
      onMouseEnter={() => setHue(hue + 10)}
    />
  );
}
