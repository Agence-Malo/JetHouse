"use client";

import fal1 from "@/public/graphics/images/fleet/falcon/1.jpg";
import fal2 from "@/public/graphics/images/fleet/falcon/2.jpg";
import fal3 from "@/public/graphics/images/fleet/falcon/3.jpg";
import fal4 from "@/public/graphics/images/fleet/falcon/4.jpg";
import fal5 from "@/public/graphics/images/fleet/falcon/5.jpg";
import fal6 from "@/public/graphics/images/fleet/falcon/6.jpg";
import fal7 from "@/public/graphics/images/fleet/falcon/7.jpg";
import fal8 from "@/public/graphics/images/fleet/falcon/8.jpg";
import fal9 from "@/public/graphics/images/fleet/falcon/9.jpg";
import fal10 from "@/public/graphics/images/fleet/falcon/10.jpg";
import fal11 from "@/public/graphics/images/fleet/falcon/11.jpg";
import fal12 from "@/public/graphics/images/fleet/falcon/12.jpg";
import fal13 from "@/public/graphics/images/fleet/falcon/13.jpg";
import { useEffect, useState } from "react";
import EmblaCarousel from "@/components/fleet/EmblaCarousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  fal1,
  fal2,
  fal3,
  fal4,
  fal5,
  fal6,
  fal7,
  fal8,
  fal9,
  fal10,
  fal11,
  fal12,
  fal13,
];

const photos = [...images, ...images, ...images];

const Gallery = () => {
  const [translate, setTranslate] = useState<number>(images.length * -100),
    [transition, setTransition] = useState<number>(200),
    [paused, pause] = useState<boolean>(false);

  const rotate = (forwards: boolean) => {
    const delta = forwards ? -100 : 100;
    setTransition(200);
    setTranslate(translate + delta);
    if (translate === images.length * -200 || translate === 0) {
      setTransition(0);
      setTranslate(images.length * -100);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) rotate(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [rotate, paused]);

  return (
    <section
      className={
        "containerize flex flex-col justify-center items-center gap-[2vh] py-[16vh]"
      }
    >
      <EmblaCarousel slides={images} options={{ loop: true }} />
      {/*
        <div className={"w-full flex justify-between items-center"}>
          <button
            onClick={(e) => {
              e.preventDefault();
              pause(true);
              rotate(false);
              setTimeout(() => pause(false), 5000);
            }}
            className={"w-[2vw] lg:block hidden"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 72 72"
              className={"w-full fill-black/25"}
            >
              <path d="M46.023,59.542c-1.008,0-2.016-0.378-2.794-1.137L23.183,38.844c-0.771-0.752-1.206-1.785-1.206-2.863	s0.435-2.11,1.206-2.863L43.19,13.596c1.582-1.542,4.113-1.512,5.657,0.069c1.542,1.581,1.512,4.114-0.069,5.656l-17.074,16.66	l17.113,16.698c1.581,1.542,1.611,4.075,0.069,5.656C48.103,59.138,47.063,59.542,46.023,59.542z"></path>
            </svg>
          </button>
          <div className={"w-full lg:overflow-x-clip overflow-x-scroll"}>
            <div
              className={
                "w-max h-[28vw] lg:hidden justify-start items-center flex gap-[2vw]"
              }
            >
              {images.map((photo, i) => (
                <Image
                  key={i}
                  src={photo}
                  alt={`${i}`}
                  className={"w-[48vw] h-full object-cover"}
                />
              ))}
            </div>
            <div
              className={
                "w-max h-[18vw] lg:flex justify-start items-center hidden"
              }
            >
              {photos.map((photo, i) => (
                <Image
                  key={i}
                  src={photo}
                  alt={`${i}`}
                  className={
                    "w-[30vw] md:w-[26vw] h-full object-cover pr-[2vw] md:pr-[1vw]"
                  }
                  style={{
                    transform: `translateX(${translate}%)`,
                    transition: `transform ${transition}ms ease-in-out`,
                  }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              pause(true);
              rotate(true);
              setTimeout(() => pause(false), 5000);
            }}
            className={"w-[2vw] lg:block hidden"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 72 72"
              className={"w-full fill-black/25"}
            >
              <path d="M25.977,59.542c-1.04,0-2.079-0.403-2.863-1.207c-1.542-1.581-1.512-4.114,0.069-5.656l17.113-16.698l-17.074-16.66	c-1.581-1.542-1.611-4.075-0.069-5.656c1.544-1.582,4.076-1.612,5.657-0.069l20.008,19.522c0.771,0.752,1.206,1.785,1.206,2.863	s-0.435,2.11-1.206,2.863L28.771,58.404C27.992,59.164,26.984,59.542,25.977,59.542z"></path>
            </svg>
          </button>
        </div>
      */}
      {/*
        <div className={"w-full flex justify-center items-center gap-[1vw]"}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`size-[0.5rem] rounded-full ${translate === (i + 1) * -200 ? "bg-black" : "bg-black/25"}`}
            />
          ))}
        </div>
      */}
    </section>
  );
};

export default Gallery;
