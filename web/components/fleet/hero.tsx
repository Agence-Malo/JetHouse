"use client";

import { useJet } from "@/context/jet";

const Hero = () => {
  const data = useJet();

  return (
    <section
      className={
        "w-full flex justify-center items-center bg-cover bg-center h-[56vh]"
      }
      style={{
        backgroundImage: `url(${encodeURI(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${data.images.hero.url}`)})`,
      }}
    >
      <div
        className={
          "w-full h-full bg-black/25 flex justify-center items-end py-[1vh]"
        }
      >
        <h1 className={"uppercase text-white text-center"}>{data.name}</h1>
      </div>
    </section>
  );
};

export default Hero;
