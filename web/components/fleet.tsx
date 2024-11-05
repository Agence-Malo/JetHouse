"use client";
import fleet from "@/public/graphics/images/fleet.webp";
import falcon7x from "@/public/graphics/images/Falcon-7X-JetHouse.webp";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";

const Fleet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className={
        "w-full lg:px-[20vw] h-[128dvh] flex justify-end text-blue-950 items-center bg-black/5"
      }
    >
      <Image
        src={fleet}
        alt={"Photo from plane cabin looking towards the sunset"}
        className={`w-2/3 h-[85vh] left-0 object-cover absolute overflow-y-clip -z-10 ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}
      />
      <div
        className={`flex h-[60vh] max-lg:w-[70vw] px-[4vw] w-[38vw] bg-white flex-col justify-center items-start gap-[2vh] ${isInView ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 delay-200 ease-in-out`}
      >
        <label>&mdash; Our fleet</label>
        <h2>Boutique Means Size</h2>
        <p>
          Therefore, we pledge to cap our fleet of managed aircraft at 15
          aircraft to ensure a continuous high standard of service for all
          clients, whether aircraft owners or charter clients.
        </p>
        <Link href={"/fleet"} ref={ref}>
          <Image
            src={falcon7x}
            alt={"Falcon 7X"}
            className={"cursor-pointer"}
          />
        </Link>
      </div>
    </section>
  );
};

export default Fleet;
