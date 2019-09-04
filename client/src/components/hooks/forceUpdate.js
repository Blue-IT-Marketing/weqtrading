import React, { useState } from "react";

export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = () => {
    setTick(tick => tick + 1);
  };
  return update;
}
