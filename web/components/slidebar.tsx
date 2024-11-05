"use client";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const SlideBar = () => {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scaleY, "change", (latest) => {
    setProgress(latest * 100);
  });

  return (
    <div className={"fixed z-10 right-[4vw] inset-y-[40%] w-[0.3vh] h-[20vh]"}>
      <div className={"w-full h-[15%] bg-white/30 backdrop-invert"} />
      <div
        className={
          "bg-white/30 backdrop-invert w-full mx-auto h-full flex flex-col justify-start items-center"
        }
        style={{
          height: `${progress}%`,
        }}
      />
      <div
        className={
          "w-full h-[2%] bg-white/30 backdrop-invert my-[2vh] rounded-full"
        }
      />
      <div
        className={
          "w-full bg-black/25 flex flex-col justify-start items-center"
        }
        style={{
          height: `${100 - progress}%`,
        }}
      />
    </div>
  );
};
export default SlideBar;
