import { useState } from "react";

export default function (props) {
  const [hue, setHue] = useState(props.counter);

  return (
    <div
      className="tile spectrum"
      style={{
        backgroundColor: `hsl(${hue}, 70%, 60%)`,
        gridColumn: props.column,
        gridRow: props.row,
      }}
      onMouseEnter={() => setHue(hue + 8)}
    />
  );
}
