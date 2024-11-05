"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className={
        "w-full h-[100dvh] flex flex-col justify-end items-center md:gap-[11vh] gap-[10vh]"
      }
    >
      <video
        className={"w-full h-full object-cover object-center absolute -z-20"}
        autoPlay
        muted
        preload={"none"}
        playsInline
        loop
      >
        <source src={"../graphics/videos/aerial.webm"} type={"video/webm"} />
      </video>
      <motion.h1
        initial={{ y: "-6vh", opacity: 0, scale: 1.05 }}
        animate={{ y: "0", opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={
          "text-white md:text-center text-center font-normal containerize"
        }
      >
        Not Just Another
        <br />
        <span className={"md:hidden"}> </span>
        <span className={"font-bold"}>Business Aviation Operator</span>
      </motion.h1>
      <div
        className={
          "bg-gradient-to-b from-transparent to-white w-full h-[32vh] -z-10"
        }
      />
    </section>
  );
};

export default Hero;
