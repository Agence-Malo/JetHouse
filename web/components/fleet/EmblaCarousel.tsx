import { useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  DotButton,
  useDotButton,
} from "@/components/fleet/EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type PropType = {
  slides: StaticImageData[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 }),
    WheelGesturesPlugin(),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      emblaApi.plugins().autoplay.destroy();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      emblaApi.plugins().autoplay.destroy();
    }
  }, [emblaApi]);

  return (
    <section className="w-full flex flex-col justify-center gap-[2vh]">
      <div className={"w-full h-max flex"}>
        <button
          onClick={(e) => {
            e.preventDefault();
            scrollPrev();
          }}
          className={"w-[2vw] lg:block hidden"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 72 72"
            className={
              "fill-blue-950/25 hover:fill-blue-950 focus:scale-75 [transition:_background-color_200ms_ease-in-out,_transform_200ms_ease-in-out] w-full"
            }
          >
            <path d="M46.023,59.542c-1.008,0-2.016-0.378-2.794-1.137L23.183,38.844c-0.771-0.752-1.206-1.785-1.206-2.863	s0.435-2.11,1.206-2.863L43.19,13.596c1.582-1.542,4.113-1.512,5.657,0.069c1.542,1.581,1.512,4.114-0.069,5.656l-17.074,16.66	l17.113,16.698c1.581,1.542,1.611,4.075,0.069,5.656C48.103,59.138,47.063,59.542,46.023,59.542z"></path>
          </svg>
        </button>
        <div
          className="embla embla__viewport lg:w-[76vw] w-[92vw]"
          ref={emblaRef}
        >
          <div className="flex justify-start items-center">
            {slides.map((image, i) => (
              <div className="embla__slide h-[28vh] md:h-[32vh]" key={i}>
                <Image
                  src={image}
                  alt={"Gallery photo"}
                  className={
                    "w-full md:w-[48vw] lg:w-[28vw] h-full object-cover object-center"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            scrollNext();
          }}
          className={"w-[2vw] lg:block hidden"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 72 72"
            className={
              "fill-blue-950/25 hover:fill-blue-950 focus:scale-95 [transition:_background-color_200ms_ease-in-out,_transform_200ms_ease-in-out] w-full"
            }
          >
            <path d="M25.977,59.542c-1.04,0-2.079-0.403-2.863-1.207c-1.542-1.581-1.512-4.114,0.069-5.656l17.113-16.698l-17.074-16.66	c-1.581-1.542-1.611-4.075-0.069-5.656c1.544-1.582,4.076-1.612,5.657-0.069l20.008,19.522c0.771,0.752,1.206,1.785,1.206,2.863	s-0.435,2.11-1.206,2.863L28.771,58.404C27.992,59.164,26.984,59.542,25.977,59.542z"></path>
          </svg>
        </button>
      </div>

      <div className="embla__controls">
        <div className="flex justify-center items-center gap-[3vw] md:gap-[2vw]">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`size-[2vw] md:size-[1vh] rounded-full transition-[background-color] duration-500 ease-in-out ${index === selectedIndex ? "bg-blue-950" : "bg-blue-950/25"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
