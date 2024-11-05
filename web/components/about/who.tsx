"use client";

import Image from "next/image";
import plane from "@/public/graphics/images/about/hangar.webp";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Who = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className={`containerize lg:px-[12vw] flex flex-col lg:flex-row justify-between items-center gap-[2vh] py-[8vh] ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}
    >
      <div
        className={
          "w-full lg:w-[32vw] h-max flex flex-col justify-start items-start gap-[2vh] text-blue-950"
        }
      >
        <label>&mdash; Who we are</label>
        <h2>Your Boutique Aviation Operator Crafted With Soul</h2>
        <p className={"text-justify"} ref={ref}>
          JetHouse is not just another business aviation operator. We are a team
          of experienced and passionate business aviation professionals with a
          single objective: “Focus, and never deviate, from what business
          aviation clients expect from an operator.” At JetHouse, we want to
          restore the true meaning of what a boutique operation is.
        </p>
      </div>
      <Image
        src={plane}
        alt={"Parked jet inside a hangar."}
        className={"w-full lg:w-[32vw] h-auto"}
      />
    </section>
  );
};

export default Who;
