"use client";

import about from "@/public/graphics/images/about.webp";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className={`containerize flex flex-col-reverse lg:flex-row justify-between items-start gap-[4vh] lg:gap-[8vw] ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}
    >
      <Image
        src={about}
        alt={"Herve Laitat"}
        className={
          "w-full h-[72dvh] lg:h-[72dvh] lg:w-auto object-cover object-bottom"
        }
      />
      <div
        className={
          "px-[8vw] lg:px-0 flex flex-col justify-start items-start gap-[3vh] text-blue-950"
        }
      >
        <label>&mdash; About us</label>
        <h2>
          A Team Of Aviation
          <br className={"lg:block hidden"} />
          <span className={"lg:hidden"}> </span>
          Experts Driven By Trust,
          <br className={"lg:block hidden"} />
          <span className={"lg:hidden"}> </span>Integrity And Service.
        </h2>
        <p className={"lg:w-[75%] w-full text-justify"}>
          We are a team of experienced and passionate business aviation
          professionals with a single objective: “Focus, and never deviate from
          what our client expect from their operator.” At JetHouse, we want to
          restore the true meaning of what a boutique operation is.
        </p>
        <Link
          href={"/about"}
          className={"glass-button glass-button-dark"}
          ref={ref}
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default About;
