import { useState } from "react";

export default function (props) {
  const [hue, setHue] = useState(props.counter);

  return (
    <div
      className="tile spectrum"
      style={{
        backgroundColor: `hsl(${hue}, 70%, 60%)`,
        gridArea: props.gridArea,
      }}
      onMouseEnter={() => setHue(hue + 8)}
    />
  );
}
