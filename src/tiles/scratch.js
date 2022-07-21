import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState();

  const testBorder = (props.activeRow === props.row || props.activeCol === props.column) ? "2px solid red" : "none";

  return (
    <div
      className="tile"
      style={{
        border: testBorder,
        backgroundColor: color,
        gridArea: props.gridArea,
      }}
    >
      <code>{props.activeRow}{"..."}{props.activeCol}</code>
    </div>
  );
}
