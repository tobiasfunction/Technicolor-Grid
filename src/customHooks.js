import { useState, useEffect } from "react";
import { deepmerge } from "deepmerge-ts";


// Custom hook to handle updating Map object state using Deep Merge
export function useStateMap() {
  const [stateMap, setStateMap] = useState(new Map());

  function setter(key, value) {
    setStateMap(
      new Map(stateMap.set(key, deepmerge(stateMap.get(key), value)))
    );
  }

  function clear() {
    setStateMap(new Map());
  }

  return [stateMap, setter, clear];
}


// Custom hook to keep track of window size
// source: https://usehooks.com/useWindowSize/
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState([undefined, undefined]);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
