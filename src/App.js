import "./App.css";
import React, {
  useState,
  useTransition,
  useEffect,
  useLayoutEffect,
} from "react";
import { modes } from "./Modes";

import * as icons from "./icons";

const App = () => {
  const [mode, setMode] = useState(modes[0]);
  const [menuStatus, setMenuStatus] = useState();

  const setAlias = (alias) => {
    const newMode = modes.find((e) => e.alias === alias);
    if (newMode) {
      setMode(newMode);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?mode=${alias}`
      );
    } else console.warn(alias + " is not a valid mode");
  };

  const Menu = () => {
    const menuOptions = React.useMemo(() => {
      const menuButtons = [];
      modes.forEach((e) => {
        if (!e.hidden)
          menuButtons.push(
            <button
              onClick={() => setAlias(e.alias)}
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
          <div className="title">Color Grid</div>
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
    if (queryMode) setAlias(queryMode);
  }, []);

  const [windowWidth, windowHeight] = useWindowDimension();

  return (
    <div className="App" style={{ backgroundColor: mode.background }}>
      <Menu />
      <mode.Grid
        mode={mode}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    </div>
  );
};

// https://stackoverflow.com/a/63010184
function useWindowDimension() {
  const [isPending, startTransition] = useTransition();
  const [dimension, setDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useLayoutEffect(() => {
    const ResizeHandler = () =>
      startTransition(() =>
        setDimension([window.innerWidth, window.innerHeight])
      );

    window.addEventListener("resize", ResizeHandler);
    return () => window.removeEventListener("resize", ResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount
  return dimension;
}

export default App;
