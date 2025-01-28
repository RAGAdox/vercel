import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import "./Background.scss";

const Background = ({ currentIndex }: { currentIndex: number }) => {
  const [isInitial, setIsInitial] = useState(true);
  const [scope, animate] = useAnimate();

  const animateCircleDesktop = async () => {
    await animate(
      "#circle-desktop",
      { scale: isInitial ? [0, 100] : [100, 50, 100] },
      { duration: 0.5, ease: "circInOut" }
    );
  };

  const animateCircleMobile = async () => {
    if (isInitial) {
      await animate(
        "#circle-mobile",
        { scale: [0, 100] },
        { duration: 0.5, ease: "easeOut" }
      );
    }
  };

  useEffect(() => {
    animateCircleDesktop();
    animateCircleMobile();
    setIsInitial(false);
  }, [currentIndex]);

  return (
    <div ref={scope} className="background flex justify-center items-center">
      <div
        id="circle-desktop"
        className="circle w-1 h-1 blur-sm hidden md:inline"
      ></div>
      <div
        id="circle-mobile"
        className="circle w-1 h-1 blur-sm inline md:hidden"
      ></div>
    </div>
  );
};

export default Background;
