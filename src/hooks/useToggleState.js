import { useState } from "react";

function useToggleState() {
  const [state, setState] = useState(false);
  const toggleState = () => setState(!state);
  return {
    state,
    setState,
    toggleState,
  };
}

export default useToggleState;
