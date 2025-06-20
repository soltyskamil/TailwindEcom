import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
export const useCalculateChunkSize = () => {
  const [desiredChunk, setDesiredChunk] = useState(4);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;
    if (width <= 540) {
      setDesiredChunk(1);
    }
    if (width > 540 && width < 840) {
      setDesiredChunk(2);
    }
    if (width > 840 && width < 1440) {
      setDesiredChunk(3);
    }
    if (width > 1440) {
      setDesiredChunk(4);
    }
  }, [width]);

  return {
    desiredChunk,
  };
};
