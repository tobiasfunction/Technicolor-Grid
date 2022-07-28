import "./App.css";
import "./modes.css";
import React, {
  useState,
  useTransition,
  useEffect,
  useLayoutEffect,
} from "react";

import BaseGrid from "./grids/baseGrid";

import { modes } from "./modes";
import * as icons from "./icons";

const App = () => {
  const [mode, setMode] = useState(modes[0]);
  const [menuStatus, setMenuStatus] = useState();
  const changeMode = (alias) => {
    const newMode = modes.find((e) => e.alias === alias);
    if (newMode) {
      setMode(newMode);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?mode=${alias}`
      );
      document.body.style.backgroundColor = newMode.background;
    } else console.warn(alias + " is not a valid mode");
  };

  const Menu = () => {
    const menuOptions = React.useMemo(() => {
      const menuButtons = [];
      modes.forEach((e) => {
        if (!e.hidden)
          menuButtons.push(
            <button
              onClick={() => changeMode(e.alias)}
              disabled={mode.alias === e.alias}
              key={e.alias}
            >
              {e.name}
            </button>
          );
      });
      return <>{menuButtons}</>;
    }, [mode]);

    if (!menuStatus)
      return (
        <div className="menu">
          <div key="control" className="menuControl">
            <button
              title="Options"
              className="icon"
              onClick={() => setMenuStatus(true)}
            >
              <icons.Cog height="1.5em" width="1.5em" />
            </button>
          </div>
        </div>
      );
    else {
      return (
        <div className="menu menuOpen">
          <div key="control" className="menuControl">
            <div className="title">
              <div>Color</div> <div>Grid</div>
            </div>
            <div>
            <button
              key="gh"
              title="View Code on GitHub"
              className="icon"
              onClick={() =>
                window.open(
                  "https://github.com/tobiasfunction/color-grid",
                  "_blank"
                )
              }
            >
              <icons.Github height="1.5em" width="1.5em" />
            </button>
            <button
              key="close"
              title="Close Options"
              className="icon"
              onClick={() => setMenuStatus(false)}
            >
              <icons.Cross height="1.5em" width="1.5em" />
            </button>
          </div>
</div>
          <div key="modes" className="menuModes">
            {menuOptions}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    // Handle mode via URL parameters
    const queryParams = new URLSearchParams(window.location.search);
    const queryMode = queryParams.get("mode");
    if (queryMode) changeMode(queryMode);
  }, []);

  return (
    <div className="App">
      <Menu />
      <BaseGrid mode={mode} />
    </div>
  );
};

export default App;
