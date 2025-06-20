import React, { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";
import { animate } from "framer-motion";
type useHandleCarouselAnimationProps = {
  xTranslation: MotionValue<number>;
  constraintLeft: number;
};

export const FAST_DURATION = 35;
export const SLOW_DURATION = 55;

export const useHandleCarouselAnimation = ({
  xTranslation,
  constraintLeft,
}: useHandleCarouselAnimationProps) => {
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [duration, setDuration] = useState(FAST_DURATION);

  useEffect(() => {
    if (constraintLeft === 0 || constraintLeft == -0) return;
    let controls;
    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), constraintLeft], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / constraintLeft),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, constraintLeft], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
      });
    }

    return controls?.stop;
  }, [duration, xTranslation, mustFinish, constraintLeft]);

  return {
    mustFinish,
    rerender,
    setDuration,
    setMustFinish,
    setRerender,
  };
};
