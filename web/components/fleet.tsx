"use client";

import fleet from "@/public/graphics/images/fleet.webp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import EmblaCarousel from "@/components/EmblaCarousel";
import IJet from "@/types/jet";
import axios from "axios";

const Fleet = () => {
  const ref = useRef(null),
    isInView = useInView(ref, { once: true }),
    [data, setData] = useState<IJet[] | null>(null);

  useEffect(() => {
    const fetchFleet = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/jets`,
        {
          headers: {
            "content-type": "application/json",
          },
          params: {
            "select[id]": true,
            "select[images][listing]": true,
          },
        },
      );
      setData(res.data.docs);
    };

    fetchFleet();
  }, []);

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
        <div
          ref={ref}
          className={
            "flex flex-col justify-center items-center gap-[2vh] w-full overflow-x-clip"
          }
        >
          {data && <EmblaCarousel slides={data} options={{ loop: true }} />}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
