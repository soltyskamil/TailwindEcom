import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export const useHandleCarouseResize = () => {
  const [node, setNode] = useState<HTMLElement>();
  const [constraintLeft, setConstraintLeft] = useState(0);

  const containerRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setNode(node);
  }, []);

  useEffect(() => {
    if (!node) return;
    const handleResize = debounce(() => {
      setConstraintLeft(-(node.scrollWidth - node.clientWidth));
    }, 500);
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [node]);

  return {
    containerRef,
    constraintLeft,
  };
};
