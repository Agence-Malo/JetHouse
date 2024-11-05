"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const Expertise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className={
        "containerize flex flex-col items-center text-center text-blue-950 py-[12vh]"
      }
    >
      <div className={"w-[2px] h-[60px] bg-blue-950/70 my-[50px]"}></div>
      <label
        className={`mb-5 ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}
      >
        Our expertise
      </label>
      <h3
        className={`max-lg:text-xl font-medium w-[92vw] lg:w-[76vw] ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}
      >
        &quot;At JetHouse, our team has forged strong relationships with leading
        business jet manufacturers such as Dassault Falcon, Bombardier, and
        Gulfstream. We deeply understand these aircraft and have built an
        extensive network with these manufacturers. <br />
        <br ref={ref} /> This specialisation enables us to guarantee precise
        technical management and flawless operational efficiency, which are
        essential for offering our clients an optimal flying experience.&quot;
      </h3>
      <div className={"w-[2px] h-[60px] bg-blue-950/70 my-[50px]"} />
      <div className={"w-full mt-[8vh]"}>
        <div
          className={`w-full h-full bg-blue-950/50 relative flex flex-col justify-center items-center gap-[4vh] ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}
        >
          <video
            className={"w-full h-full absolute object-cover -z-10"}
            autoPlay
            muted
            preload={"none"}
            playsInline
            loop
          >
            <source
              src={"../graphics/videos/expertise.webm"}
              type={"video/webm"}
            />
          </video>
          <h2 className={"text-white mt-[10vh]"}>
            Begin Your Journey <br /> With JetHouse
          </h2>
          <button className={"glass-button glass-button-light mb-[10vh]"}>
            <a href={"/graphics/Brochure%20-%20JetHouse%20VF.pdf"} download>
              DOWNLOAD THE BROCHURE
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
