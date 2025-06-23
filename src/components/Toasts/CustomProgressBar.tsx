import { useEffect } from "react";
import type ToastContentProps from "react-toastify";
import "./progressbar.scss";
type CustomProgressBarProps = {
  isPaused: boolean;
  onAnimationEnd: () => void;
};

const CustomProgressBar = ({
  isPaused,
  onAnimationEnd,
}: CustomProgressBarProps) => {
  return (
    <div className="custom-progressbar border border-b-0 border-x-0 border-t-green-400 relative bottom-0 w-full h-1.5  left-0">
      <div
        className="custom-progressbar-indicator h-full"
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  );
};

export default CustomProgressBar;
